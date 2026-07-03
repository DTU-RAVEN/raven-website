import { useEffect } from 'react';
import ChatClient from '@/components/assistant/ChatClient';

const AssistantPage = () => {
  useEffect(() => {
    document.title = 'Raven Assistant';
  }, []);

  return <ChatClient />;
};

export default AssistantPage;
