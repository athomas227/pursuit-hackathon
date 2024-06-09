import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../helpers/nyt";
import { fetchPhotos } from "../../helpers/pexels";
import { useNavigate } from "react-router-dom";
// 1. Build a list of synonyms based on semantic relation
// 2. Create a function that gets two random words in the moodSynonyms array
// 3. Use useEffect to only update the random words on mount
// 4. Create a function to handle responses, which sets the quiz answers to the user selected keywords in state
// 5. Create a submit handler to send the semantic key related to the keywords to the api for the request

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [randomWords, setRandomWords] = useState({});

  // List of synonyms based on semantic relation
  const moodSynonyms = {
    positive: ["Upbeat", "Cheerful", "Blessed", "Bright", "Glistening", "Goated"],
    negative: ["Gloomy", "Somber", "Blue", "Distressed", "Down-in-dumps"],
    energetic: ["Energetic", "Active", "Spirited", "Wild"],
    neutral: ["Vibing", "In-my-Lane", "Relaxed", "Calm"],
    productive: ["Productive", "Efficient", "Focused", "Motivated"]
  };

  // why am I shuffling like this?
  // Fisher-Yates Shuffle: runs on O(n) time, equal probability 
  const getRandomWords = (words, count) => {
    const shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  // useEffect to update random words on mount only
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
  };

  const submitHandler = async () => {
    console.log("User answers:", answers);
    const selectedMood = Object.keys(answers)[0];
    const query = selectedMood;

    try {
        const articles = await fetchArticles(query); // Fetch articles based on the mood
        const photos = await fetchPhotos(query); // Fetch photos based on the mood
        console.log("API Response:", articles);
        console.log("API Response:", photos);

    } catch (error) {
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

  return (
    <div className="text-center bg-black bg-opacity-40 rounded-2xl mt-16">
      <br />
      <div className="pl-7 pr-7 pb-5">
        <h3 className="text-xl text-white">How are you feeling today?</h3>
        <br />
        {Object.entries(randomWords).map(([mood, words]) => (
          <div key={mood}>
            <button
              className={`mb-1 shadow-outline-white rounded-xl px-3 py-2 ${moodToColorClass[mood]}`}
              onClick={() => responseHandler(mood)}
            >
              {words.join(" & ")}
            </button>
          </div>
        ))}
        <br />
        <button className="bg-transparent border-white text-white font-bold shadow-outline-white rounded-xl px-3 py-2" onClick={submitHandler}>Submit</button>
      </div>
    </div>
  );
}
