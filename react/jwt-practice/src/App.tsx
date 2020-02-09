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
      "secret",
      { expiresIn: "1h" }
    );
    setJwt(token);
    const decoded = Jwt.verify(token, "secret");
    setDecoded(decoded);
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
