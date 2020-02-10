import React, { useEffect, useState } from "react";
const Jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const App = () => {
  const [jwt, setJwt] = useState("");
  const [decoded, setDecoded] = useState("");

  useEffect(() => {
    //@ts-ignore
    const pki = window.forge.pki;
    const rsa = pki.rsa;
    const keypair = rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
    rsa.generateKeyPair(
      { bits: 2048, workers: 2 },
      (err: Error, keypair: CryptoKeyPair) => {
        if (err) {
          console.log(err);
        }
        console.log(pki.privateKeyToPem(keypair.privateKey));
        const token = Jwt.sign(
          {
            name: "30in2020",
            desc: "jwt-token-experiment"
          },
          `MIIEowIBAAKCAQEAtzvMMEt1LVuTtFo0VtbjJd23vWUPVyADWbp6/P/hGdg5Agn6
          PUU3KfSxRoToOjZTwFZdc717Vi4hFQFsJ6m93pzdw2Pw0D1PXjpoG6ahNEpt8v3I
          gm5Gm7fnap8sZrqbmmEufEoMlLFYPRydkl2TM83sDHXo1jNueibR//HCXBebmzOy
          Lrf5y5yv0cQ2Pm+nSbjqCaLeKHUzAmcngNS1+CB1dq3/Hnfj+grzlNpX+10K3Dtd
          Rk8VFbg7LG+1Ctd6Xwblt9ry0m+NwKbSlCkBgEsmTQNotgq7vWGWMCILn/HkTKcP
          876A4GSVGNqHV7dzeay17Hf4r/yAMhGso5+2PwIDAQABAoIBACNieNwatlY8CRob
          EWBzvwng90qr6Xp5xCvfx0B0aZQEHX43TwvmAfEoP9POdspHE4VhKErhnJ/X6KuV
          yr0eGnyS7oB9HFQaguk/fjtYwmjGttTmDYKiqSAJM7dzZa+w+bumaMO3yRYt6Uxj
          6koJqBOpAJynaH91DzCnroYuucnusYdphYkc0CRHCJRtg15IlWlfcooz1gBhbMsr
          ZUgAIwQkC3VNTpauaW7gfJaNFeh0dn8gKx1BVA1xDtgpu7Fa0idyE5OF3YyWIlGf
          eed8JnA2w3iMoBzUTwPxEhLWHt/9cY9Oe+8PPD8/6oB6+VEyV+zjJGWoqUm9mq2+
          P6NTzAECgYEA2VMkk7fRFjJCUHTCpYA9ugd4utq9WT2Q07kUdgdPsxFflySAKm7p
          Czmlgf96Y8wQ6V8j8jHtjgs8gjSL64c4k80DFIdSu8ooMXtmOdldaKMpqk9ErPJz
          GG+gNEmk0tdY0EFxNRvuiMQ9O1sfa+vZsl1q5aAJNRp/Ew5AcNRq9WECgYEA19eI
          OPMh7Zwe4tp0n7coJI/ThgwjVJwY2/UCvqzeb+HBhhoDCBBjJyCj/4T/Qb8bmxrk
          uSETLhCHcuAXKweI0nVy7TurJYGR0es+a+0pK97OO+yXEvSyQrEchwo/XyxalZDf
          ifuCtsPgmX2KCgWu9yyJ9amzZa3yfrXsJhf0r58CgYAGDGpYMiV/mKZ/1sAUGx2c
          r9iMWsoqUaxWODB5mHp/YVxnuHxYsf2KcnBIzfN6E5Pk6uD1PK5/5ZApj4zVYU4R
          zwLm710+HMJBnk2aDpKq9t+R/eLLbXQGmhS7X9FWjOfL5AZilARvigaqQD7/ofDN
          Jgxzl6Cp+bLPtPXWLhNMAQKBgQC3odJuiUPrULDiVfN00rHfcVIHsJn6aRepQylD
          qfVRAKPSAJ1lpfOFnXqJcNBuUjYdXuMLMj2MKlnifQ6Y+D8KtwvBE8vHDBZQnzCr
          R8mIXnXde6sIYJCsttxLc4d45FZo+ymDzixma/3Q+IKRhkZWWllBXVCYiEZQUVyJ
          CEaPhwKBgF+RZTblN2V1Jb3KtWyy7C1ko6BVYIxkjWIHfhct9C6X3NvuoiDSLjoK
          EdtbqH/ap2Oh4lCOCH9fSAw1L9JTx/iz5mIjcfTD8F0eQQMd8ZQu8gkGDoBrWueU
          hEHCyPCnJCEF9UyNE91amDNzGs/TL0qzmb+FLeZFZfiS0ykjKE9j`,
          { expiresIn: "1h" }
        );
        setJwt(token);
        console.log(pki.publicKeyToPem(keypair.publicKey));
        try {
          const decoded = Jwt.verify(
            token,
            `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtzvMMEt1LVuTtFo0Vtbj
            Jd23vWUPVyADWbp6/P/hGdg5Agn6PUU3KfSxRoToOjZTwFZdc717Vi4hFQFsJ6m9
            3pzdw2Pw0D1PXjpoG6ahNEpt8v3Igm5Gm7fnap8sZrqbmmEufEoMlLFYPRydkl2T
            M83sDHXo1jNueibR//HCXBebmzOyLrf5y5yv0cQ2Pm+nSbjqCaLeKHUzAmcngNS1
            +CB1dq3/Hnfj+grzlNpX+10K3DtdRk8VFbg7LG+1Ctd6Xwblt9ry0m+NwKbSlCkB
            gEsmTQNotgq7vWGWMCILn/HkTKcP876A4GSVGNqHV7dzeay17Hf4r/yAMhGso5+2
            PwIDAQAB`
          );
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
