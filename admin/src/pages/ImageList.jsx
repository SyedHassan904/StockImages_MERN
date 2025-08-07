import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiEye, FiSearch } from 'react-icons/fi';
import api from '../services/api';

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.getImages();
        if (res.data?.success) {
          const formattedImages = res.data.images.map((img) => ({
            id: img._id,
            title: img.title,
            url: img.fileUrl,
            uploadDate: img.createdAt,
            views: img.stats?.clicks || 0,
            downloads: img.stats?.downloads || 0,
            pricePKR: img.pricePKR,
            priceUSD: img.priceUSD
          }));
          setImages(formattedImages);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await api.deleteImage({ imageID: id });
      if (res.data.success) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      } else {
        alert(res.data.message || 'Failed to delete image.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting image.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Image Gallery</h2>
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Image Grid */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {currentImages.length > 0 ? (
            currentImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-3 aspect-h-2 bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {image.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>{new Date(image.uploadDate).toLocaleDateString()}</span>
                    <span>{image.views} views</span>
                  </div>
                  <div className="text-sm text-gray-400">{image.downloads} downloads</div>
                  {(image.pricePKR || image.priceUSD) && (
                    <div className="mt-2 flex justify-between text-sm font-medium">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        PKR: Rs. {Number(image.pricePKR).toLocaleString()}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        USD: ${Number(image.priceUSD).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                  <Link
                    to={`/images/${image.id}`}
                    className="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors"
                    title="View"
                  >
                    <FiEye className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleEdit(image.id)}
                    className="p-2 bg-white rounded-full text-yellow-600 hover:bg-yellow-100 transition-colors"
                    title="Edit"
                  >
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-2 bg-white rounded-full text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500">No images found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredImages.length > imagesPerPage && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">{indexOfFirstImage + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastImage, filteredImages.length)}
              </span>{' '}
              of <span className="font-medium">{filteredImages.length}</span> results
            </div>
            <div className="flex space-x-1">
              {Array.from({
                length: Math.ceil(filteredImages.length / imagesPerPage),
              }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageList;
