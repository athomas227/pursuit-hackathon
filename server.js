// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.get('/spotify-auth', async (req, res) => {
  const { code } = req.query;
  const redirect_uri = 'http://localhost:3000';
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  try {
    const { data } = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
    }), {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get token' });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));