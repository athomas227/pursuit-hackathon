import React, { useContext } from "react";
import { ArticleContext } from "../../helpers/ArticleContext";
import MoodArticleItem from '../Board/MoodArticleItem.jsx';

const MoodBoard = () => {
  const { article } = useContext(ArticleContext);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="src/Components/Home/Untitled3.mov"
        autoPlay
        muted
        loop
      ></video>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-6">
        <div className="text-white text-2xl font-bold"> Your Mood Board</div>
        <div className="bg-black bg-opacity-60 rounded-2xl mt-16 py-5 px-5">
        <div className="w-full max-w-lg text-white">
          {article && article.length > 0 && (
            <MoodArticleItem article={article[0]} />
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default MoodBoard;
