import { gql } from "@apollo/client";

export const GET_ALL_PEOPLE = gql`
  query AllPeople {
    allPeople {
      people {
        id
        name
        gender
        birthYear
        height
        mass
        species {
          id
          name
        }
        filmConnection {
          films {
            id
            title
          }
        }
      }
    }
  }
`;

export const GET_ALL_FILMS = gql`
  query allFilms {
    allFilms {
      films {
        id
        title
      }
    }
  }
`;

export const GET_ALL_SPECIES = gql`
  query allSpecies {
    allSpecies {
      species {
        id
        name
      }
    }
  }
`;
