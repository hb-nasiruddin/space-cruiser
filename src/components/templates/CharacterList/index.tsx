import React from 'react';
import { CharacterCard } from '@components/organisms';
import { Characters } from '@/interface';

// Define a type for the characters array
type Props = {
  characters: Characters;
};

// Component to display a list of characters
export function CharacterList({ characters }: Props) {
  return (
    <div className="row character-list">
      {/* Map through the characters array and render CharacterCard component for each character */}
      {characters.map((character) => (
        <CharacterCard key={`${character.id}-${character.name}`} character={character} />
      ))}
    </div>
  );
}

// // Server-side data fetching function (runs on every request)
// export async function getServerSideProps() {
//   try {
//     // Fetch data from an internal API endpoint ('/api/fetch-data')
//     const res = await fetch('/api/fetch-data');
//     // Parse the JSON response from the API
//     const data = await res.json();
//     // Pass fetched data to the page component via props
//     return { props: { data } };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     // Handle errors and return appropriate props (for example, an empty characters array)
//     return { props: { characters: [] } };
//   }
// }

// Export the CharacterList component as the default export
export default CharacterList;
