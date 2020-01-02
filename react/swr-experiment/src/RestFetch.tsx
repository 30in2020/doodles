import React from "react";
import useSWR from "swr";

interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const RestFetch: React.FC = () => {
  const { isValidating, data: photos = [], error } = useSWR(
    "/photos/",
    (url: string) =>
      fetch(
        `https://jsonplaceholder.typicode.com${url}`
      ).then((res: Response) => res.json()),
    {
      // you can also override the global option
      refreshInterval: 5000
    }
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: 400 }}>
      <h3>Rest Fetch</h3>
      <p>refreshInterval: 5000</p>
      {isValidating ? (
        <div>loading...</div>
      ) : (
        photos
          .slice(0, 10)
          .map((photo: IPhoto) => (
            <img src={photo.thumbnailUrl} alt={photo.title} />
          ))
      )}
    </div>
  );
};

export default RestFetch;
