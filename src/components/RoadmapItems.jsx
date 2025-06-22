import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';


const RoadmapItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");
    const [sort, setSort] = useState("Newest");

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://roadmap-server-pi.vercel.app/roadmapItems')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setFilteredItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching roadmap items:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let temp = [...items];

        if (category !== "All") {
            temp = temp.filter(item => item.category === category);
        }

        if (status !== "All") {
            temp = temp.filter(item => item.status === status);
        }

        if (sort === "Most Popular") {
            temp.sort((a, b) => (b.upvotes?.length || 0) - (a.upvotes?.length || 0));
        } else if (sort === "Newest") {
            temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setFilteredItems(temp);
    }, [category, status, sort, items]);

    const handleViewDetails = (id) => {
        if (!user) {
            navigate('/login');
        } else {
            navigate(`/roadmapItem/${id}`);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        
        <div id="roadmap" className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold mb-6 text-center">Roadmap Items</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="All">All Categories</option>
                    <option value="Feature">Feature</option>
                    <option value="Improvement">Improvement</option>
                    <option value="Goal">Goal</option>
                </select>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="All">All Statuses</option>
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
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
                        <p className="text-sm"><strong>Status:</strong> {item.status}</p>
                        <p className="text-sm"><strong>Upvotes:</strong> {item.upvotes?.length || 0}</p>

                        <button
                            onClick={() => handleViewDetails(item._id)}
                            className="mt-4 text-white px-4 py-2 rounded text-sm"
                            style={{ backgroundColor: 'rgb(10,186,181)' }}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoadmapItems;




