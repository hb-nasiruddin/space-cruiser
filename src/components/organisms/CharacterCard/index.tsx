import React from 'react';
import { CharacterAvatar } from '@components/molecules';
// Define the type for the props received by the CharacterCard component
type Props = {
  character: {
    name: string;
    image: string;
    gender: string;
    species: string;
  };
};

// Component to display details of a character
export function CharacterCard({ character }: Props) {
  return (
    <div className="col-xs-12 col-md-6 col-lg-4 character-list-item">
      {/* Card structure to display character information */}
      <div className="card mb-3">
        <div className="row g-0">
          {/* Column for character image */}
          <div className="col-md-4">
            {/* Render CharacterAvatar component with character's image */}
            <CharacterAvatar src={character.image} />
          </div>
          {/* Column for character details */}
          <div className="col-md-8">
            <div className="card-body">
              {/* Display character name */}
              <h5 className="card-title">{character.name}</h5>
              {/* Display character gender */}
              <p className="card-text">
                Gender:
                {character.gender}
              </p>
              {/* Display character species */}
              <p className="card-text">
                Species:
                {character.species}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default export for the CharacterCard component
export default CharacterCard;
