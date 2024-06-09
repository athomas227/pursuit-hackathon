// // src/helpers/spotifyHelper.js

// const getSpotifyToken = async () => {
//     const tokenEndpoint = 'https://accounts.spotify.com/api/token';
//     const authString = btoa(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`);
  
//     const response = await fetch(tokenEndpoint, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Basic ${authString}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: 'grant_type=client_credentials'
//     });
  
//     const data = await response.json();
//     return data.access_token;
//   };
  
//   export const searchSpotify = async (query, type = 'track', limit = 20) => {
//     const token = await getSpotifyToken();
//     const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`;
  
//     const response = await fetch(searchEndpoint, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
  
//     const data = await response.json();
//     return data[`${type}s`].items;
//   };


// src/helpers/spotifyHelper.js
import axios from 'axios';

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirect_uri = 'http://localhost:3000';

export const getSpotifyAuthUrl = () => {
  const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state'];
  return 'https://accounts.spotify.com/authorize' +
    `?client_id=${client_id}` +
    '&response_type=code' +
    `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
    `&scope=${encodeURIComponent(scopes.join(' '))}`;
};

export const getSpotifyTokens = async (code) => {
  const response = await axios.get(`http://localhost:5000/spotify-auth?code=${code}`);
  return response.data;
};

export const searchSpotify = async (query, type = 'track', limit = 20, token) => {
  const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`;
  const response = await axios.get(searchEndpoint, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data[`${type}s`].items;
};