import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../helpers/nyt";
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
        console.log("API Response:", articles); 

    } catch (error) {
        console.error("Error fetching article: ", error);
    }
  };

  return (
    <div>
      <br />
      <h3>How are you feeling today?</h3>
      <br />
      {Object.entries(randomWords).map(([mood, words]) => (
        <div key={mood}>
          <button onClick={() => responseHandler(mood)}>
            {words.join(" & ")}
          </button>
        </div>
      ))}
      <br />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}
