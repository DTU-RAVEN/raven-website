
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Article } from '@/types/article';

interface ArticleProps {
  article: Article;
}

const NewsArticle = ({ article }: ArticleProps) => {
  const [expanded, setExpanded] = useState(false);

  // Format the date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="bg-raven-black border-raven-gray/30 overflow-hidden hover:border-raven-white/50 transition-colors">
      <div className="w-full h-64 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="bg-raven-gray/10 border-b border-raven-gray/20 flex flex-row items-center">
        <div>
          <h2 className="text-2xl font-bold text-raven-white">{article.title}</h2>
          <div className="flex items-center text-raven-white/70 mt-2">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">{formatDate(article.date)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!expanded ? (
          <>
            <p className="mb-4 text-raven-white">{article.excerpt}</p>
            <Button 
              variant="outline" 
              onClick={() => setExpanded(true)}
              className="text-raven-white border-raven-gray hover:bg-raven-gray/20"
            >
              Read More
            </Button>
          </>
        ) : (
          <>
            <div className="text-raven-white whitespace-pre-line">
              {article.content}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setExpanded(false)}
              className="mt-6 text-raven-white border-raven-gray hover:bg-raven-gray/20"
            >
              Show Less
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsArticle;
