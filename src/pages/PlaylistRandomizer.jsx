'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function PlaylistRandomizer() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRandomize = async (playlistId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/playlist/randomize/${playlistId}`
      );
      alert(JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error('Randomization error:', err);
      alert('Failed to randomize playlist: ' + err.message);
    }
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/playlists`);
        console.log('API Response:', response.data);
        setPlaylists(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to fetch playlists, ' + err);
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Playlist Randomizer</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {playlists && playlists.length > 0 ? (
          <>
            {playlists.map((playlist) => (
              <Card key={playlist.id}>
                <CardHeader>
                  <CardTitle>{playlist?.name || 'Untitled Playlist'}</CardTitle>
                  <CardDescription>{playlist?.description || 'No description'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm mb-4">{playlist?.owner?.display_name || 'Unknown owner'}</p>
                  <Button onClick={() => handleRandomize(playlist.id)}>Randomize</Button>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <div className="col-span-full text-center text-xl text-gray-500">
            No Playlists Accessed
          </div>
        )}
      </div>
    </div>
  );
}
