
import { useState, useEffect } from 'react';
import NewsArticle from './NewsArticle';
import { Card, CardContent } from '@/components/ui/card';
import { Article } from '@/types/article';

const NewsArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        // Use import.meta.glob to get all JSON files in the news directory
        const articlesModule = import.meta.glob('/src/data/news/*.json', { 
          eager: true,
          import: 'default' // Import the default export from each module
        });
        
        const loadedArticles = Object.entries(articlesModule).map(([path, article]: [string, any]) => {
          console.log('Loaded article:', {
            path,
            article
          });
          
          return article as Article;
        });

        // Sort articles by date (newest first)
        loadedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setArticles(loadedArticles);
      } catch (err) {
        console.error('Failed to load news articles:', err);
        setError('Failed to load news articles. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-xl">Loading news articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 p-4 rounded-md text-center">
        {error}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <Card className="bg-raven-gray/10 border-raven-gray/30">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl mb-4">No news articles yet</h3>
          <p>Check back later for updates and announcements.</p>
          <p className="text-sm mt-4 text-raven-white/60">
            To add articles, create JSON files in the src/data/news/ directory.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {articles.map((article) => (
        <NewsArticle key={article.id} article={article} />
      ))}
    </div>
  );
};

export default NewsArticleList;
