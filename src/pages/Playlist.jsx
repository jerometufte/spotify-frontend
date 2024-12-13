'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Playlist() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/playlists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }
        );
        console.log(response.data);
        setPlaylist(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching playlist:', err);
        setError('Failed to fetch playlist details: ' + err.message);
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

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
      {playlist && (
        <div className="space-y-6">
          <div className="flex items-start gap-6">
            {playlist.images?.[0]?.url && (
              <img 
                src={playlist.images[0].url} 
                alt={playlist.name} 
                className="w-48 h-48 object-cover rounded-lg"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
              <p className="text-gray-600">{playlist.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Created by: {playlist.owner?.display_name}
              </p>
              <p className="text-sm text-gray-500">
                {playlist.tracks?.total} tracks • {playlist.followers?.total} followers
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Tracks</h2>
            <div className="space-y-2">
              {playlist.tracks?.items?.map((item, index) => (
                <Card key={item.track.id || index} className="w-full">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.track.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.track.artists?.map(artist => artist.name).join(', ')}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {Math.floor(item.track.duration_ms / 60000)}:
                        {String(Math.floor((item.track.duration_ms % 60000) / 1000)).padStart(2, '0')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
