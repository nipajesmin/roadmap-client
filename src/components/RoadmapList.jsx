import React, { useContext, useEffect, useState } from 'react';
import RoadmapItem from './Roadmap';
import { AuthContext } from '../provider/AuthProvider';

const RoadmapList = () => {
    const [items, setItems] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('https://roadmap-server-pi.vercel.app/roadmaps')
            .then(res => res.json())
            .then(data => setItems(data));
    }, []);

    const handleUpvote = (id) => {
        fetch(`https://roadmap-server-pi.vercel.app/roadmaps/upvote/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail: user.email }),
        })
            .then(res => res.json())
            .then(() => {
                setItems(prev =>
                    prev.map(item =>
                        item._id === id
                            ? { ...item, upvotes: [...item.upvotes, user.email] }
                            : item
                    )
                );
            });
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            {items.map(item => (
                <RoadmapItem key={item._id} item={item} onUpvote={handleUpvote} />
            ))}
        </div>
    );
};

export default RoadmapList;
