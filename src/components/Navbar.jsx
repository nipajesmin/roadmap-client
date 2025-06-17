import React from 'react';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
            {/* Logo */}
            <div className="text-xl font-bold text-blue-600">PathPulse</div>

            {/* Nav Links (optional) */}
            <div className="hidden md:flex gap-4 text-gray-600">
                <a href="/">Home</a>
                <a href="/roadmap">Roadmap</a>
            </div>

            {/* Auth Buttons */}
            <div>
                {/* {!user ? ( */}
                    <div className="flex gap-3">
                        <button className="text-blue-600">Login</button>
                        <button className="bg-blue-600 text-white px-4 py-1 rounded">Sign Up</button>
                    </div>
                {/* ) : ( */}
                    <div className="flex items-center gap-2">
                        {/* <span className="text-sm text-gray-700">Hi, {user.name}</span> */}
                        <button className="text-red-500 text-sm">Logout</button>
                    </div>
                {/* )} */}
            </div>
        </nav>

    );
};

export default Navbar;