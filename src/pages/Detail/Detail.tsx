import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Person } from "../../types";

import "./detail.scss";
import Loader from "../../components/Loader";
export type PeopleQuery = {
  person: Person;
};

const GET_PERSON = gql`
  query person($characterId: ID!) {
    person(id: $characterId) {
      id
      name
      gender
      birthYear
      height
      mass
      eyeColor
      hairColor
      skinColor
      homeworld {
        name
      }
      species {
        name
      }
      filmConnection {
        totalCount
        films {
          title
        }
      }
      starshipConnection {
        totalCount
        starships {
          name
        }
      }
      vehicleConnection {
        totalCount
        vehicles {
          name
        }
      }
    }
  }
`;

export const Detail = () => {
  const [searchParams] = useSearchParams();

  const characterId = useMemo(() => {
    return searchParams.get("id");
  }, [searchParams]);

  const { loading, data, error } = useQuery<PeopleQuery>(GET_PERSON, {
    variables: { characterId },
    skip: !characterId,
  });

  const person = useMemo(() => {
    return data?.person;
  }, [data]);

  if (loading)
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="detail-container">
      <div className="person-name">{person?.name}</div>
      <div className="person-details">
        <div className="info-section">
          <h2>Basic Information</h2>
          <p>
            <strong>Gender:</strong> {person?.gender}
          </p>
          <p>
            <strong>Birth Year:</strong> {person?.birthYear}
          </p>
          <p>
            <strong>Height:</strong> {person?.height} cm
          </p>
          <p>
            <strong>Mass:</strong> {person?.mass} kg
          </p>
          <p>
            <strong>Eye Color:</strong> {person?.eyeColor}
          </p>
          <p>
            <strong>Hair Color:</strong> {person?.hairColor}
          </p>
          <p>
            <strong>Skin Color:</strong> {person?.skinColor}
          </p>
        </div>
        <div className="info-section">
          <h2>Homeworld</h2>
          <p>{person?.homeworld?.name}</p>
        </div>
        <div className="info-section">
          <h2>Film Appearances</h2>
          {person?.filmConnection?.films?.map((film, index) => (
            <p key={index}>{film?.title}</p>
          ))}
        </div>
        <div className="info-section">
          <h2>Starships</h2>
          {person?.starshipConnection?.starships?.length ? (
            person?.starshipConnection.starships.map((starship, index) => (
              <p key={index}>{starship?.name}</p>
            ))
          ) : (
            <p>No Starships</p>
          )}
        </div>
        <div className="info-section">
          <h2>Vehicles</h2>
          {person?.vehicleConnection?.vehicles?.length ? (
            person?.vehicleConnection.vehicles.map((vehicle, index) => (
              <p key={index}>{vehicle?.name}</p>
            ))
          ) : (
            <p>No Vehicles</p>
          )}
        </div>
        <div className="info-section">
          <h2>Species</h2>
          {person?.species ? <p>{person?.species?.name}</p> : <p>No Species</p>}
        </div>
      </div>
    </div>
  );
};
