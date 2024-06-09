import React, { useEffect, useState } from "react";
import axios from "axios";

const MoodArticleItem = ({ article }) => {
  const [articleData, setArticleData] = useState({ content: "", imageUrl: "" });

  // Destructure the properties directly from the article object
  const { article: headline, snippet, web_url } = article;

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/article-content', {
          params: {
            url: web_url,
          },
        });
        // console.log(response.data);
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
      {articleData && <img src={articleData} alt="article image" />}
      <h2>{headline}</h2>
      <p>{snippet}</p>
      <a href={web_url} target="_blank" rel="noopener noreferrer">
        Read more...
      </a>
    </div>
  );
};

export default MoodArticleItem;
