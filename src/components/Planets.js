import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async () => {
  const res = await fetch("https://swapi.dev/api/planets/");
  return res.json();
};

const Planets = () => {
  // The useQuery hook is used to fetch data from the API.
  // The first argument is the name of the query, the second is the function that will fetch the data.
  // The third argument is an object that contains options for the query.
  // The query will be automatically re-run when the component is re-rendered.
  const { data, status } = useQuery("planets", fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>
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
