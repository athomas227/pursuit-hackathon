import React from 'react'
// import logo from '../Navbar/'

export default function Navbar() {
    return (
        <nav className="bg-sky-700">
            <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center">
                    {/* <img src={logo} alt="Logo" className="h-8 w-auto mr-4" /> */}
                    <span className="text-white font-bold text-xl">Logo</span>
                </div>

                {/* <form className="flex items-center mx-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        className="py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
                    >
                        Search
                    </button>
                </form> */}

                <button className="bg-transparent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                    Sign in
                </button>
            </div>
        </nav>
    )
}