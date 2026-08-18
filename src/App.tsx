import { Suspense, lazy, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import LiveChatWidget from './components/LiveChatWidget';
import StickyBookingCTA from './components/StickyBookingCTA';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load non-critical pages
const AirportTransfers = lazy(() => import('./pages/AirportTransfers'));
const Pricing = lazy(() => import('./pages/Pricing'));
const StudentDiscount = lazy(() => import('./pages/StudentDiscount'));
const Book = lazy(() => import('./pages/Book'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const StAndrewsToEdinburghAirport = lazy(() => import('./pages/StAndrewsToEdinburghAirport'));
const StAndrewsToGlasgowAirport = lazy(() => import('./pages/StAndrewsToGlasgowAirport'));
const StAndrewsToDundeeAirport = lazy(() => import('./pages/StAndrewsToDundeeAirport'));
const LeucharsTaxi = lazy(() => import('./pages/LeucharsTaxi'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
    <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Keeps the Suspense boundary inside the animated wrapper so a lazy chunk
// loading never unmounts the tree AnimatePresence is transitioning.
const RouteView = ({ children }: { children: ReactNode }) => (
  <PageTransition>
    <Suspense fallback={<PageLoader />}>{children}</Suspense>
  </PageTransition>
);

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><ErrorBoundary><AdminDashboard /></ErrorBoundary></ProtectedRoute>} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RouteView><Home /></RouteView>} />
        <Route path="/airport-transfers" element={<RouteView><AirportTransfers /></RouteView>} />
        <Route path="/pricing" element={<RouteView><Pricing /></RouteView>} />
        <Route path="/student-discount" element={<RouteView><StudentDiscount /></RouteView>} />
        <Route path="/book" element={<RouteView><Book /></RouteView>} />
        <Route path="/contact" element={<RouteView><Contact /></RouteView>} />
        <Route path="/faq" element={<RouteView><FAQ /></RouteView>} />
        <Route path="/st-andrews-to-edinburgh-airport" element={<RouteView><StAndrewsToEdinburghAirport /></RouteView>} />
        <Route path="/st-andrews-to-glasgow-airport" element={<RouteView><StAndrewsToGlasgowAirport /></RouteView>} />
        <Route path="/st-andrews-to-dundee-airport" element={<RouteView><StAndrewsToDundeeAirport /></RouteView>} />
        <Route path="/leuchars-taxi" element={<RouteView><LeucharsTaxi /></RouteView>} />
        <Route path="*" element={<RouteView><NotFound /></RouteView>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
          <Analytics />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen">
        <AnimatedRoutes />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>
      <Footer />
      <LiveChatWidget />
      <StickyBookingCTA />
    </div>
  );
}

export default App;
