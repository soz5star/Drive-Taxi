import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import LiveChatWidget from './components/LiveChatWidget';
import StickyBookingCTA from './components/StickyBookingCTA';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';

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

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ErrorBoundary><AdminDashboard /></ErrorBoundary>} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/airport-transfers" element={<PageTransition><AirportTransfers /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/student-discount" element={<PageTransition><StudentDiscount /></PageTransition>} />
          <Route path="/book" element={<PageTransition><Book /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="/st-andrews-to-edinburgh-airport" element={<PageTransition><StAndrewsToEdinburghAirport /></PageTransition>} />
          <Route path="/st-andrews-to-glasgow-airport" element={<PageTransition><StAndrewsToGlasgowAirport /></PageTransition>} />
          <Route path="/st-andrews-to-dundee-airport" element={<PageTransition><StAndrewsToDundeeAirport /></PageTransition>} />
          <Route path="/leuchars-taxi" element={<PageTransition><LeucharsTaxi /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
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
