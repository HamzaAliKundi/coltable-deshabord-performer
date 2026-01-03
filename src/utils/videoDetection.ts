/**
 * Shared utility function to detect if a URL points to a video file
 * Supports common video formats: mp4, mov, webm, ogg, avi, mkv
 * 
 * @param url - The URL or file path to check
 * @returns true if the URL is a video file, false otherwise
 */
export const isVideo = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  // Check if URL contains video MIME type
  if (url.includes('video/')) return true;
  
  // Check file extension (case-insensitive)
  const videoExtensions = /\.(mp4|mov|webm|ogg|avi|mkv)$/i;
  return videoExtensions.test(url);
};

/**
 * Get the MIME type accept string for video file inputs
 */
export const getVideoAcceptTypes = (): string => {
  return 'video/mp4,video/quicktime,video/webm,video/ogg,video/x-msvideo,video/x-matroska';
};

