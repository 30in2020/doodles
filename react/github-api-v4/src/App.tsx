import React from "react";
import Fetch from "./Fetch";
import V3Fetch from "./V3Fetch";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Github API
        </a>
      </header>
      <Fetch
        label="Get my pinned repositories"
        query={`
          query {
            viewer {
              pinnedRepositories(first: 10, affiliations: [OWNER]) {
                nodes{
                  id
                  nameWithOwner
                }
              }
            }
          }
        `}
      />
      <Fetch
        label="Get '365daysofcommit' repository's information"
        query={`
          query {
            viewer {
              id
              bio
              email
              repository(name: "365daysofcommit") {
                name
                description 
                url
              }
            }
          }
        `}
      />
      <Fetch
        label="Get 'doodles' repository's commit history"
        query={`
          query {
            viewer {
              repository(name: "doodles") { 
                languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                  totalSize
                  edges {
                    size
                    node {
                      color
                      id
                      name
                    }
                  }
                }
                object(expression: "master") {
                  ... on Commit {
                    history {
                      totalCount
                      nodes {
                        committedDate
                        message
                        changedFiles
                        oid
                      }
                    }
                  }
                }
              }
            }
          }
        `}
      />
      <Fetch
        label="Get PR list"
        query={`
        query {
          viewer {
            pullRequests(first: 10) {
              nodes {
                id
                title
                repository {
                  id
                  nameWithOwner
                }
              }
            }
          }
        }
        `}
      />
      <V3Fetch
        url={
          "repos/30in2020/doodles/commits/c8a177cdb894d19b9fcfdad223a76bb4c64c1bb7"
        }
        label="Get Commit Patch Result"
      />
    </div>
  );
};

// It seems there is no API for getting patch history of commit.

export default App;
