import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate(); // used for redirection

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                navigate('/login'); // redirect after logout
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    };

    return (
        <nav
            className="flex justify-between items-center p-4 shadow-md"
            style={{ backgroundColor: 'rgb(10,186,181)' }}
        >
            {/* Logo */}
            <div className="text-xl font-bold text-white">PathPulse</div>

            {/* Nav Links */}
            <div className="hidden md:flex gap-4 text-white font-medium ">
                <a href="/" className='hover:underline'>Home</a>
                <a href="#roadmap" className='hover:underline'>Roadmap</a>
            </div>

            {/* Auth Buttons */}
            <div>
                {!user ? (
                    <div className="flex gap-3">
                        <Link to="/login">
                            <button
                                className="px-6 py-2 rounded-full font-medium border text-white"
                                style={{
                                    borderColor: 'white',
                                    color: 'white',
                                }}
                            >
                                Login
                            </button>
                        </Link>

                        <Link to="/register">
                            <button
                                className="px-6 py-2 rounded-full font-medium border bg-white text-[rgb(10,186,181)]"
                                style={{
                                    borderColor: 'white',
                                }}
                            >
                                Sign Up
                            </button>
                        </Link>
                    </div>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 rounded-full font-medium border text-white"
                        style={{
                            borderColor: 'white',
                            color: 'white',
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

