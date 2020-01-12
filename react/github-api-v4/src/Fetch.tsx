import React from "react";
import useSWR from "swr";

console.log(process.env.REACT_APP_API_TOKEN);

interface IProps {
  query: string;
  label: string;
}

const Fetch: React.FC<IProps> = ({ query, label }) => {
  const { isValidating, data, error } = useSWR(
    query,
    (query: string) =>
      fetch(`https://api.github.com/graphql`, {
        method: "POST",
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_API_TOKEN}`
        },
        body: JSON.stringify({
          query: query
        })
      }).then((res: Response) => res.json()),
    {
      // you can also override the global option
      //refreshInterval: 3000
    }
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>{label}</h3>
      {isValidating || !data ? (
        <div>loading...</div>
      ) : (
        <pre>{JSON.stringify(data.data, null, 2)}</pre>
      )}
    </div>
  );
};

export default Fetch;
