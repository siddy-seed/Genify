import React from 'react';
import { motion } from 'motion/react';

const ImageModal = ({ image, onClose, onRegenerate }) => {
    if (!image) return null;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDownload = () => {
        // Create a download link
        const link = document.createElement('a');
        link.href = image.imageUrl;
        link.download = `genify-${image.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-warmGray-900/60 backdrop-blur-md" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl shadow-soft-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-warmGray-900/70 text-white hover:bg-warmGray-900 transition-smooth"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6 sm:p-8 lg:p-10">
                    <div className="mb-6 rounded-2xl overflow-hidden shadow-soft-lg">
                        <img
                            src={image.imageUrl}
                            alt="Generated artwork"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-warmGray-500 uppercase tracking-wider mb-2">
                                Original Prompt
                            </h3>
                            <p className="text-lg sm:text-xl text-warmGray-800 leading-relaxed font-light">
                                {image.prompt}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-warmGray-600">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{formatDate(image.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>1024x1024</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                onClick={onRegenerate}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl font-medium shadow-soft hover:shadow-soft-lg hover:scale-105 transition-smooth"
                            >
                                Regenerate
                            </button>
                            <button
                                onClick={handleDownload}
                                className="px-6 py-3 bg-warmGray-800 text-white rounded-xl font-medium shadow-soft hover:bg-warmGray-900 hover:shadow-soft-lg transition-smooth"
                            >
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ImageModal;
