
import React, { useState, useContext } from 'react';
import { ContextAuth } from '../../../context/AuthProvider';
import { AccountsContext } from '../../../context/AccountsProvider';
import { MoviesContext } from '../../../context/MoviesProvider';
import { RepCommentContext } from '../../../context/RepCommentProvider';
import { addDocument } from '../../../services/firebaseService';
import { getOjectById } from '../../../services/FunctionRepon';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

function RepComment({ open, commentId, setOpen, openRep, closeRep }) {
    const [reply, setReply] = useState("");
    const { accountLogin } = useContext(ContextAuth);
    const accounts = useContext(AccountsContext)
    const movies = useContext(MoviesContext);
    const repComments = useContext(RepCommentContext);

    const handleSubmit = async () => {
        if (!reply.trim()) return;
        if (!accountLogin) return;
        await addDocument("repComments", {
            content: reply,
            commentId: commentId,
            userId: accountLogin.id,
            createdAt: new Date(),
        })
        setReply("");
        setOpen(false);
    };

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

    return (
        <div>
        <div className={`${open ? 'block' : 'hidden'} w-[40%]`}>
             <textarea
                placeholder="Viết bình luận..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                maxLength={1000}
                className="w-full min-h-[100px] bg-[#2a2a2a] border border-[#333] rounded-lg p-3 text-white resize-y mb-3 focus:outline-none focus:border-[#444]"
            />
            <div className='flex justify-between items-center'>
                <div className='text-gray-400'>{reply.length}/1000</div>
                <button onClick={handleSubmit} className="bg-[#2a2a2a] text-[#ffd700] px-4 py-2 rounded-md flex items-center gap-2 transition-opacity hover:opacity-80">
                    Gửi
                    <span className="text-lg">➜</span>
                    </button>
                </div>
            </div>

            <div className={`${openRep ? 'block' : 'hidden'} space-y-5 mt-5`}>
                {repComments.filter(a => a.commentId == commentId).sort((a, b) => b.createdAt - a.createdAt).map(comment => (
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
                            </div>
                        
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RepComment;