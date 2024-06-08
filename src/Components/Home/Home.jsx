import React from 'react'
import Quiz from '../Quiz/Quiz'

export default function Home() {

    return (
        <div className="h-screen w-screen bg-gradient-to-b from-sky-700 to-sky-900 flex items-center justify-center">
            <div>
                <Quiz />
            </div>
        </div>
    )
}