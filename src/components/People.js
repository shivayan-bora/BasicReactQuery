import { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async (page = 1) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);

  // The useQuery hook is used to fetch data from the API.
  // The first argument is the name of the query, the second is the function that will fetch the data.
  // The third argument is an object that contains options for the query.
  // The query will be automatically re-run when the component is re-rendered.
  const { data, status, isPreviousData } = useQuery(
    ["people", page],
    () => fetchPeople(page),
    {
      onSuccess: () => console.log("People fetched successfully"),
      onError: () => console.log("Error fetching people"),
    }
  );

  return (
    <div>
      <h2>People</h2>
      {status === "error" && <div>Error fetching data!</div>}
      {status === "loading" && <div>Loading data...</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() => {
              if (!isPreviousData && data.next) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData || !data?.next}
          >
            Next Page
          </button>
          <div>
            {data?.results?.map((person, index) => (
              <Person person={person} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
