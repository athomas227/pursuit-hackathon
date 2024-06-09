import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-transparent absolute top-0 left-0 w-full z-20">
            <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                <Link to="/">
                <img src="src/Components/Navbar/imageedit_10_7740665889.png" alt="logo" className="h-12 w-auto" />
                </Link>

                <button className="bg-transparent border-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                    Sign Up
                </button>
            </div>
        </nav>
    );
}
