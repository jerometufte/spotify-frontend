import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PATHS } from './paths';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/Layout';

// Import Home directly instead of lazy loading for debugging
import Home from '../pages/Home';

// Lazy load other pages
const SpotifyAuth = lazy(() => import('../pages/SpotifyAuth'));
const Callback = lazy(() => import('../pages/Callback'));
const Playlists = lazy(() => import('../pages/Playlists'));
const NotFound = lazy(() => import('../pages/NotFound'));
const User = lazy(() => import('../pages/User'));
const Playlist = lazy(() => import('../pages/Playlist'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.SPOTIFY_AUTH} element={<SpotifyAuth />} />
          <Route path={PATHS.CALLBACK} element={<Callback />} />
          
          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path={PATHS.PLAYLISTS} element={<Playlists />} />
            <Route path={PATHS.USER} element={<User />} />
            <Route path={PATHS.PLAYLIST} element={<Playlist />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
} 