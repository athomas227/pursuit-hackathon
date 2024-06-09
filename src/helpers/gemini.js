import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export const curateContent = async (query, articles) => {
  try {
    const prompt = `This is an array of objects of fictional news articles. Rate all articles from most likely to cause an emotional reaction based on the feeling "${query}" to least and return only json data and must have these keys: article: , web_url: , snippet: `;
    // iterate through the nyt article response and parse the headline, abstract, and web url
    const contentArray = articles.map(article => {
        const { headline, snippet, web_url } = article;
        return `${headline.main}: ${snippet} - ${web_url}`;
    });

    // combine to full article content
    const contentString = `${prompt}\n${contentArray.join('\n')}`;

    const result = await model.generateContent(contentString);

    // Access the nested text content
    const responseText = result.response.candidates[0].content.parts[0].text;
    
    // Remove markdown markers and parse JSON
    const jsonString = responseText.replace(/```json\n|```/g, '');
    const jsonData = JSON.parse(jsonString);

    console.log(jsonData);
    console.log("Gemini Call Finished");  
    return jsonData;
    
  } catch (error) {
    console.error("Error generating content:", error);
  }
};
