import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import { useAuth } from '../../helpers/AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleSignOutClick = () => {
        logout();
        setIsLoggedIn(false);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-transparent absolute top-0 left-0 w-full z-20">
            <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                <Link to="/">
                <img src="src/Components/Navbar/imageedit_10_7740665889.png" alt="logo" className="h-12 w-auto" />
                </Link>

                {!isLoggedIn ? (
                    <button
                        className="bg-transparent border-white hover:bg-black hover:bg-opacity-50 text-white font-bold py-2 px-4 rounded ml-4"
                        onClick={handleSignUpClick}
                    >
                        Sign Up / Log in
                    </button>
                ) : (
                    <div className="relative">
                        <button
                            className="bg-transparent border-white hover:bg-black hover:bg-opacity-50 text-white font-bold py-2 px-4 rounded ml-4"
                            onClick={toggleDropdown}
                        >
                            Profile
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
                                <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    onClick={handleProfileClick}
                                >
                                    Profile
                                </button>
                                <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    onClick={handleSignOutClick}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
