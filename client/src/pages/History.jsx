import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import HistoryGrid from '../components/HistoryGrid';
import ImageModal from '../components/ImageModal';
import { AppContext } from '../context/AppContext';

const History = () => {
    const navigate = useNavigate();
    const { backendUrl, token, user } = useContext(AppContext);

    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user's images from backend
    const fetchImages = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                backendUrl + '/api/image/get-images',
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                setImages(data.images);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Load images on component mount
    useEffect(() => {
        if (token && user) {
            fetchImages();
        } else {
            navigate('/');
        }
    }, [token, user]);

    const handleViewImage = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleDeleteImage = async (imageId) => {
        if (!window.confirm('Are you sure you want to delete this image?')) {
            return;
        }

        try {
            const { data } = await axios.post(
                backendUrl + '/api/image/delete-image',
                { userId: user._id, imageId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                toast.success('Image deleted successfully');
                setImages(images.filter(img => img.id !== imageId));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleRegenerateImage = async (imageId) => {
        try {
            toast.info('Regenerating image...');

            const { data } = await axios.post(
                backendUrl + '/api/image/regenerate-image',
                { userId: user._id, imageId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                toast.success('Image regenerated successfully!');
                fetchImages();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen gradient-warm flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-warmGray-600 font-light">Loading your images...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen gradient-warm py-8 sm:py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 sm:mb-12"
            >
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-warmGray-900 mb-4">
                        Your{' '}
                        <span className="bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 bg-clip-text text-transparent font-normal">
                            Creative
                        </span>{' '}
                        Gallery
                    </h1>
                    <p className="text-lg sm:text-xl text-warmGray-600 font-light max-w-2xl mx-auto">
                        Explore your collection of AI-generated masterpieces
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-8"
                >
                    <div className="glass-card px-6 py-4 rounded-2xl shadow-soft">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-gold-glow flex items-center justify-center">
                                <svg className="w-5 h-5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-warmGray-900">{images.length}</p>
                                <p className="text-sm text-warmGray-600 font-light">Total Images</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card px-6 py-4 rounded-2xl shadow-soft">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-gold-glow flex items-center justify-center">
                                <svg className="w-5 h-5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-warmGray-900">
                                    {new Date().toLocaleDateString('en-US', { month: 'short' })}
                                </p>
                                <p className="text-sm text-warmGray-600 font-light">This Month</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <HistoryGrid
                    images={images}
                    onViewImage={handleViewImage}
                    onDeleteImage={handleDeleteImage}
                    onRegenerateImage={handleRegenerateImage}
                />
            </motion.div>

            {selectedImage && (
                <ImageModal
                    image={selectedImage}
                    onClose={handleCloseModal}
                    onRegenerate={() => handleRegenerateImage(selectedImage.id)}
                />
            )}
        </div>
    );
};

export default History;
