
import { useState, useEffect } from 'react';
import NewsArticle from './NewsArticle';
import { Card, CardContent } from '@/components/ui/card';

// This interface describes the structure of our news articles
interface Article {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const NewsArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        // Fetch the index of all news articles as raw text
        const articlesModule = import.meta.glob('/src/data/news/*.md', { 
          as: 'raw', // Import as raw text instead of a module
          eager: true 
        });
        
        const loadedArticles = Object.entries(articlesModule).map(([path, content]: [string, string]) => {
          // Extract the id from the file path
          const id = path.split('/').pop()?.replace('.md', '') || '';
          
          // Parse the frontmatter and content from raw markdown text
          const frontmatterData = parseFrontmatter(content);
          
          console.log('Parsed article:', {
            path,
            id,
            frontmatter: frontmatterData,
            title: frontmatterData.title
          });
          
          return {
            id,
            title: frontmatterData.title || 'Untitled',
            date: frontmatterData.date || new Date().toISOString().split('T')[0],
            excerpt: frontmatterData.excerpt || 'No excerpt available',
            content: removeFrontmatter(content)
          };
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

  // Basic frontmatter parser
  const parseFrontmatter = (content: string) => {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);
    
    if (!match) return {};
    
    const frontmatter = match[1];
    const result: Record<string, string> = {};
    
    console.log('Parsing frontmatter:', frontmatter);
    
    frontmatter.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        result[key] = value;
      }
    });
    
    console.log('Parsed frontmatter result:', result);
    return result;
  };

  // Remove frontmatter from content
  const removeFrontmatter = (content: string) => {
    return content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  };

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
            To add articles, create markdown files in the src/data/news/ directory.
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
