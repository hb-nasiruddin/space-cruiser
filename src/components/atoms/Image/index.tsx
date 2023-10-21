// NextJS image component
// https://nextjs.org/docs/pages/api-reference/components/image

import NxImage, { ImageProps } from 'next/image';

// Atom component to utilise nextjs image component
export function Image({ src, alt, ...props }: ImageProps) {
  return (
    <NxImage src={src} alt={alt} fill {...{ ...props }} />
  );
}

// Default export for the Image component
export default Image;
