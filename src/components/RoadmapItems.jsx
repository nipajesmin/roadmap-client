import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RoadmapItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/roadmapItems')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching roadmap items:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Roadmap Items</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item._id} className="bg-white shadow rounded-lg p-4 border">
                        <span className={`inline-block text-xs font-semibold uppercase px-2 py-1 rounded mb-3 
                            ${item.category === "Feature" ? "bg-yellow-400 text-white"
                                : item.category === "Improvement" ? "bg-blue-500 text-white"
                                    : item.category === "Goal" ? "bg-green-500 text-white"
                                        : "bg-gray-400 text-white"
                            }`}>
                            {item.category}
                        </span>

                        <h2 className="text-lg font-bold mb-1">{item.title}</h2>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="text-sm">
                            <strong>Status:</strong> {item.status}
                        </div>
                        <Link to={`/roadmapItem/${item._id}`}>
                            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700">
                                View Details
                            </button>
                        </Link>

                    </div>
                ))}
            </div>


        </div>
    );
};

export default RoadmapItems;


