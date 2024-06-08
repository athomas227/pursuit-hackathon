import React, {useState, useEffect} from "react"
// 1. Build a list of synonyms based on semantic relation
// 2. Create a function that gets two random words in the moodSynonyms array
// 3. Use useEffect to only update the random words on mount
// 4. Create a function to handle responses, which sets the quiz answers to the user selected keywords in state
// 5. Create a submit handler to send the semantic key related to the keywords to the api for the request

export default function Quiz() {
    const moodSynonyms = {
        positive: ["Upbeat", "Cheerful", "Blessed", "Bright", "Glistening", "Goated"], 
        negative: ["Gloomy", "Somber", "Blue", "Distressed", "Down-in-dumps"],
        energetic: ["Energetic", "Active", "Spirited", "Wild"],
        neutral:  ["Vibing", "In-my-Lane", "Relaxed", "Calm"], 
        productive: ["Productive", "Efficient", "Focused", "Motivated"]
    };

    const getRandomWords = (words, count) => {
        // why am I shuffling like this?
        // Fisher-Yates Shuffle: runs on O(n) time, equal probability 
        const shuffled = [...words];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

    return (
        <div>
            <h1>Quiz</h1>

        </div>
    )
}