import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [apidata, setApiData] = useState({
    apiStatus: 0,
    data: null,
    error: null,
    flag: false,
  });

  const handleSubmit = () => {
    getData();
  };
  const getData = async () => {
    let req = await fetch(
      "https://www.omdbapi.com/?t=" + searchTerm + "&plot=full&apikey=8c6abc5a"
    );
    let res = await req.json();
    if (res.Response === "False") {
      setApiData({
        apiStatus: -1,
        data: null,
        error: "No Data Found!",
        flag: true,
      });
    } else {
      setApiData({ apiStatus: 1, data: res, error: null, flag: true });
    }
    console.log(res);
  };
  return (
    <div className="App container">
      <h1 className="my-5 text-center">Movie DB</h1>
      <div class="mb-3 form-container d-flex">
        <div className="input">
          <input
            type="text"
            class="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Movie 'RRR'"
          />
        </div>
        <div className="btn-container" onClick={handleSubmit}>
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
      {apidata.apiStatus === 1 && (
        <div>
          <h2 className="text-center">{apidata.data.Title}</h2>
          <div className="container data-container">
            <div className="left">
              <img src={apidata.data.Poster} alt={apidata.data.poster} />
            </div>
            <div className="right">
              <div>
                <span className="fw-bold">Released Date: </span>
                <span>{apidata.data.Released}</span>
              </div>
              <div>
                <span className="fw-bold">Run Time: </span>
                <span>{apidata.data.Runtime}</span>
              </div>
              <div>
                <span className="fw-bold">Genre: </span>
                <span>{apidata.data.Genre}</span>
              </div>
              <div>
                <span className="fw-bold">Director: </span>
                <span>{apidata.data.Director}</span>
              </div>
              <div>
                <span className="fw-bold">Writer: </span>
                <span>{apidata.data.Writer}</span>
              </div>
              <div>
                <span className="fw-bold">Actors: </span>
                <span>{apidata.data.Actors}</span>
              </div>
              <div>
                <span className="fw-bold">Language: </span>
                <span>{apidata.data.Language}</span>
              </div>
              <div>
                <span className="fw-bold">imdbRating: </span>
                <span>{apidata.data.imdbRating}</span>
              </div>
              <div>
                <span className="fw-bold">Box Office: </span>
                <span>{apidata.data.BoxOffice}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {apidata.apiStatus === -1 && (
        <h3 className="text-center">{apidata.error}</h3>
      )}
      {apidata.apiStatus === 0 && apidata.flag && (
        <div className="loader">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
