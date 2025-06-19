import React from 'react';
import Roadmap from './Roadmap';

const Home = () => {
    return (
        <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 px-6">
                {/* Left Side - Image */}
                <div className="md:w-1/2">
                    <img
                        src="/public/banner.jpg"
                        alt="Hero Visual"
                        className="w-full h-auto"
                    />
                </div>

                {/* Right Side - Text Content */}
                <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-blue-600 font-semibold text-sm mb-2">
                        COLLABORATIVE ROADMAP TOOL
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        Empower users to shape your product direction
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Let users upvote ideas, leave comments, and join discussions to make product development truly community-driven.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium">
                            Explore Roadmap
                        </button>
                        <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full font-medium">
                            Join the Discussion
                        </button>
                    </div>
                </div>

            </div>
        </section>
        
    );
};

export default Home;