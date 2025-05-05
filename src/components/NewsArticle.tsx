
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Import a markdown renderer
import { marked } from 'marked';

interface ArticleProps {
  article: {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
  };
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

  // Convert markdown to HTML
  const renderMarkdown = (markdown: string) => {
    try {
      return { __html: marked.parse(markdown) };
    } catch (e) {
      console.error('Error rendering markdown:', e);
      return { __html: 'Error rendering content.' };
    }
  };

  return (
    <Card className="bg-raven-black border-raven-gray/30 overflow-hidden hover:border-raven-white/50 transition-colors">
      <CardHeader className="bg-raven-gray/10 border-b border-raven-gray/20 flex flex-row items-center">
        <div>
          <h2 className="text-2xl font-bold">{article.title}</h2>
          <div className="flex items-center text-raven-white/70 mt-2">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">{formatDate(article.date)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!expanded ? (
          <>
            <p className="mb-4">{article.excerpt}</p>
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
            <div 
              className="prose prose-invert max-w-none prose-h3:text-xl prose-h4:text-lg prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-raven-gray/20 prose-pre:p-4 prose-pre:rounded-md prose-img:rounded-lg"
              dangerouslySetInnerHTML={renderMarkdown(article.content)} 
            />
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
