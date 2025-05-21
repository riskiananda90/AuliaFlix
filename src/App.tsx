import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import MovieDetailPage from './pages/MovieDetailPage';
import WatchPage from './pages/WatchPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import MyListPage from './pages/MyListPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/watch/:id" element={
          <ProtectedRoute>
            <WatchPage />
          </ProtectedRoute>
        } />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />

                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/browse" element={
                    <ProtectedRoute>
                      <BrowsePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/movie/:id" element={
                    <ProtectedRoute>
                      <MovieDetailPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/my-list" element={
                    <ProtectedRoute>
                      <MyListPage />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;