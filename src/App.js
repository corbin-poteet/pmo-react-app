import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
//import preview card
import PreviewCard from "./components/PreviewCard";
import PreviewCards from "./components/PreviewCards";

function App() {
  const CLIENT_ID = "0876b3cbdd284d49ac26ded9817b6d6d";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  
  
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [audioObject, setAudioObject] = useState(null);

  const playTrack = (track) => {
    if (audioObject) {
      audioObject.pause();
    }

    const newAudioObject = new Audio(track.preview_url);
    setAudioObject(newAudioObject);

    newAudioObject.play();
  };

  const searchTracks = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "paramore",
        type: "track",
      },
    });

    return data;
    //setTracks(data.tracks.items);
    //playTrack(data.tracks.items[0].preview_url);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <div>
            <PreviewCards token={token} audioObject={audioObject} />
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
