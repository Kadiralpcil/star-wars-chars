import { useState, useCallback } from "react";

import { gql, useQuery } from "@apollo/client";
import { PeopleConnection, Person } from "../../types";
import CustomTable from "../../components/CustomTable";

export type AllPeopleQuery = {
  allPeople: PeopleConnection;
};

export const Home = () => {
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const GET_ALL_PEOPLE = gql`
    query AllPeople($after: String, $first: Int) {
      allPeople(first: $first, after: $after) {
        totalCount
        people {
          id
          name
          gender
          birthYear
          height
          mass
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;

  const { loading, data, fetchMore } = useQuery<AllPeopleQuery>(
    GET_ALL_PEOPLE,
    {
      variables: { after: null, first: itemPerPage },
      fetchPolicy: "cache-and-network",
    }
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      const alreadyFetchedPeople = data?.allPeople?.people || [];
      const afterCursor = data?.allPeople.pageInfo.endCursor || null;

      const startIdx = (newPage - 1) * itemPerPage;
      const endIdx = startIdx + itemPerPage;

      if (alreadyFetchedPeople.length >= endIdx) {
        setCurrentPage(newPage);
        return;
      }

      if (newPage > currentPage && data?.allPeople.pageInfo.hasNextPage) {
        setCurrentPage(newPage);
        fetchMore({
          variables: {
            after: afterCursor,
            first: itemPerPage,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult;

            return {
              allPeople: {
                ...fetchMoreResult.allPeople,
                people: [
                  ...(prevResult?.allPeople?.people || []),
                  ...(fetchMoreResult?.allPeople?.people || []),
                ],
              },
            };
          },
        });
      } else {
        setCurrentPage(newPage);
      }
    },
    [data, fetchMore, currentPage, itemPerPage]
  );

  const filteredPeople =
    data?.allPeople.people?.filter((person): person is Person => !!person) ||
    [];

  return (
    <div className="main">
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
        itemPerPage={itemPerPage}
        totalCount={data?.allPeople?.totalCount || 0}
        onPageChange={handlePageChange}
        onSelectItemPerPage={(value: number) => setItemPerPage(value)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
