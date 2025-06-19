import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Roadmap = ({ item, onUpvote }) => {
      const { user } = useContext(AuthContext);
  const [hasUpvoted, setHasUpvoted] = useState(
   // item.upvotes?.includes(user?.email)
  );

  const handleUpvote = () => {
    if (!user) {
      alert('Please login to upvote.');
      return;
    }

    if (!hasUpvoted) {
      onUpvote(item._id);
      setHasUpvoted(true);
    }
  };
    return (
        <div className="bg-white rounded-2xl p-6 shadow-md mb-5 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-blue-600">{item.title}</h2>
          <p className="text-gray-700 mt-2">{item.description}</p>
          <span className="inline-block mt-3 px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-600">
            Status: {item.status}
          </span>
        </div>
        <button
         onClick={handleUpvote}
          className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            hasUpvoted ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'
          } hover:bg-blue-200 transition`}
        >
          <FaThumbsUp />
          {item.upvotes?.length || 0}
        </button>
      </div>

      {/* Comments section placeholder */}
      <div className="mt-6 border-t pt-4 text-sm text-gray-500">
        Comments & replies coming soon...
      </div>
    </div>
  );
};


export default Roadmap;