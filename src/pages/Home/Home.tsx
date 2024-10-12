import { gql, useQuery } from "@apollo/client";
import { PeopleConnection, Person } from "../../types";
import CustomTable from "../../components/CustomTable";

import "./home.scss";

export type AllPeopleQuery = {
  allPeople: PeopleConnection;
};

export const Home = () => {
  const GET_CHARS = gql`
    query AllPeople {
      allPeople {
        totalCount
        people {
          id
          name
          gender
          birthYear
          height
          mass
        }
      }
    }
  `;
  const { loading, data } = useQuery<AllPeopleQuery>(GET_CHARS);

  const filteredPeople =
    data?.allPeople.people?.filter((person): person is Person => !!person) ||
    [];

  return (
    <div className="main">
      <div className="main-wrapper">
        <CustomTable<Person>
          columns={[
            { header: "Name", key: "name" },
            { header: "Gender", key: "gender" },
            { header: "Birth Year", key: "birthYear" },
            { header: "Height (Cm)", key: "height" },
            { header: "Mass (Kg)", key: "mass" },
          ]}
          data={filteredPeople}
          onLoading={loading}
        />
      </div>
    </div>
  );
};
