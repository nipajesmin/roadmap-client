import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
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
                 {!user ? ( 
                <div className="flex gap-3">
                    <Link to="/login">
                    <button className="text-blue-600">Login</button>
                    </Link>
                    
                    <Link to="/register">
                        <button className="bg-blue-600 text-white px-4 py-1 rounded">
                            Sign Up
                        </button>
                    </Link>
                </div>
                 ) : ( 
                <div onClick={signOutUser}
                className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Hi, {user.name}</span>
                    <button className="text-red-500 text-sm">Logout</button>
                </div>
                 )} 
            </div>
        </nav>

    );
};

export default Navbar;