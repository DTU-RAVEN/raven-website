
import { ReactNode } from 'react';

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
}

const ResponsiveWrapper = ({ children, className = '' }: ResponsiveWrapperProps) => {
  return (
    <div className={`w-full mx-auto px-4 sm:px-6 md:px-8 max-w-7xl ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveWrapper;
