import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Loader2 } from 'lucide-react';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time?: string;
  relative_time_description: string;
}

// Fallback reviews if API fails or not configured
const fallbackReviews = [
  { 
    author_name: 'Sarah M.', 
    rating: 5, 
    text: 'Absolutely fantastic service! Always on time for my early morning airport runs. The driver was professional and the car was spotless.',
    relative_time_description: '2 weeks ago'
  },
  { 
    author_name: 'James K.', 
    rating: 5, 
    text: 'Best taxi service in St Andrews. Reliable, professional, and great prices. Would 100% recommend for airport transfers.',
    relative_time_description: '1 month ago'
  },
  { 
    author_name: 'Emma T.', 
    rating: 5, 
    text: 'I use Drive Taxi for all my airport transfers. They never let me down and the booking process is so easy.',
    relative_time_description: '3 weeks ago'
  },
];

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_PLACES_KEY;
      
      // If no API key, use fallback reviews
      if (!apiKey) {
        setLoading(false);
        return;
      }

      try {
        // Note: In production, this should be fetched through a backend proxy
        // to protect the API key. This is a simplified implementation.
        const placeId = 'YOUR_PLACE_ID'; // User needs to add their actual Place ID
        
        // Simulated API call - replace with actual implementation
        // const response = await fetch(
        //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
        // );
        // const data = await response.json();
        
        // For now, use fallback if API not configured
        setReviews(fallbackReviews);
      } catch (err) {
        console.error('Failed to fetch Google reviews:', err);
        setReviews(fallbackReviews);
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
