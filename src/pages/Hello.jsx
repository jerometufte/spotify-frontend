import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // or 'next/link' for Next.js

export default function Hello() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Hello?</h1>
            <p className="mt-4">Get started by logging in with Spotify</p>
            <Button asChild className="mt-4">
                <Link to="/playlists">
                    Go to Playlist Randomizer
                </Link>
            </Button>
        </div>
    );
}