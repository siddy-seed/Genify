import React, { useState } from 'react';
import { motion } from 'motion/react';

const ImageCard = ({ image, onView, onDelete, onRegenerate }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = () => {
        onDelete(image.id);
    };

    const handleEditPrompt = () => {
        console.log('Edit prompt feature coming soon for image:', image.id);
    };

    const handleRegenerate = () => {
        onRegenerate(image.id);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="glass-card rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-smooth hover-lift">
                <div className="relative aspect-square overflow-hidden bg-gradient-warm">
                    <img
                        src={image.imageUrl}
                        alt={image.prompt}
                        className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-gradient-to-t from-warmGray-900/80 via-warmGray-900/40 to-transparent flex flex-col justify-end p-4 sm:p-5"
                    >
                        <p className="text-white text-sm font-light mb-4 line-clamp-2">
                            {image.prompt}
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => onView(image)}
                                className="px-3 py-2 bg-white/90 backdrop-blur-sm text-warmGray-800 rounded-lg text-sm font-medium hover:bg-white transition-smooth flex items-center justify-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                            </button>

                            <button
                                onClick={handleEditPrompt}
                                className="px-3 py-2 bg-gold-500/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-gold-500 transition-smooth flex items-center justify-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                            </button>

                            <button
                                onClick={handleRegenerate}
                                className="px-3 py-2 bg-warmGray-800/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-warmGray-800 transition-smooth flex items-center justify-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Regen
                            </button>

                            <button
                                onClick={handleDelete}
                                className="px-3 py-2 bg-red-500/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-smooth flex items-center justify-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="p-3 sm:p-4 bg-gradient-luxury">
                    <div className="flex items-center justify-between text-xs text-warmGray-600">
                        <span className="font-medium">1024x1024</span>
                        <span>{formatDate(image.createdAt)}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ImageCard;
