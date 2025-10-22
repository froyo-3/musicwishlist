'use client';

import Image from "next/image";
import Head from "next/head";
import { useEffect } from "react";
import {
  fetchProfile,
  populateUI
} from "../utils/script";

import {
  redirectToAuthCodeFlow,
  getAccessToken
} from "../utils/authCode";

export default function Home() {
  useEffect(() => {
    async function handleSpotifyAuth() {
      const clientId = "c7ff425b1ff74405b3e017a5d490919e";
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        populateUI(profile);
      }
    }

    handleSpotifyAuth();
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Head>
        <title>My Spotify Profile</title>
      </Head>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Display your Spotify profile data</h1>

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
      </main>
    </div>
  );
}
