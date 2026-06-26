import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import RouteFallback from './components/RouteFallback';
import LazyBoundary from './components/LazyBoundary';
import { OfflineBanner } from './components/OfflineBanner';
import Footer from './components/Footer';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const LegacyDashboard = lazy(() => import('./pages/LegacyDashboard'));
const Leaderboard = lazy(() => import('./components/Leaderboard'));
const LearnPage = lazy(() => import('./pages/Learn'));
const Connect = lazy(() => import('./pages/Connect'));
const Profile = lazy(() => import('./pages/Profile'));
const Pools = lazy(() => import('./pages/Pools'));

function App() {
  const { pathname } = useLocation();
  // Landing renders its own Footer at the bottom of its bespoke layout.
  // All other routes share the global session footer for consistent branding.
  const showGlobalFooter = pathname !== '/';

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0F1A] font-sans text-[#F3F4F6]">
      <OfflineBanner />
      <Navbar />
      {/* `flex-1` pushes the global Footer to the bottom of the viewport
          on short pages (Leaderboard, Connect, etc.) without affecting
          pages that already fill the viewport naturally. */}
      <div className="flex-1">
        <LazyBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/play" element={<LegacyDashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/pools" element={<Pools />} />
              <Route
                path="/tournament"
                element={
                  <div className="xelma-grid-bg px-4 py-20 text-center text-xl font-bold text-gray-500">
                    Tournament — Coming Soon
                  </div>
                }
              />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </LazyBoundary>
      </div>
      {showGlobalFooter && <Footer />}
      <Toaster richColors position="top-center" theme="dark" />
    </div>
  );
}

export default App;
