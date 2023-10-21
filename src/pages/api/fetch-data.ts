import type { NextApiRequest, NextApiResponse } from 'next';
import { GET_CHARACTERS } from '@lib/query';
import { client } from '@lib/db';
import gql from 'graphql-tag';

type ResponseData = {
  message: string;
};

export const getCharacters = async (page: number) => {
  try {
    // Query the external API
    const query = gql`
      ${GET_CHARACTERS}
    `;
    // Fetch data from the GraphQL API
    const { error, data } = await client.query({
      query,
      variables: {
        page: page ?? 1,
      },
    });

    // Handle errors from API response
    if (error) {
      throw new Error(error.message);
    }

    // Return the data from the API response
    return data.characters;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

// Define the handler function
export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    // Get query params
    const { page } = req.query;

    // Fetch data
    const data = await getCharacters(parseInt(page as string, 10));

    // Return the data from the API response
    res.status(200).json({ ...data });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default handler;
