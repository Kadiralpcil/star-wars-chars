import { useMemo, useState } from "react";

import "./home.scss";

//Types
import {
  AllFilmQuery,
  AllPeopleQuery,
  AllSpeciesQuery,
  FilterSelect,
} from "../../customTypes";
import { Person } from "../../types";

//Queries
import { useQuery } from "@apollo/client";
import { GET_ALL_PEOPLE, GET_ALL_FILMS, GET_ALL_SPECIES } from "../../services";

//Components
import Loader from "../../components/Loader";
import CustomTable from "../../components/CustomTable";
import Card from "../../components/Card";
import { FilterModal } from "./FilterModal";

export const Home = () => {
  //States
  const [selectedMovies, setSelectedMovies] = useState<FilterSelect[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<FilterSelect[]>([]);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  //Queries
  const {
    loading: loadingSpecies,
    data: speciesData,
    error: speciesError,
  } = useQuery<AllSpeciesQuery>(GET_ALL_SPECIES);
  const {
    loading: loadingFilms,
    data: filmsData,
    error: filmsError,
  } = useQuery<AllFilmQuery>(GET_ALL_FILMS);
  const { loading, data, error } = useQuery<AllPeopleQuery>(GET_ALL_PEOPLE);

  //Memoization
  const filteredPeople = useMemo(() => {
    return (
      data?.allPeople.people
        ?.filter((person): person is Person => !!person)
        .filter(
          (item) =>
            selectedMovies.length === 0 ||
            selectedMovies.every((movie) =>
              item?.filmConnection?.films?.some((film) => film?.id === movie.id)
            )
        )
        .filter(
          (item) =>
            selectedSpecies.length === 0 ||
            selectedSpecies.some((species) => item?.species?.id === species?.id)
        ) || []
    );
  }, [data, selectedMovies, selectedSpecies]);

  if (error || filmsError || speciesError) {
    return (
      <div className="error">
        Error: {error?.message || filmsError?.message || speciesError?.message}
      </div>
    );
  }

  return (
    <>
      {loading || loadingFilms || loadingSpecies ? (
        <Loader />
      ) : (
        <>
          <FilterModal
            isFilterModalOpen={isFilterModalOpen}
            setFilterModalOpen={setFilterModalOpen}
            filmsData={filmsData}
            speciesData={speciesData}
            selectedMovies={selectedMovies}
            setSelectedMovies={setSelectedMovies}
            selectedSpecies={selectedSpecies}
            setSelectedSpecies={setSelectedSpecies}
          />
          <div className="main">
            <div className="main-wrapper">
              <Card className="main-card">
                <div
                  onClick={() => setFilterModalOpen(true)}
                  className="filters"
                >
                  Filters
                </div>
                <CustomTable<Person>
                  columns={[
                    { header: "Name", key: "name" },
                    { header: "Gender", key: "gender" },
                    { header: "Birth Year", key: "birthYear" },
                    { header: "Height (Cm)", key: "height" },
                    { header: "Mass (Kg)", key: "mass" },
                  ]}
                  data={filteredPeople}
                />
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};
