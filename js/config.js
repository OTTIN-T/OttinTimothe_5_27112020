let apiURL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://apporinoco.herokuapp.com";

let fileDirectory =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? ".."
    : ".";
