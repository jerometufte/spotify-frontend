import { useEffect, useState } from 'react';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/callback"; // Your React app URL
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "playlist-modify-private playlist-modify-public";

function SpotifyAuth() {
    const [token, setToken] = useState("");

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            setToken(token);
            // Store token in localStorage or state management solution
            localStorage.setItem("token", token);
            window.location.hash = "";
        }
    }, []);

    const login = () => {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    }

    return (
        <div>
            {!token ?   
                <button onClick={login}>Login to Spotify</button>
            :
                <p>Logged in</p>
            }
        </div>
    );
}

export default SpotifyAuth;