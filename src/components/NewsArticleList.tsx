
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '@/types/Article';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { Calendar } from 'lucide-react';

const NewsArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const context = import.meta.glob('../data/news/*.json');
        console.log('News files context:', Object.keys(context));
        
        const articlePromises = Object.keys(context).map(async key => {
          const id = key.replace(/^\.\.\/data\/news\/|\.json$/g, '');
          try {
            const module = await context[key]();
            console.log(`Successfully loaded article: ${id}`, module);
            return { ...module.default, id };
          } catch (err) {
            console.error(`Error loading article ${id}:`, err);
            return null;
          }
        });

        const loadedArticles = await Promise.all(articlePromises);
        
        // Filter out failed loads and sort by date (most recent first)
        const sortedArticles = loadedArticles
          .filter(Boolean)
          .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
          });
          
        console.log('Sorted articles:', sortedArticles);
        setArticles(sortedArticles);
        setLoading(false);
      } catch (err) {
        console.error("Error in article import:", err);
        setError("Failed to load news articles");
        setLoading(false);
      }
    };
    
    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-raven-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-raven-red">{error}</p>
        <p className="mt-4">Please try again later or contact the administrator.</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl">No news articles available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {articles.map((article) => (
        <Link key={article.id} to={`/news/${article.id}`} className="transition-transform hover:scale-[1.02]">
          <Card className="h-full bg-raven-gray/10 border-raven-gray/40 hover:border-raven-red transition-colors">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="flex items-center text-raven-gray">
                <Calendar size={16} className="mr-2" />
                {format(parseISO(article.date), 'MMMM dd, yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-raven-white/80 line-clamp-3">
                {article.excerpt || article.content.substring(0, 150)}...
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-raven-red font-medium text-sm">Read more</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default NewsArticleList;
