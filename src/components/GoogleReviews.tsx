import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Loader2, ArrowRight } from 'lucide-react';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time?: string;
  relative_time_description: string;
}

// This component only ever displays REAL reviews fetched from the Google Places
// API. If no API key / Place ID is configured it renders a prompt linking to the
// live Google listing rather than showing invented testimonials — presenting
// fabricated reviews as genuine would be misleading (and an ASA breach in the UK).
const GOOGLE_REVIEWS_URL = 'https://share.google/ce77OEXm4TZtLSQLH';

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_PLACES_KEY;
      const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

      // Not configured — show the "leave/read a review" prompt instead.
      if (!apiKey || !placeId) {
        setLoading(false);
        return;
      }

      try {
        // NOTE: In production this must go through a backend proxy so the API
        // key is not exposed in the browser bundle. Wire that endpoint up and
        // return { reviews: [...] } to populate real reviews here.
        const response = await fetch(
          `/api/google-reviews?place_id=${encodeURIComponent(placeId)}`
        );
        const data = await response.json();
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch (err) {
        console.error('Failed to fetch Google reviews:', err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  // No real reviews to show yet — invite visitors to the genuine Google listing.
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
        <div className="flex justify-center mb-3">
          {[...Array(5)].map((_, s) => (
            <Star key={s} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-gray-700 font-semibold mb-4">
          Rated by our customers on Google
        </p>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Read &amp; leave a review on Google
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {reviews.slice(0, 3).map((review, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">
                {review.author_name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{review.author_name}</p>
              <p className="text-gray-500 text-xs">{review.relative_time_description}</p>
            </div>
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4 ml-auto"
            />
          </div>
          <div className="flex mb-3">
            {[...Array(5)].map((_, s) => (
              <Star
                key={s}
                className={`h-4 w-4 ${s < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">"{review.text}"</p>
        </motion.div>
      ))}
    </div>
  );
}
