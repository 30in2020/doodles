import React from "react";
import useSWR from "swr";

interface IPost {
  data: {
    post: {
      id: string;
      title: string;
      body: string;
    };
  };
}

const initialData: IPost = {
  data: {
    post: {
      id: "",
      title: "",
      body: ""
    }
  }
};

const GraphQLFetch: React.FC = () => {
  const { isValidating, data = initialData, error } = useSWR<IPost>(
    `{
      post(id: 1) {
        id
        title
        body
      }
    }`,
    (query: string) =>
      fetch(`https://graphqlzero.almansi.me/api`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          query
        })
      }).then((res: Response) => res.json()),
    {
      // you can also override the global option
      refreshInterval: 3000
    }
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: 150 }}>
      <h3>GraphQL Fetch</h3>
      <p>refreshInterval: 3000</p>
      {isValidating ? <div>loading...</div> : data.data.post.title}
    </div>
  );
};

export default GraphQLFetch;
