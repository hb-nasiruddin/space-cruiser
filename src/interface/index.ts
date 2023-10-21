// Define a type for response information from the API,
// including count, pages, next, and previous page numbers
export type ResponseInfo = {
  count: number; // Total number of items in the response
  pages: number; // Total number of pages
  next?: number | null; // Number of the next page or null if no next page exists
  prev?: number | null; // Number of the previous page or null if no previous page exists
};

// Define a type representing an individual character,
// including id, name, image URL, gender, and species
export type Character = {
  id: string; // Unique identifier for the character
  name: string; // Name of the character
  image: string; // URL of the character's image
  gender: string; // Gender of the character
  species: string; // Species of the character
};

// Define a type representing an array of characters
export type Characters = Character[];

// Define a type for the response format when fetching a list of characters from the API
export type GetCharacters = {
  info: ResponseInfo; // Response information, including count, pages, next, and prev
  error?: string; // Optional error message if there is an error in the response
  results: Characters; // Array of character objects containing id, name, image, gender, and species
};
