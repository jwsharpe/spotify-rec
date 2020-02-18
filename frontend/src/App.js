import React, { useState, useEffect } from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";

const clientID = "597e471899ac448f91e1fda63f5dbc2d";
const clientSecret = "0496cdd46f05459f82ea8156dca92c2c";

const spotifyApi = new Spotify();

function App() {
  const [nowPlaying, setNowPlaying] = useState({
    name: "Not Checked",
    albumArt: ""
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  useEffect(() => {
    const params = getHashParams();
    const token = params.access_token;
    if (token) {
      setLoggedIn(true);
      spotifyApi.setAccessToken(token);
    }
  }, [0]);

  const getNowPlaying = async () => {
    spotifyApi.getMyCurrentPlayingTrack().then(
      function(data) {
        console.log("User playlists", data);
      },
      function(err) {
        console.error(err);
      }
    );
  };

  return (
    <div className="App">
      <a href="http://localhost:8888"> Login to Spotify </a>
      <div>Now Playing: {nowPlaying.name}</div>
      <div>
        <img src={nowPlaying.albumArt} style={{ height: 150 }} />
      </div>
      {loggedIn && <button onClick={getNowPlaying}>Check Now Playing</button>}
    </div>
  );
}

export default App;
