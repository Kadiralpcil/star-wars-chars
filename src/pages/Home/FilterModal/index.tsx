import Modal from "../../../components/Modal";
import {
  AllFilmQuery,
  AllSpeciesQuery,
  FilterSelect,
} from "../../../customTypes";

interface FilterModalProps {
  isFilterModalOpen: boolean;
  setFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filmsData?: AllFilmQuery;
  speciesData?: AllSpeciesQuery;
  selectedMovies: FilterSelect[];
  setSelectedMovies: React.Dispatch<React.SetStateAction<FilterSelect[]>>;
  selectedSpecies: FilterSelect[];
  setSelectedSpecies: React.Dispatch<React.SetStateAction<FilterSelect[]>>;
}

export const FilterModal = ({
  isFilterModalOpen,
  setFilterModalOpen,
  filmsData,
  speciesData,
  selectedMovies,
  setSelectedMovies,
  selectedSpecies,
  setSelectedSpecies,
}: FilterModalProps) => {
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
  return (
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
  );
};
