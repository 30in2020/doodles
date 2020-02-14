import React, { useEffect, useState } from "react";
const Jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const App = () => {
  const [jwt, setJwt] = useState("");
  const [decoded, setDecoded] = useState("");

  useEffect(() => {
    const token = Jwt.sign(
      {
        name: "30in2020",
        desc: "jwt-token-experiment"
      },
      process.env.REACT_APP_PRIV_KEY,
      { expiresIn: "1h", algorithm: "RS256" },
      (err: Error, token: string) => {
        console.log(err);
        console.log(token);
        setJwt(token);
        try {
          const decoded = Jwt.verify(token, process.env.REACT_APP_PUB_KEY);
          setDecoded(decoded);
        } catch (err) {
          setDecoded(err);
        }
      }
    );
  }, []);
  return (
    <div className="App">
      <div>jwt: {jwt}</div>
      <br />
      <div>
        decoded: <pre>{JSON.stringify(decoded)}</pre>
      </div>
    </div>
  );
};

export default App;
