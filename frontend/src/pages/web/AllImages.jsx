import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const IMAGES_PER_PAGE = 12; // 3 rows × 4 columns

const AllImages = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const endpoint = searchQuery
          ? `${process.env.REACT_APP_URL}/stock/search?query=${encodeURIComponent(searchQuery)}`
          : `${process.env.REACT_APP_URL}/stock/list`;

        const res = await fetch(endpoint);
        const data = await res.json();

        if (data.success) {
          setImages(searchQuery ? data.results : data.images);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error('Image fetch failed:', err);
      }
    };

    fetchImages();
  }, [searchQuery]);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const paginatedImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedImages.map((image) => (
          <Link to={`/image/${image._id}`} key={image._id} className="group block">
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition">
              <img
                src={image.fileUrl}
                alt={image.title}
                className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white px-2 py-1 text-sm truncate">
                {image.title}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllImages;
