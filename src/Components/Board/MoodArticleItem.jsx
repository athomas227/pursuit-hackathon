import React from "react";

const MoodArticleItem = ({ article }) => {
  // Extract the properties from the article object
  const headline = article.article.split(":")[0] || "No Title"; // Get the part before the first colon as the headline
  const snippet = article.article.split(":")[1] || "No Snippet"; // Get the part after the first colon as the snippet
  const web_url = article.url || "#";

  return (
    <div className="mood-item">
      <h2>{headline}</h2>
      <p>{snippet}</p>
      <a href={web_url} target="_blank" rel="noopener noreferrer">Read more...</a>
    </div>
  );
};

export default MoodArticleItem;
