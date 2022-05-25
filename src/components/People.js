import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const res = await fetch("https://swapi.dev/api/people/");
  return res.json();
};

const People = () => {
  // The useQuery hook is used to fetch data from the API.
  // The first argument is the name of the query, the second is the function that will fetch the data.
  // The third argument is an object that contains options for the query.
  // The query will be automatically re-run when the component is re-rendered.
  const { data, status } = useQuery("people", fetchPeople, {
    onSuccess: () => console.log("People fetched successfully"),
    onError: () => console.log("Error fetching people"),
  });

  return (
    <div>
      <h2>People</h2>
      {status === "error" && <div>Error fetching data!</div>}
      {status === "loading" && <div>Loading data...</div>}
      {status === "success" && (
        <div>
          {data?.results?.map((person, index) => (
            <Person person={person} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
