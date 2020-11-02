import React, { useEffect, useState } from "react";
import './App.css';

import SpotifyWebApi from "spotify-web-api-js";

import Login from './components/Login';
import Player from "./components/Player";
import {getTokenFromUrl} from './components/spotify';

import {useStateProviderValue} from './components/StateProvider';

const spotify = new SpotifyWebApi();

function App() {

  const [{user, token}, dispatch] = useStateProviderValue();

  useEffect(() => {
    const hash = getTokenFromUrl();

    // after getting the token from url, clear the token from url for security purpose
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {

      dispatch({
        type: "SET_TOKEN",
        token: _token
      });

      spotify.setAccessToken(_token);

      spotify.getMe()
        .then((user) => {
          // console.log(user);
          dispatch({
            type: 'SET_USER',
            user: user
          })
      });

      spotify.getUserPlaylists()
        .then((playlists) => {
          // console.log(playlists)
          dispatch({
            type: "SET_PLAYLISTS",
            playlists: playlists
          })
      });

      // my discover weekly from ..../playlist/37i9dQZEVXcCoq2SWvwjY6
      spotify.getPlaylist('37i9dQZEVXcCoq2SWvwjY6')
        .then((res) => {
          dispatch({
              type: "SET_DISCOVER_WEEKLY",
              discover_weekly: res
          })
      });

      spotify.getMyTopArtists()
        .then((res) => {
          dispatch({
            type: "SET_TOP_ARTISTS",
            top_artists: res
          })
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify
      });

    }

    // console.log("Token ----->", hash);
  }, [token, dispatch]);

  // console.log("User", user);
  // console.log("Token---->", token);

  return (
    <div className="app">
      {
        token ? (
          <Player 
            spotify={spotify}
          />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
