// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './pages/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ImageStats from './pages/ImageStats';
import ImageList from './pages/ImageList';
import ImageUpload from './pages/ImageUpload';
import EditImage from './pages/EditImage';
// import SingleImage from './pages/SingleImage';
// import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            {/* Protected Layout and Pages */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route
                path="stats"
                element={
                  <ProtectedRoute>
                    <ImageStats />
                  </ProtectedRoute>
                }
              />
              <Route
                path="images"
                element={
                  <ProtectedRoute>
                    <ImageList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="upload"
                element={
                  <ProtectedRoute adminOnly>
                    <ImageUpload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <ProtectedRoute adminOnly>
                    <EditImage />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="images/:id" element={<SingleImage />} /> */}
            </Route>

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </AuthProvider>
      </Router>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
