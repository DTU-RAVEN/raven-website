import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '@/types/Article';
import { format, parseISO } from 'date-fns';

const NewsArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const jsonContext = import.meta.glob('../data/news/*.json');

        const articlePromises = Object.keys(jsonContext).map(async key => {
          const id = key.replace(/^\.\.\/data\/news\/|\.json$/g, '');
          try {
            const module = await jsonContext[key]();
            if (!module || typeof module !== 'object') return null;
            const articleData = 'default' in module ? module.default : module;
            if (!articleData || typeof articleData !== 'object') return null;
            if (!('title' in articleData) || !('date' in articleData) || !('image' in articleData) || !('content' in articleData)) return null;
            return { ...articleData as Omit<Article, 'id'>, id } as Article;
          } catch {
            return null;
          }
        });

        const loadedArticles = await Promise.all(articlePromises);
        const sortedArticles = loadedArticles
          .filter((article): article is Article => article !== null)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setArticles(sortedArticles);
        setLoading(false);
      } catch {
        setError('Failed to load news articles');
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--ink-soft)' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--ink-soft)' }}>
        {error}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--ink-soft)' }}>
        No news articles available yet.
      </div>
    );
  }

  return (
    <div className="news-grid">
      {articles.map((article) => (
        <Link key={article.id} to={`/news/${article.id}`} className="news-card">
          <div className="news-card-img">
            <img src={article.image} alt={article.title} />
          </div>
          <div className="news-card-body">
            <p className="news-card-date mono">{format(parseISO(article.date), 'MMMM dd, yyyy')}</p>
            <p className="news-card-title">{article.title}</p>
            <p className="news-card-excerpt">
              {article.excerpt || article.content.substring(0, 150)}...
            </p>
            <span className="news-card-read">Read more →</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NewsArticleList;
