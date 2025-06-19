import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider';

const RoadmapDetails = () => {
    const item = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [commentText, setCommentText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [activeReplyCommentId, setActiveReplyCommentId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState("");

    const hasUpvoted = item.upvotes?.includes(user?.email);

    const handleUpvote = async () => {
        if (!user) return toast.error("Please login to upvote.");

        const res = await fetch(`http://localhost:3000/roadmapItems/${item._id}/upvote`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: user.email })
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            toast.success("Upvoted successfully!");
            window.location.reload();
        } else {
            toast.info("You’ve already upvoted.");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("Please login to comment.");

        const res = await fetch(`http://localhost:3000/roadmapItems/${item._id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: user.email, comment: commentText }),
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            toast.success("Comment added!");
            setCommentText("");
            window.location.reload();
        }
    };

    const handleReplySubmit = async (commentId) => {
        const res = await fetch(`http://localhost:3000/roadmapItems/${item._id}/comments/${commentId}/replies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: user.email, reply: replyText }),
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            toast.success("Reply added!");
            setReplyText("");
            setActiveReplyCommentId(null);
            window.location.reload();
        }
    };

    const handleCommentUpdate = async (commentId) => {
        const res = await fetch(`http://localhost:3000/roadmapItems/${item._id}/comments/${commentId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comment: editedComment }),
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            toast.success("Comment updated!");
            setEditingCommentId(null);
            window.location.reload();
        }
    };

    const handleCommentDelete = async (commentId) => {
        const res = await fetch(`http://localhost:3000/roadmapItems/${item._id}/comments/${commentId}`, {
            method: "DELETE"
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            toast.success("Comment deleted!");
            window.location.reload();
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">{item.title}</h1>

            <div className="bg-gray-100 p-6 rounded shadow">
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Upvotes:</strong> {item.upvotes?.length || 0}</p>
                <p className="mt-4"><strong>Description:</strong> {item.description}</p>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={handleUpvote}
                        disabled={hasUpvoted}
                        className={`px-4 py-2 text-white text-sm rounded ${hasUpvoted ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {hasUpvoted ? "Upvoted" : "👍 Upvote"}
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-300 hover:bg-gray-400 text-sm text-gray-800 px-4 py-2 rounded"
                    >
                        ← Go Back
                    </button>
                </div>

                {/* Comment Box */}
                <form onSubmit={handleCommentSubmit} className="mt-8">
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full p-3 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Submit Comment
                    </button>
                </form>

                {/* Display Comments */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Comments</h3>

                    {item.comments?.length > 0 ? item.comments.map((c) => (
                        <div key={c._id} className="mb-4 p-3 bg-white rounded shadow-sm relative">
                            <p className="text-sm text-gray-700">
                                <strong>{c.userEmail}</strong> on {new Date(c.createdAt).toLocaleString()}
                            </p>

                            {editingCommentId === c._id ? (
                                <>
                                    <textarea
                                        className="w-full border mt-2 p-2 rounded"
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleCommentUpdate(c._id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-gray-300 px-3 py-1 rounded"
                                            onClick={() => setEditingCommentId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="mt-1">{c.comment}</p>
                            )}

                            {/* Actions */}
                            <div className="mt-2 flex gap-4 text-sm text-blue-600">
                                {user?.email === c.userEmail && editingCommentId !== c._id && (
                                    <>
                                        
                                        <button onClick={() => handleCommentDelete(c._id)}>Delete</button>
                                    </>
                                )}
                                <button onClick={() => setActiveReplyCommentId(c._id)}>Reply</button>
                            </div>

                            {/* Reply Box */}
                            {activeReplyCommentId === c._id && (
                                <div className="mt-3">
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write your reply..."
                                        className="w-full p-2 border rounded"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleReplySubmit(c._id)}
                                        >
                                            Post Reply
                                        </button>
                                        <button
                                            className="bg-gray-300 px-3 py-1 rounded"
                                            onClick={() => {
                                                setActiveReplyCommentId(null);
                                                setReplyText("");
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Replies */}
                            {c.replies?.length > 0 && (
                                <div className="mt-4 ml-4 border-l-2 pl-4">
                                    {c.replies.map((r) => (
                                        <div key={r._id} className="mb-2 p-2 bg-gray-50 rounded">
                                            <p className="text-sm text-gray-700">
                                                <strong>{r.userEmail}</strong> replied on {new Date(r.createdAt).toLocaleString()}
                                            </p>
                                            <p>{r.reply}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )) : (
                        <p className="text-sm text-gray-500">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoadmapDetails;



