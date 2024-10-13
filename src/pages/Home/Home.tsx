import { useQuery } from "@apollo/client";
import CustomTable from "../../components/CustomTable";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import { useMemo, useState } from "react";
import "./home.scss";
import {
  AllFilmQuery,
  AllPeopleQuery,
  AllSpeciesQuery,
  FilterSelect,
} from "../../customTypes";
import {
  GET_ALL_PEOPLE,
  GET_ALL_FILMS,
  GET_ALL_SPECIES,
} from "../../Queries/queries";
import { Person } from "../../types";
import Loader from "../../components/Loader";

export const Home = () => {
  const [selectedMovies, setSelectedMovies] = useState<FilterSelect[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<FilterSelect[]>([]);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const updateSelectedItems = (
    selectedItems: FilterSelect[],
    setSelectedItems: React.Dispatch<React.SetStateAction<FilterSelect[]>>,
    id: string,
    name: string
  ) => {
    const isSelected = selectedItems.some((item) => item.id === id);
    setSelectedItems((prev) =>
      isSelected
        ? prev.filter((item) => item.id !== id)
        : [...prev, { id, name }]
    );
  };

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
          <Modal
            className="home-modal"
            show={isFilterModalOpen}
            onClose={() => setFilterModalOpen(false)}
          >
            <div className="home-modal-content-wrapper">
              <div className="home-modal-title">Movies</div>
              <div className="home-modal-value-wrapper">
                {filmsData?.allFilms.films.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      updateSelectedItems(
                        selectedMovies,
                        setSelectedMovies,
                        item.id,
                        item.title
                      )
                    }
                    className={`home-modal-value ${
                      selectedMovies.some((movie) => movie.id === item.id)
                        ? "selected"
                        : ""
                    }`}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
            <div className="home-modal-content-wrapper">
              <div className="home-modal-title">Species</div>
              <div className="home-modal-value-wrapper">
                {speciesData?.allSpecies.species.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      updateSelectedItems(
                        selectedSpecies,
                        setSelectedSpecies,
                        item.id,
                        item.name
                      )
                    }
                    className={`home-modal-value ${
                      selectedSpecies.some((species) => species.id === item.id)
                        ? "selected"
                        : ""
                    }`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </Modal>
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
