import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const RoadmapDetails = () => {
    const item = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [newComment, setNewComment] = useState('');
    const [replyMap, setReplyMap] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState('');

    const hasUpvoted = item.upvotes?.includes(user?.email);


    const handleUpvote = async () => {
        const userEmail = user?.email;
        if (!userEmail) return toast.error("Please log in to upvote.");

        const res = await fetch(`https://roadmap-server-pi.vercel.app/roadmapItems/${item._id}/upvote`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail })
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            toast.success("Upvoted successfully!");
            window.location.reload();
        } else {
            toast.info("You've already upvoted this item.");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        if (newComment.length > 300) return toast.error("Comment too long (max 300 chars)");

        const res = await fetch(`https://roadmap-server-pi.vercel.app/roadmapItems/${item._id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: user?.email, comment: newComment })
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            setNewComment('');
            toast.success("Comment added");
            window.location.reload();
        }
    };

    const handleReply = async (commentId, parentIds = []) => {
        const replyText = replyMap[commentId];
        if (!replyText || replyText.length > 300) return toast.error("Reply is too long or empty");

        const res = await fetch(`https://roadmap-server-pi.vercel.app/roadmapItems/${item._id}/comments/${commentId}/reply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: user?.email, comment: replyText, parentIds })
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            toast.success("Reply added");
            setReplyMap(prev => ({ ...prev, [commentId]: '' }));
            window.location.reload();
        }
    };

    const handleEditComment = async (commentId) => {
        const res = await fetch(`https://roadmap-server-pi.vercel.app/roadmapItems/${item._id}/comments/${commentId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment: editedCommentText })
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            toast.success("Comment updated");
            setEditingCommentId(null);
            window.location.reload();
        }
    };

    const handleDeleteComment = async (commentId) => {
        const res = await fetch(`https://roadmap-server-pi.vercel.app/roadmapItems/${item._id}/comments/${commentId}`, {
            method: 'DELETE'
        });

        const data = await res.json();
        if (data.modifiedCount > 0) {
            toast.success("Comment deleted");
            window.location.reload();
        }
    };

    const renderComments = (comments = [], depth = 0, parentIds = []) => {
        return comments.map((c) => (


            <div key={c._id} className={`ml-${depth * 4} mt-4 p-3 border rounded bg-gray-50`}>
                <p className="text-sm font-semibold">{c.userEmail}</p>
                {editingCommentId === c._id ? (
                    <>
                        <textarea
                            className="w-full border p-1 text-sm"
                            value={editedCommentText}
                            onChange={(e) => setEditedCommentText(e.target.value)}
                        />
                        <button
                            onClick={() => handleEditComment(c._id)}
                            className="text-xs mt-1 text-white px-2 py-1 rounded"
                            style={{ backgroundColor: 'rgb(10,186,181)' }}
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditingCommentId(null)}
                            className="text-xs mt-1 ml-2 bg-gray-300 px-2 py-1 rounded"
                        >Cancel</button>
                    </>
                ) : (
                    <p className="text-sm mb-1">{c.comment}</p>
                )}
                <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>

                {user?.email === c.userEmail && editingCommentId !== c._id && (
                    <div className="text-xs text-blue-600 mt-1 space-x-2">
                        <button className='text-cyan-500' onClick={() => {
                            setEditingCommentId(c._id);
                            setEditedCommentText(c.comment);
                        }}>Edit</button>
                        <button className='text-red-800' onClick={() => handleDeleteComment(c._id)}>Delete</button>
                    </div>
                )}

                {depth < 3 && (
                    <div className="mt-2">
                        <input
                            type="text"
                            value={replyMap[c._id] || ''}
                            onChange={(e) => setReplyMap({ ...replyMap, [c._id]: e.target.value })}
                            placeholder="Reply..."
                            className="border p-1 w-full text-sm"
                        />
                        <button
                            onClick={() => handleReply(c._id, [...parentIds, c._id])}
                            className="text-xs mt-1 text-white px-2 py-1 rounded"
                            style={{ backgroundColor: 'rgb(10,186,181)' }}
                        >
                            Reply
                        </button>
                    </div>
                )}

                {c.replies && renderComments(c.replies, depth + 1, [...parentIds, c._id])}
            </div>
        ));
    };

    return (

        <div>
            <Navbar></Navbar>
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold text-center mb-6">{item.title}</h1>

                <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
                    <div className="w-full md:w-2/3 bg-gray-100 p-6 rounded-lg shadow">
                        <p><strong>Category:</strong> {item.category}</p>
                        <p><strong>Status:</strong> {item.status}</p>
                        <p><strong>Upvotes:</strong> {item.upvotes?.length || 0}</p>
                        <p className="mt-3"><strong>Description:</strong> {item.description}</p>

                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleUpvote}
                                disabled={hasUpvoted}
                                className={`px-4 py-2 text-white text-sm rounded transition-colors duration-200 ${hasUpvoted
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "hover:brightness-110"
                                    }`}
                                style={{ backgroundColor: hasUpvoted ? '' : 'rgb(10,186,181)' }}
                            >
                                {hasUpvoted ? "Upvoted" : "👍 Upvote"}
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                className="text-sm text-white px-4 py-2 rounded"
                                style={{ backgroundColor: 'rgb(10,186,181)' }}
                            >
                                ← Go Back
                            </button>
                        </div>

                        <hr className="my-6" />
                        <h2 className="text-lg font-semibold mb-2">Comments</h2>

                        <form onSubmit={handleCommentSubmit} className="mb-4">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Leave a comment... (max 300 chars)"
                                className="w-full border p-2 rounded text-sm"
                                maxLength={300}
                                rows={3}
                            ></textarea>
                            <button
                                type="submit"
                                className="mt-2 text-white px-4 py-2 rounded"
                                style={{ backgroundColor: 'rgb(10,186,181)' }}
                            >
                                Add Comment
                            </button>
                        </form>

                        {item.comments?.length > 0 ? (
                            <div className="space-y-4">
                                {renderComments(item.comments)}
                            </div>
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>


    );
};

export default RoadmapDetails;




