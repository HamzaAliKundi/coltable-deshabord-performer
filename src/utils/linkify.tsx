import React from 'react';

/**
 * Converts URLs in text to clickable links
 * Supports http://, https://, www., and plain domains
 * 
 * @param text - The text that may contain URLs
 * @returns HTML string with URLs converted to anchor tags
 */
export const linkify = (text: string): string => {
  if (!text || typeof text !== 'string') return '';

  // URL pattern: matches http://, https://, www., or plain domains
  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi;

  // Split text by URLs and process each part
  const parts = text.split(urlPattern);
  
  return parts.map((part) => {
    // Check if this part is a URL
    if (urlPattern.test(part)) {
      // Ensure URL has protocol
      let href = part;
      if (!part.startsWith('http://') && !part.startsWith('https://')) {
        href = part.startsWith('www.') ? `https://${part}` : `https://${part}`;
      }
      
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-[#FF00A2] hover:underline">${part}</a>`;
    }
    return part;
  }).join('');
};

/**
 * Converts text with URLs to React elements
 * Preserves line breaks and converts URLs to links
 * 
 * @param text - The text that may contain URLs and line breaks
 * @returns Array of React elements
 */
export const linkifyText = (text: string): (string | React.ReactElement)[] => {
  if (!text || typeof text !== 'string') return [];

  // First, split by line breaks
  const lines = text.split('\n');
  const result: (string | React.ReactElement)[] = [];

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      result.push(<br key={`br-${lineIndex}`} />);
    }

    // URL pattern
    const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi;
    
    const parts = line.split(urlPattern);
    
    parts.forEach((part, partIndex) => {
      if (urlPattern.test(part)) {
        // Ensure URL has protocol
        let href = part;
        if (!part.startsWith('http://') && !part.startsWith('https://')) {
          href = part.startsWith('www.') ? `https://${part}` : `https://${part}`;
        }
        
        result.push(
          <a
            key={`link-${lineIndex}-${partIndex}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF00A2] hover:underline"
          >
            {part}
          </a>
        );
      } else if (part) {
        result.push(<span key={`text-${lineIndex}-${partIndex}`}>{part}</span>);
      }
    });
  });

  return result;
};

