import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../../contexts/AuthContext.jsx';
import useWishlist from '../../hooks/useWishlist.jsx';
import { useImageContext } from '../../contexts/ImageContext.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner.jsx';
import ImageCard from '../../components/common/ImageCard/ImageCard.jsx';
import EmptyState from '../../components/common/EmptyState/EmptyState.jsx';

const Profile = () => {
    const { user, logout, updateProfile, token } = useAuth();
    const { wishlist, loading: wishlistLoading } = useWishlist();
    const { images } = useImageContext();

    const [activeTab, setActiveTab] = useState('downloads');
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        avatar: user?.avatar || user?.profileURL || ''
    });

    const [downloadedImages, setDownloadedImages] = useState([]);
    const [downloadsLoading, setDownloadsLoading] = useState(true);

    const contentRef = useRef();

    useEffect(() => {
        gsap.from(contentRef.current.children, {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, []);

    useEffect(() => {
        const fetchDownloadedImages = async () => {
            try {
                setDownloadsLoading(true);
                const token = localStorage.getItem('token');
                const res = await fetch(`${process.env.REACT_APP_URL}/stock/downloaded`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                if (data.success) {
                    setDownloadedImages(data.downloadedImages || []);
                }
            } catch (error) {
                console.error('Failed to fetch downloaded images:', error);
            } finally {
                setDownloadsLoading(false);
            }
        };

        fetchDownloadedImages();
    }, []);

    const handleLogout = () => {
        gsap.to('.profile-content', {
            duration: 0.5,
            opacity: 0,
            y: -20,
            onComplete: () => {
                localStorage.removeItem('token');
                logout();
            }
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    avatar: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            await updateProfile(formData);
            setEditMode(false);
            gsap.to('.profile-save-success', {
                opacity: 1,
                y: 0,
                duration: 0.5,
                onComplete: () => {
                    gsap.to('.profile-save-success', {
                        opacity: 0,
                        y: -20,
                        delay: 2,
                        duration: 0.5
                    });
                }
            });
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="large" />
            </div>
        );
    }

    const isGoogleUser = user.provider === 'google';

   return (
        <div className="min-h-screen py-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div ref={contentRef} className="profile-content space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-6 rounded-xl shadow-sm">
                        <div className="relative group">
                            <img
                                src={
                                    editMode
                                        ? formData.avatar || user.profileURL || '/default-avatar.jpg'
                                        : user.profileURL || user.avatar || '/default-avatar.jpg'
                                }
                                alt={user.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            {editMode && (
                                <>
                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </label>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </>
                            )}
                        </div>

                        <div className="flex-1">
                            {editMode ? (
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
                                        disabled={isGoogleUser}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="text-gray-600 border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
                                        disabled={isGoogleUser}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                    <p className="text-gray-600">{user.email}</p>
                                    {isGoogleUser && (
                                        <span className="mt-1 inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                                            Google Account
                                        </span>
                                    )}
                                </div>
                            )}
                            <p className="text-gray-500 mt-2">
                                Member since {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {editMode ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditMode(false);
                                            setFormData({
                                                name: user.name,
                                                email: user.email,
                                                avatar: user.avatar || user.profileURL || ''
                                            });
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={loading}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    Edit Profile
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Success alert */}
                    <div className="profile-save-success opacity-0 -translate-y-5 bg-green-50 text-green-700 p-3 rounded-md text-center">
                        Profile updated successfully!
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {['downloads', 'wishlist', 'settings'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize ${activeTab === tab
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        {activeTab === 'downloads' && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Downloads</h2>
                                {downloadsLoading ? (
                                    <div className="flex justify-center py-12">
                                        <LoadingSpinner size="large" />
                                    </div>
                                ) : downloadedImages.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {downloadedImages.map((image) => (
                                            <ImageCard key={image._id || image.id} image={image} />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState
                                        title="No downloads yet"
                                        description="Your downloaded images will appear here"
                                        icon="📥"
                                        actionText="Browse Gallery"
                                        actionLink="/gallery"
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Wishlist</h2>
                                {wishlistLoading ? (
                                    <div className="flex justify-center py-12">
                                        <LoadingSpinner size="large" />
                                    </div>
                                ) : wishlist.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {wishlist.map((image) => (
                                            <ImageCard key={image._id} image={image} />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState
                                        title="Your wishlist is empty"
                                        description="Save your favorite images by clicking the heart icon"
                                        icon="❤️"
                                        actionText="Browse Gallery"
                                        actionLink="/gallery"
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="max-w-2xl space-y-6">
                                <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Change Password
                                        </label>
                                        <div className="mt-1 space-y-3">
                                            <input type="password" placeholder="Current password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                            <input type="password" placeholder="New password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                            <input type="password" placeholder="Confirm new password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Notification Preferences</label>
                                        <div className="mt-2 space-y-2">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600" />
                                                <span>Email notifications</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600" />
                                                <span>Promotional emails</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                            Update Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
