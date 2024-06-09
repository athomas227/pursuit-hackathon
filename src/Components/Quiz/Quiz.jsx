import React, { useState, useEffect, useContext } from "react";
import { fetchArticles } from "../../helpers/nyt";
import { curateContent } from "../../helpers/gemini";
import { fetchPhotos } from "../../helpers/pexels";
import { useNavigate } from "react-router-dom";
import { ArticleContext } from "../../helpers/ArticleContext";
import Loading from "../Loading/Loading";

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [randomWords, setRandomWords] = useState({});
  const { setArticle } = useContext(ArticleContext);
  const [loading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

  // List of synonyms based on semantic relation
  const moodSynonyms = {
    positive: ["Upbeat", "Cheerful", "Blessed", "Bright", "Glistening", "Goated"],
    negative: ["Gloomy", "Somber", "Blue", "Distressed", "Down-in-dumps"],
    energetic: ["Energetic", "Active", "Spirited", "Wild"],
    neutral: ["Vibing", "In-my-Lane", "Relaxed", "Calm"],
    productive: ["Productive", "Efficient", "Focused", "Motivated"]
  };

  // Fisher-Yates Shuffle: runs on O(n) time, equal probability 
  const getRandomWords = (words, count) => {
    const shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const words = {};
    for (const [mood, moodWords] of Object.entries(moodSynonyms)) {
      words[mood] = getRandomWords(moodWords, 2);
    }
    setRandomWords(words);
  }, []);

  const responseHandler = (mood) => {
    setAnswers({
      [mood]: randomWords[mood]
    });
    setSelectedMood(mood);
  };

  const submitHandler = async () => {
    console.log("User answers:", answers);
    const selectedMood = Object.keys(answers)[0];

    if (!selectedMood) {
      alert("WHOA WHOA, what's the vibe?");
      return;
    }

    const query = selectedMood;

    try {
      setLoading(true);
      const articles = await fetchArticles(query); // Fetch articles based on the mood
      const curateArticles = await curateContent(articles)
      setArticle(curateArticles);
      const photos = await fetchPhotos(query); // Fetch photos based on the mood
      console.log("API Response:", articles);
      console.log("API Response:", photos);
      setLoading(false);
      navigate("/board", { state: { articles, photos } });
    } catch (error) {
      setLoading(false);
      console.error("Error fetching article: ", error);
    }
  };

  const moodToColorClass = {
    positive: "hover:bg-positiveHover",
    negative: "hover:bg-negativeHover",
    energetic: "hover:bg-energeticHover",
    neutral: "hover:bg-neutralHover",
    productive: "hover:bg-productiveHover"
  };

  const selectedMoodToColorClass = {
    positive: "bg-positiveHover",
    negative: "bg-negativeHover",
    energetic: "bg-energeticHover",
    neutral: "bg-neutralHover",
    productive: "bg-productiveHover"
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="text-center bg-black bg-opacity-40 rounded-2xl mt-16">
          <br />
          <div className="pl-7 pr-7 pb-5">
            <h3 className="text-xl text-white">How are you feeling today?</h3>
            <br />
            {Object.entries(randomWords).map(([mood, words]) => (
              <div key={mood}>
                <button
                  className={`mb-1 shadow-outline-white rounded-xl px-3 py-2 ${selectedMood === mood ? selectedMoodToColorClass[mood] : moodToColorClass[mood]}`}
                  onClick={() => responseHandler(mood)}
                >
                  {words.join(" & ")}
                </button>
              </div>
            ))}
            <br />
            <button
              className="bg-transparent border-white text-white font-bold shadow-outline-white rounded-xl px-3 py-2 hover:bg-black hover:bg-opacity-70"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
