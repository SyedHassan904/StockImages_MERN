// pages/web/Gallery.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageCard from '../../common/ImageCard/ImageCard'; // adjust path if needed
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

const CategoryBased = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const url = category
                    ? `${process.env.REACT_APP_URL}/stock/list?category=${encodeURIComponent(category)}`
                    : `${process.env.REACT_APP_URL}/stock/list`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.success) {
                    setImages(data.images || []);
                }
            } catch (err) {
                console.error('Error loading images:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [category]);

    return (
        <div className="px-4 py-10 lg:px-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {category ? `Category: ${category}` : 'All Images'}
            </h2>

            {loading ? (
                <LoadingSpinner />
            ) : images.length === 0 ? (
                <p className="text-center text-gray-500">No images found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map(image => (
                        <ImageCard key={image._id} image={image} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryBased;
