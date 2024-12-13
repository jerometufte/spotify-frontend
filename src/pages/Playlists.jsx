'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRandomize = async (playlistId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/playlist/randomize/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );
      alert(JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error('Randomization error:', err);
      alert('Failed to randomize playlist: ' + err.message);
    }
  };

  useEffect(() => {
    console.log('Fetching playlists');
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/playlists`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }
        );
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

  const filteredPlaylists = playlists.filter(playlist => 
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlist.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlist.owner?.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <h1 className="text-3xl font-bold mb-2">Playlist Randomizer</h1>
      <p className="text-gray-600 mb-6">{filteredPlaylists.length} playlists available</p>
      
      <div className="mb-6">
        <Input
          placeholder="Search playlists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-start">
        {playlists && playlists.length > 0 ? (
          <>
            {filteredPlaylists.map((playlist) => (
              <Card key={playlist.id} className="w-full">
                <CardHeader className="text-left">
                  <Link to={`/playlist/${playlist.id}`}>
                    <CardTitle>{playlist?.name || 'Untitled Playlist'}</CardTitle>
                  </Link>
                  <CardDescription>{playlist?.description || 'No description'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-left">
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-500 text-sm">Created by: {playlist?.owner?.display_name || 'Unknown owner'}</p>
                      <p className="text-gray-500 text-sm">Tracks: {playlist?.tracks?.total || 0}</p>
                      <a 
                        href={playlist?.external_urls?.spotify} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-600 underline"
                      >
                        Open in Spotify
                      </a>
                    </div>
                    <Button onClick={() => handleRandomize(playlist.id)} className="w-full">
                      Randomize
                    </Button>
                  </div>
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
