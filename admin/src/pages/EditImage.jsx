import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle, FiSave, FiX } from 'react-icons/fi';
import api from '../services/api';

const EditImage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    pricePKR: '',
    priceUSD: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch image by ID
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await api.getSingleImage(id);
        if (res.data?.success) {
          const image = res.data.image;

          let tags = image.tags;
          if (typeof tags === 'string') {
            try {
              tags = JSON.parse(tags);
            } catch {
              tags = [tags];
            }
          }

          setFormData({
            title: image.title || '',
            description: image.description || '',
            category: image.category || '',
            tags: Array.isArray(tags) ? tags : [],
            pricePKR: image.pricePKR || '',
            priceUSD: image.priceUSD || ''
          });
        } else {
          alert('Image not found');
          navigate('/images');
        }
      } catch (err) {
        alert('Error loading image');
        navigate('/images');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;

    // If input is a JSON string, expand it
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        setFormData({
          ...formData,
          tags: [...new Set([...formData.tags, ...parsed.map(tag => tag.trim())])]
        });
      } else {
        setFormData({
          ...formData,
          tags: [...new Set([...formData.tags, trimmed])]
        });
      }
    } catch {
      if (!formData.tags.includes(trimmed)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, trimmed]
        });
      }
    }

    setTagInput('');
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        imageID: id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags.map(tag => tag.trim()),
        pricePKR: Number(formData.pricePKR),
        priceUSD: Number(formData.priceUSD)
      };

      const res = await api.updateImage(payload);
      if (res.data?.success) {
        alert('Image updated successfully');
        navigate('/images');
      } else {
        alert(res.data.message || 'Update failed');
      }
    } catch (err) {
      alert('Error updating image');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Edit Image</h2>
        <button
          onClick={() => navigate('/images')}
          className="flex items-center text-gray-600 hover:text-indigo-600 transition"
        >
          <FiArrowLeftCircle className="mr-2" />
          Back to List
        </button>
      </div>

      <form onSubmit={handleUpdate} className="bg-white p-6 shadow rounded-lg space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? (e.preventDefault(), addTag()) : null)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Add a tag and press Enter"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 text-indigo-500"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price PKR</label>
            <input
              type="number"
              name="pricePKR"
              value={formData.pricePKR}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price USD</label>
            <input
              type="number"
              name="priceUSD"
              value={formData.priceUSD}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <FiSave className="mr-2" />
            {saving ? 'Saving...' : 'Update Image'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditImage;
