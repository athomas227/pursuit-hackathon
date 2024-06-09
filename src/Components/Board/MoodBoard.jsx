import React, {useContext} from "react";
import { ArticleContext } from "../../helpers/ArticleContext";
import MoodArticleItem from '../Board/MoodArticleItem.jsx'

const MoodBoard = () => {
    const { article } = useContext(ArticleContext);

  return (
    <div className="mood-board">
        {article && article.length > 0 && (
        <MoodArticleItem article={article[0]} />
        )}
  </div>
  );
}

export default MoodBoard;

