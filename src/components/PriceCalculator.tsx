import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Users, Package, ArrowRight, PoundSterling } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

interface PriceEstimate {
  min: number;
  max: number;
  route: string;
}

const routeDatabase: Record<string, { base: number; min: number; max: number }> = {
  'St Andrews-Edinburgh Airport': { base: 120, min: 110, max: 140 },
  'Edinburgh Airport-St Andrews': { base: 130, min: 120, max: 150 },
  'St Andrews-Dundee Airport': { base: 50, min: 45, max: 65 },
  'Dundee Airport-St Andrews': { base: 50, min: 45, max: 65 },
  'Dundee-Edinburgh Airport': { base: 130, min: 120, max: 150 },
  'Edinburgh Airport-Dundee': { base: 140, min: 130, max: 160 },
  'Dundee-Glasgow Airport': { base: 180, min: 170, max: 210 },
  'Glasgow Airport-Dundee': { base: 170, min: 160, max: 200 },
  'St Andrews-Glasgow Airport': { base: 200, min: 190, max: 240 },
  'Glasgow Airport-St Andrews': { base: 210, min: 200, max: 250 },
  'St Andrews-Dundee': { base: 40, min: 35, max: 55 },
  'Dundee-St Andrews': { base: 40, min: 35, max: 55 },
  'St Andrews-Edinburgh': { base: 110, min: 100, max: 130 },
  'Edinburgh-St Andrews': { base: 120, min: 110, max: 140 },
  'Dundee-Edinburgh': { base: 120, min: 110, max: 140 },
  'Edinburgh-Dundee': { base: 130, min: 120, max: 150 },
};

const locations = [
  'St Andrews',
  'Dundee',
  'Edinburgh',
  'Edinburgh Airport',
  'Glasgow Airport',
  'Dundee Airport',
];

export default function PriceCalculator() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(1);
  const [estimate, setEstimate] = useState<PriceEstimate | null>(null);
  const [isStudent, setIsStudent] = useState(false);

  const calculatePrice = () => {
    if (!pickup || !dropoff) return;

    const routeKey1 = `${pickup}-${dropoff}`;
    const routeKey2 = `${dropoff}-${pickup}`;
    
    let routeData = routeDatabase[routeKey1] || routeDatabase[routeKey2];
    
    if (!routeData) {
      // Estimate for unknown routes based on typical rates
      routeData = { base: 100, min: 90, max: 130 };
    }

    let minPrice = routeData.min;
    let maxPrice = routeData.max;

    // Adjust for passengers (no extra for 1-4, small increase for 5+)
    if (passengers > 4) {
      minPrice += 10;
      maxPrice += 15;
    }

    // Adjust for excess luggage
    if (luggage > 3) {
      minPrice += 5 * (luggage - 3);
      maxPrice += 8 * (luggage - 3);
    }

    // Apply student discount
    if (isStudent) {
      minPrice = Math.round(minPrice * 0.9);
      maxPrice = Math.round(maxPrice * 0.9);
    }

    setEstimate({
      min: minPrice,
      max: maxPrice,
      route: `${pickup} to ${dropoff}`,
    });
  };

  const getBookingLink = () => {
    const params = new URLSearchParams({
      pickup,
      dropoff,
      passengers: passengers.toString(),
      luggage: luggage.toString(),
      student: isStudent.toString(),
    });
    return `/book?${params.toString()}`;
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          className="bg-yellow-400 p-3 rounded-lg"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.3 }}
        >
          <Calculator className="h-6 w-6 text-black" />
        </motion.div>
        <h3 className="text-2xl font-bold">Quick Price Estimate</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            Pickup Location
          </label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="">Select pickup...</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            Dropoff Location
          </label>
          <select
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="">Select dropoff...</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="h-4 w-4 inline mr-1" />
            Passengers
          </label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Package className="h-4 w-4 inline mr-1" />
            Large Luggage Items
          </label>
          <select
            value={luggage}
            onChange={(e) => setLuggage(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>{num} item{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-3 mb-6">
        <input
          type="checkbox"
          id="student"
          checked={isStudent}
          onChange={(e) => setIsStudent(e.target.checked)}
          className="h-5 w-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
        />
        <label htmlFor="student" className="text-gray-700">
          I have a valid student ID (10% discount)
        </label>
      </div>

      <motion.button
        onClick={calculatePrice}
        disabled={!pickup || !dropoff}
        className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Calculator className="h-5 w-5" />
        <span>Get Price Estimate</span>
        <ArrowRight className="h-5 w-5" />
      </motion.button>

      {estimate && (
        <motion.div
          className="mt-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-1">Estimated price for:</p>
            <p className="font-semibold text-lg">{estimate.route}</p>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <PoundSterling className="h-8 w-8 text-yellow-500" />
            <span className="text-4xl font-bold text-yellow-500">
              £{estimate.min} - £{estimate.max}
            </span>
          </div>

          <p className="text-sm text-gray-600 text-center mb-4">
            This is an estimate. Final price confirmed at booking.
          </p>

          <AnimatedButton
            to={getBookingLink()}
            glowColor="rgba(250, 204, 21, 0.5)"
            className="w-full"
          >
            Book This Journey
          </AnimatedButton>
        </motion.div>
      )}
    </motion.div>
  );
}
