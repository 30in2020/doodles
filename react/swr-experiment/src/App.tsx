import React from "react";
import RestFetch from "./RestFetch";
import GraphQLFetch from "./GraphQLFetch";
import SuspenseLoading from "./SuspenseLoading";

const App: React.FC = () => {
  return (
    <>
      <RestFetch />
      <GraphQLFetch />
      <SuspenseLoading />
    </>
  );
};

export default App;
