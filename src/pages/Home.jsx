export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Welcome to Playlist Randomizer</h1>
            <p className="mt-4">Get started by logging in with Spotify</p>
            <button
                onClick={() => window.location.href = '/playlist-randomizer'}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white"
            >
                Go to Playlist Randomizer
            </button>

        </div>
    );
}