
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Article } from '@/types/Article';
import { format, parseISO } from 'date-fns';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const NewsArticle = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    import(`../data/news/${id}.json`)
      .then((module) => {
        setArticle({ ...module.default, id });
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error loading article ${id}:`, err);
        setError("Article not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-raven-red"></div>
      </div>
    );
  }

  if (error || !article) {
    return <Navigate to="/news" replace />;
  }

  return (
    <article className="max-w-4xl mx-auto px-4">
      <Link to="/news">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft size={16} className="mr-2" /> Back to News
        </Button>
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex items-center text-raven-gray mb-6">
        <Calendar size={18} className="mr-2" />
        {format(parseISO(article.date), 'MMMM dd, yyyy')}
      </div>
      
      <div className="aspect-video w-full overflow-hidden mb-8 rounded-lg">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="prose prose-invert prose-lg max-w-none">
        {article.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </article>
  );
};

export default NewsArticle;
