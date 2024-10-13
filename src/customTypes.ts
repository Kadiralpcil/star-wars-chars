import { Person } from "./types";

export type Film = {
  id: string;
  title: string;
};

export type PeopleConnection = {
  people: Person[];
};

export type Species = {
  id: string;
  name: string;
};

export type FilterSelect = {
  id: string;
  name: string;
};

export type AllPeopleQuery = {
  allPeople: PeopleConnection;
};

export type AllFilmQuery = {
  allFilms: {
    films: Film[];
  };
};

export type AllSpeciesQuery = {
  allSpecies: {
    species: Species[];
  };
};
