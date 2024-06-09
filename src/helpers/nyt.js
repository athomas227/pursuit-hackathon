import { curateContent } from './gemini';
import axios from 'axios';

// Retrieve the API key from environment variables
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

// Function to fetch articles based on the query (mood)
export const fetchArticles = async (query) => {
  try {
    const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json`, {
      params: {
        q: query,      
        'api-key': NYT_API_KEY,  
      },
    });
    console.log(response.data.response.docs);
    return response.data.response.docs
    // await curateContent(response.data.response.docs)
  } catch (error) {
    console.error("Error fetching articles:", error); 
    throw error;
  }
};
