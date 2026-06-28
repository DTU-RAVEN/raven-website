
import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Article } from '@/types/Article';
import { format, parseISO } from 'date-fns';

const NewsArticle = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadArticle = async () => {
      try {
        const module = await import(`../data/news/${id}.json`);
        const articleData = module.default || module;

        if (!articleData || typeof articleData !== 'object') {
          setError('Invalid article data format');
          setLoading(false);
          return;
        }

        if (!('title' in articleData) || !('date' in articleData) || !('image' in articleData) || !('content' in articleData)) {
          setError('Article data is incomplete');
          setLoading(false);
          return;
        }

        setArticle({ ...articleData as Omit<Article, 'id'>, id });
        setLoading(false);
      } catch {
        setError('Article not found');
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="wrap" style={{ padding: '60px 24px', color: 'var(--ink-soft)' }}>
        Loading...
      </div>
    );
  }

  if (error || !article) {
    return <Navigate to="/news" replace />;
  }

  return (
    <article className="wrap" style={{ maxWidth: '760px' }}>
      <Link to="/news" className="article-back mono">← Back to news</Link>

      <p className="article-date mono">{format(parseISO(article.date), 'MMMM dd, yyyy')}</p>
      <h1 style={{ fontFamily: 'var(--disp)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', margin: '0 0 28px', lineHeight: 1.05 }}>
        {article.title}
      </h1>

      <div className="article-img">
        <img src={article.image} alt={article.title} />
      </div>

      <div className="article-body">
        {article.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
};

export default NewsArticle;
