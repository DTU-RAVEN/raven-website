const joinEmail = 'contact@dturaven.com';

const defaultBody = `## Write a short application here
(Describe your background, key accomplishments, and why you are interested in joining DTU Raven.)

## Attach CV

## Send email to contact@dturaven.com
`;

const createMailtoLink = (subject: string, body: string) => {
  return `mailto:${joinEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const normalizePosition = (position?: string) => {
  if (!position) {
    return 'General';
  }

  return position
    .replace(/^RAVEN application\s*[-—]\s*/i, '')
    .replace(/^Application\s*[-—]\s*/i, '')
    .replace(/^Open application\s*[-—]\s*/i, '')
    .trim();
};

export const applicationBody = defaultBody;

export const createApplicationMailto = (position?: string, body: string = defaultBody) => {
  const cleanedPosition = normalizePosition(position);
  const subject = position
    ? `RAVEN application - ${cleanedPosition}`
    : 'RAVEN application - General';

  return createMailtoLink(subject, body);
};
