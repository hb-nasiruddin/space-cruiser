import React from 'react';
import { Image } from '@components/atoms';

// Define the type for the props received by the CharacterAvatar component
type Props = {
  src: string; // The source URL of the character avatar image
};

// Component to display a character's avatar image
export function CharacterAvatar({ src }: Props) {
  return (
    <Image
      src={src} // Image source URL received as a prop
      alt="Character Avatar" // Alternative text for the image
      className="position-relative img-fluid rounded-start" // CSS classes for styling the image
    />
  );
}

// Default export for the CharacterAvatar component
export default CharacterAvatar;
