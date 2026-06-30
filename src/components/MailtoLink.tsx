import type { AnchorHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type MailtoLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  mailto: string;
};

const MailtoLink = forwardRef<HTMLAnchorElement, MailtoLinkProps>(
  ({ mailto, onClick, ...props }, ref) => {
    return (
      <a
        {...props}
        ref={ref}
        href={mailto}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => {
          if (onClick) {
            onClick(event);
          }

          if (!event.defaultPrevented) {
            event.preventDefault();
            const opened = window.open(mailto, '_blank');
            if (!opened) {
              window.location.href = mailto;
            }
          }
        }}
      />
    );
  }
);

MailtoLink.displayName = 'MailtoLink';

export default MailtoLink;
