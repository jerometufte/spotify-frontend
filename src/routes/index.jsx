import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PATHS } from './paths';
import PrivateRoute from './PrivateRoute';

// Import Home directly instead of lazy loading for debugging
import Home from '../pages/Home';

// Lazy load other pages
const SpotifyAuth = lazy(() => import('../pages/SpotifyAuth'));
const Callback = lazy(() => import('../pages/Callback'));
const PlaylistRandomizer = lazy(() => import('../pages/PlaylistRandomizer'));
const NotFound = lazy(() => import('../pages/NotFound'));

export default function AppRoutes() {
  console.log('Rendering AppRoutes'); // Add this debug log

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.SPOTIFY_AUTH} element={<SpotifyAuth />} />
        <Route path={PATHS.CALLBACK} element={<Callback />} />
        
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path={PATHS.PLAYLIST} element={<PlaylistRandomizer />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
} 