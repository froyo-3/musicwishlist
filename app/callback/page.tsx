'use client';

import { useEffect } from "react";
import {
  getAccessToken,
  fetchProfile,
  populateUI
} from "../../utils/spotify-auth";

export default function Callback() {
  useEffect(() => {
    async function handleSpotifyCallback() {
      const clientId = "c7ff425b1ff74405b3e017a5d490919e";
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        console.log(profile);
        populateUI(profile);
      } else {
        console.error("No code in URL");
      }
    }

    handleSpotifyCallback();
  }, []);

  return (
    <div>
      <h1>Loading your Spotify profile...</h1>
      <section id="profile">
        <h2>Logged in as <span id="displayName"></span></h2>
        <span id="avatar"></span>
        <ul>
          <li>User ID: <span id="id"></span></li>
          <li>Email: <span id="email"></span></li>
          <li>Spotify URI: <a id="uri" href="#"></a></li>
          <li>Link: <a id="url" href="#"></a></li>
          <li>Profile Image: <span id="imgUrl"></span></li>
        </ul>
      </section>
    </div>
  );
}
