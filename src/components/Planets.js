import { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async ({ queryKey }) => {
  const [key, greetings, page] = queryKey;
  console.log(key);
  console.log(greetings);
  console.log(page);
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  // The useQuery hook is used to fetch data from the API.
  // The first argument is the name of the query, the second is the function that will fetch the data.
  // The third argument is an object that contains configurations for the query.
  // The query will be automatically re-run when the component is re-rendered.
  const { data, status } = useQuery(
    ["planets", "hello, ninjas", page],
    fetchPlanets,
    {
      onSuccess: () => console.log("Planets fetched successfully"),
      onError: () => console.log("Error fetching planets"),
    }
  );

  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button>
      {status === "error" && <div>Error fetching data!</div>}
      {status === "loading" && <div>Loading data...</div>}
      {status === "success" && (
        <div>
          {data?.results?.map((planet, index) => (
            <Planet planet={planet} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
