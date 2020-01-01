import React from "react";
import Photos from "./Photos";
import fetch from "unfetch";
import { SWRConfig } from "swr";

const App: React.FC = () => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 2500,
        fetcher: url => {
          return fetch(
            `https://jsonplaceholder.typicode.com${url}`
          ).then((res: Response) => res.json());
        }
      }}
    >
      <Photos />
    </SWRConfig>
  );
};

export default App;
