import React, { createContext, useState } from "react";

const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
  const [article, setArticle] = useState(null);

  return (
    <ArticleContext.Provider value={{ article, setArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext, ArticleProvider };
