import { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (page = 1) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  // The useQuery hook is used to fetch data from the API.
  // The first argument is the name of the query, the second is the function that will fetch the data.
  // The third argument is an object that contains configurations for the query.
  // The query will be automatically re-run when the component is re-rendered.
  const { data, status, isPreviousData } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      onSuccess: () => console.log("Planets fetched successfully"),
      onError: () => console.log("Error fetching planets"),
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h2>Planets</h2>
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
            {data?.results?.map((planet, index) => (
              <Planet planet={planet} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
