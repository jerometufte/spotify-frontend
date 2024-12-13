import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/callback"; // Your React app URL
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "playlist-modify-private playlist-modify-public playlist-read-private playlist-read-collaborative";

function SpotifyAuth() {
    const [token, setToken] = useState(() => localStorage.getItem("access_token"));

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = () => {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    }

    const logout = () => {
        setToken("");
        localStorage.removeItem("access_token");
    }

    return (
        <div>
            {!token ?   
                <Button onClick={login}>Login to Spotify</Button>
            :
                <div>
                    <p>Logged in</p>
                    <Button variant="destructive" onClick={logout}>Logout</Button>
                </div>
            }
        </div>
    );
}

export default SpotifyAuth;