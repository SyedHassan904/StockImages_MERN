import { createContext, useContext, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/auth/user`, { credentials: 'include' });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          gsap.to('.auth-success', {
            scale: 1.05,
            duration: 0.3,
            yoyo: true,
            repeat: 1
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const register = async (userInfo) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error: 'Register failed' };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        setUser(null);
        gsap.to('.auth-element', {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            window.location.href = '/login';
          },
        });
      } else {
        console.error('Logout request failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateProfile = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/auth/updateuser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.updatedUser); // Update local user
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (err) {
      return { success: false, error: 'Update failed' };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile, // ✅ Exposed to Profile.jsx
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
