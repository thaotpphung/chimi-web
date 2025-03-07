'use client';

import * as React from 'react';

import { cn } from '@/utils/cn';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, className, fallback, ...props }, ref) => (
    <div className={cn('relative flex items-center justify-center', className)}>
      {src ? (
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn('aspect-square h-full w-full object-cover', className)}
          loading="lazy"
          {...props}
        />
      ) : (
        <div className="bg-muted flex size-full items-center justify-center">
          {fallback ?? 'Image not available'}
        </div>
      )}
    </div>
  ),
);

Image.displayName = 'Image';

export { Image };
