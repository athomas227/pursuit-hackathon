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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});