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

const Fetch: React.FC = () => {
  const { isValidating, data = initialData, error } = useSWR<IPost>(
    `{
      Query {
        query {
          repository(owner:"octocat", name:"Hello-World") {
            issues(last:20, states:CLOSED) {
              edges {
                node {
                  title
                  url
                  labels(first:5) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
    (query: string) =>
      fetch(`https://api.github.com/graphql`, {
        method: "POST",
        headers: {
          Authorization: `bearer ${process.env.API_TOKEN}`
        },
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
      {isValidating ? <div>loading...</div> : JSON.stringify(data.data)}
    </div>
  );
};

export default Fetch;
