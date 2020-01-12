import React from "react";
import Fetch from "./Fetch";

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
                languages(first: 10) {
                  edges {
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
    </div>
  );
};

// It seems there is no API for getting patch history of commit.

export default App;
