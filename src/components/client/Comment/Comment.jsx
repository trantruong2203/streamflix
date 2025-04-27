import React, { useState, useContext } from 'react';
import { ContextAuth } from '../../../context/AuthProvider';
import { MoviesContext } from '../../../context/MoviesProvider';
import { addDocument } from '../../../services/firebaseService';
import { CommentsContext } from '../../../context/CommentsProvider';
import { RepCommentContext } from '../../../context/RepCommentProvider';
import { useParams } from 'react-router-dom';
import { getOjectById } from '../../../services/FunctionRepon';
import { AccountsContext } from '../../../context/AccountsProvider';
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import RepComment from './RepComment';
import { FaArrowDown } from 'react-icons/fa';


function Comment() {
    const [comments, setComments] = useState("")
    const { accountLogin } = useContext(ContextAuth);
    const accounts = useContext(AccountsContext)
    const movies = useContext(MoviesContext);
    const commentsList = useContext(CommentsContext);
    const { id } = useParams()
    const [openRepComment, setOpenRepComment] = useState({});
    const [openRep, setOpenRep] = useState({});
    const repComments = useContext(RepCommentContext);

    const movie = movies.find(m => m.id === id);

    const closeRepComment = (commentId) => {
        setOpenRepComment(prev => ({ ...prev, [commentId]: false }));
    }

    const closeRep = (commentId) => {
        setOpenRep(prev => ({ ...prev, [commentId]: false }));
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const handleSubmit = async () => {
        if (!accountLogin) return;
        if (!comments) return;
        await addDocument("comments", {
            content: comments,
            movieId: movie.id,
            userId: accountLogin.id,
            createdAt: new Date(),
        })
        setComments("");
    }

    return (
        <div className="max-w-7xl mx-auto p-5 text-white bg-[#1a1a1a]">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-medium">Bình luận ( {commentsList.filter(a => a.movieId == id).length} )</h3>
            </div>

            <div className="mb-5">
                <div className="flex gap-4">
                    <img src={accountLogin?.imgUrl} alt="User avatar" className="w-10 h-10 rounded-full" />
                    <div className="flex-grow">
                        <textarea
                            placeholder="Viết bình luận..."
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            maxLength={1000}
                            className="w-full min-h-[100px] bg-[#2a2a2a] border border-[#333] rounded-lg p-3 text-white resize-y mb-3 focus:outline-none focus:border-[#444]"
                        />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">{comments.length} / 1000</span>
                            <button onClick={handleSubmit} className="bg-[#2a2a2a] text-[#ffd700] px-4 py-2 rounded-md flex items-center gap-2 transition-opacity hover:opacity-80">
                                Gửi
                                <span className="text-lg">➜</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-5">
                {commentsList.filter(a => a.movieId == id).sort((a, b) => b.createdAt - a.createdAt).map(comment => (
                    <div key={comment.id} className="flex gap-4">
                        <img src={getOjectById(accounts, comment.userId).imgUrl} alt={`${getOjectById(accounts, comment.userId).name}'s avatar`} className="w-10 h-10 rounded-full" />
                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-medium">{getOjectById(accounts, comment.userId).useName}</span>
                                <span className="text-gray-400 text-sm">{formatDate(comment.createdAt)}</span>
                            </div>
                            <p className="mb-3">{comment.content}</p>
                            <div className="flex gap-4">
                                <button className="text-gray-400 hover:opacity-80 p-2">
                                    <span className="text-lg"><AiOutlineLike /></span>
                                </button>
                                <button className="text-gray-400 hover:opacity-80 p-2">
                                    <span className="text-lg"><AiOutlineDislike /></span>
                                </button>
                                <button onClick={() => setOpenRepComment(prev => ({ ...prev, [comment.id]: !openRepComment[comment.id] }))} className="text-gray-400 hover:opacity-80 p-2">
                                    Trả lời
                                </button>
                                <button className="text-gray-400 hover:opacity-80 p-2">
                                    Thêm
                                </button>
                            </div>

                            <RepComment
                                open={openRepComment[comment.id]}
                                setOpen={(value) => setOpenRepComment(prev => ({ ...prev, [comment.id]: value }))}
                                commentId={comment.id}
                                closeRepComment={closeRepComment}
                                openRep={openRep[comment.id]}
                                closeRep={closeRep}
                            />

                            <div onClick={() => setOpenRep(prev => ({ ...prev, [comment.id]: !openRep[comment.id] }))} className={`cursor-pointer flex items-center mt-3 gap-2 ${repComments.filter(a => a.commentId == comment.id).length > 0 ? 'block' : 'hidden'}`}>
                                <div className={`${openRep[comment.id] ? 'rotate-180' : ''} transition-transform duration-300`}>
                                    <FaArrowDown />
                                </div>
                                <div className='text-bermuda'> {openRep[comment.id] ? 'Thu gọn' : `${repComments.filter(a => a.commentId == comment.id).length} bình luận`}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}

export default Comment;