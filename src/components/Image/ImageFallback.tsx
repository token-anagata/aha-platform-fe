import React from 'react';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc: string;
  className: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, className, alt }) => {
  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = fallbackSrc;
    event.currentTarget.className = 'h-full';
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
