import React from 'react';
import Quiz from '../Quiz/Quiz';

export default function Home() {
    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="src/Components/Home/Untitled.mov"
                autoPlay
                muted
                loop
            ></video>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex items-center justify-center h-full w-full">
                <Quiz />
            </div>
        </div>
    );
}
