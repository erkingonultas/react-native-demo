import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { Character, CharacterSearchResult } from '../types/Character';

const RICK_MORTY_API_URL = 'https://rickandmortyapi.com/graphql';

export const useCharacterSearch = (query: string) => {
  const searchCharactersQuery = gql`
    query SearchCharacters($name: String!) {
      characters(filter: { name: $name }) {
        results {
          id
          name
          image
          episode {
            id
          }
        }
      }
    }
  `;

  return useQuery<CharacterSearchResult>({
    queryKey: ['characters', query],
    queryFn: () => request(
      RICK_MORTY_API_URL, 
      searchCharactersQuery, 
      { name: query }
    ),
    enabled: query.length > 2,
  });
};