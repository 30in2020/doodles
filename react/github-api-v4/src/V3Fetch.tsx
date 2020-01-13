import React from "react";
import useSWR from "swr";
import * as Diff2Html from "diff2html";
import { LineMatchingType } from "diff2html/lib/types";
import "diff2html/bundles/css/diff2html.min.css";

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
          Accept: "application/vnd.github.v3+json",
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: Diff2Html.html(el.patch, {
                      drawFileList: true,
                      matching: LineMatchingType.LINES
                    })
                  }}
                />
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default V3Fetch;
