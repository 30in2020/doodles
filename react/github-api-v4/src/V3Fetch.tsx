import React from "react";
import useSWR from "swr";

console.log(process.env.REACT_APP_API_TOKEN);

interface IProps {
  url: string;
  label: string;
}

const V3Fetch: React.FC<IProps> = ({ url, label }) => {
  const { isValidating, data, error } = useSWR(
    url,
    (url: string) =>
      fetch(`https://api.github.com/${url}`, {
        method: "GET",
        headers: {
          Authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
          Accept: "application/vnd.github.v3",
          "Content-Type": "application/json"
        }
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
        <>
          {data.files.map((el: any) => {
            console.log(el.patch);
            return (
              <>
                <pre>{JSON.stringify(el, null, 2)}</pre>
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default V3Fetch;
