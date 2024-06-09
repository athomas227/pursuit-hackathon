import React, { useEffect, useState } from "react";
import axios from "axios";

const MoodArticleItem = ({ article }) => {
  const [articleData, setArticleData] = useState({ content: "", imageUrl: "" });
  const headline = article.article.split(":")[0] || "No Title";
  const snippet = article.article.split(":")[1] || "No Snippet";
  const web_url = article.url || "#";

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/article-content', {
          params: {
            url: web_url,
          },
        });
        console.log(response.data);
        setArticleData(response.data);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    if (web_url !== "#") {
      fetchArticleData();
    }
  }, [web_url]);

  return (
    <div className="mood-item">
      <img src={articleData} alt="article image" />
      <h2>{headline}</h2>
      <p>{snippet}</p>
      <a href={web_url} target="_blank" rel="noopener noreferrer">
        Read more...
      </a>
    </div>
  );
};

export default MoodArticleItem;