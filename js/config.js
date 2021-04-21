let apiURL = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
     ? "http://localhost:3000/api/cameras"
     :"https://apporinoco.herokuapp.com/api/cameras"