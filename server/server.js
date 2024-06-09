import express from 'express';
import { launch } from 'puppeteer';
import cors from 'cors';
const app = express();

app.use(cors());
app.get('/api/article-content', async (req, res) => {
  const url = req.query.url;

  try {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Implement your scraping logic here to extract the article content and image
    const articleData = await page.evaluate(() => {
      // Find the first image element on the page
      const imageElement = document.querySelector('img');
      const imageUrl = imageElement ? imageElement.src : null;
        // console.log(imageUrl);
      return { imageUrl };
    });
    // console.log(articleData);
    res.json(articleData.imageUrl);
    await browser.close();
    
  } catch (error) {
    console.error('Error fetching article content:', error);
    res.status(500).json({ error: 'Error fetching article content' });
  }
});

app.get('/spotify-auth', async (req, res) => {
  const { code } = req.query;
  const redirect_uri = `${process.env.CLIENT_URL}`;

  try {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }), {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // In a real app, store refresh_token securely (database, encrypted cookie)
    res.json({
      access_token: tokenResponse.data.access_token,
      expires_in: tokenResponse.data.expires_in
    });
  } catch (error) {
    console.error('Spotify auth error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get Spotify token' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

