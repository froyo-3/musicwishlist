'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAccessToken,
  fetchProfile,
  populateUI
} from "../../utils/spotify-auth";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      const clientId = "c7ff425b1ff74405b3e017a5d490919e";
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        console.error("No code found in callback URL.");
        return;
      }

      try {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        populateUI(profile);

        // Optionally redirect back to homepage or another page
        // router.push("/");
      } catch (err) {
        console.error("Error during Spotify callback handling:", err);
      }
    }

    handleCallback();
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1>Logging you in with Spotify…</h1>
      <section id="profile" className="mt-8">
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
    </main>
  );
}
