import React from 'react';
import ImageCard from './ImageCard';
import { useNavigate } from 'react-router-dom';

const HistoryGrid = ({ images, onViewImage, onDeleteImage, onRegenerateImage }) => {
    const navigate = useNavigate();

    if (!images || images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="glass-card rounded-3xl p-12 text-center max-w-md shadow-soft">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-gold-glow flex items-center justify-center">
                        <svg className="w-10 h-10 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-light text-warmGray-800 mb-3">No Images Yet</h3>
                    <p className="text-warmGray-600 font-light mb-6">
                        Your generated images will appear here. Start creating to build your collection.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl font-medium shadow-soft hover:shadow-soft-lg hover:scale-105 transition-smooth"
                    >
                        Generate Your First Image
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {images.map((image) => (
                <ImageCard
                    key={image.id}
                    image={image}
                    onView={onViewImage}
                    onDelete={onDeleteImage}
                    onRegenerate={onRegenerateImage}
                />
            ))}
        </div>
    );
};

export default HistoryGrid;
