import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = "This is an array of objects of fictional news articles. Rate all articles from most likely to cause an emotional reaction to least";

export const curateContent = async (articles) => {
  try {
    // iterate through the nyt article response and parse the headline, abstract, and web url
    const contentArray = articles.map(article => {
        const {headline, snippet, web_url } = article;
        return `${headline.main}: ${snippet} - ${web_url}`
    })

    // combine to full article content
    const contentString = contentArray.join('\n');

    const result = await model.generateContent(prompt, contentString);
    console.log(result.response);
    console.log("Gemini Call Finished");  
  } catch (error) {
    console.error("Error generating content:", error);
  }
};
