import React from "react";
import useSWR from "swr";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Photos: React.FC = () => {
  const { isValidating, data: photos = [], error } = useSWR("/photos/", {
    // you can also override the global option
    refreshInterval: 5000
  });

  if (isValidating) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {photos.slice(0, 10).map((photo: Photo) => (
        <img src={photo.thumbnailUrl} alt={photo.title} />
      ))}
    </div>
  );
};

export default Photos;
