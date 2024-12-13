import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
              Playlist Randomizer
            </Link>
            <div className="flex gap-4">
              <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-300">
                Home
              </Link>
              <Link to="/playlists" className="hover:text-gray-600 dark:hover:text-gray-300">
                Playlists
              </Link>
              <Link to="/spotify-auth" className="hover:text-gray-600 dark:hover:text-gray-300">
                Spotify Auth
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Playlist Randomizer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 