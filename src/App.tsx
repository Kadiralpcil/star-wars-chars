import { useQuery, gql } from "@apollo/client";
import "./App.css";
import { Root } from "./types";
import { useEffect, useState } from "react";

function DisplayLocations() {
  const GET_FILMS = gql`
    query Root {
      allFilms {
        totalCount
        films {
          id
          title
        }
      }
    }
  `;

  const [filmsData, setFilmsData] = useState<Root>();

  const { loading, error, data } = useQuery(GET_FILMS);

  useEffect(() => {
    setFilmsData(data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {filmsData &&
        filmsData.allFilms &&
        filmsData.allFilms.films &&
        filmsData.allFilms?.films.map((film) => (
          <div key={film?.id}>{film?.title}</div>
        ))}
    </div>
  );
}
function App() {
  return (
    <div>
      <h2>React TypeScript GraphQL Apollo 🚀</h2>
      <br />
      <DisplayLocations />
    </div>
  );
}

export default App;
