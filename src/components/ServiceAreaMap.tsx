import { motion } from 'framer-motion';
import { MapPin, Route, Clock, Plane, Car } from 'lucide-react';

interface Location {
  name: string;
  type: 'hub' | 'airport' | 'city';
  coords: { x: number; y: number };
  description: string;
}

interface Route {
  from: string;
  to: string;
  time: string;
  price: string;
}

const locations: Location[] = [
  { name: 'St Andrews', type: 'hub', coords: { x: 65, y: 35 }, description: 'Primary service area' },
  { name: 'Dundee', type: 'city', coords: { x: 55, y: 30 }, description: '15 mins from St Andrews' },
  { name: 'Edinburgh Airport', type: 'airport', coords: { x: 35, y: 65 }, description: '80 mins from St Andrews' },
  { name: 'Glasgow Airport', type: 'airport', coords: { x: 15, y: 75 }, description: '2 hours from St Andrews' },
  { name: 'Dundee Airport', type: 'airport', coords: { x: 58, y: 25 }, description: '30 mins from St Andrews' },
];

const popularRoutes: Route[] = [
  { from: 'St Andrews', to: 'Edinburgh Airport', time: '80 mins', price: 'From £120' },
  { from: 'St Andrews', to: 'Dundee Airport', time: '30 mins', price: 'From £50' },
  { from: 'St Andrews', to: 'Glasgow Airport', time: '2 hours', price: 'From £200' },
  { from: 'Dundee', to: 'Edinburgh Airport', time: '80 mins', price: 'From £130' },
  { from: 'St Andrews', to: 'Edinburgh', time: '75 mins', price: 'From £110' },
];

export default function ServiceAreaMap() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          className="bg-yellow-400 p-3 rounded-lg"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.3 }}
        >
          <MapPin className="h-6 w-6 text-black" />
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold">Our Service Area</h3>
          <p className="text-gray-600">Covering Fife, Edinburgh, Glasgow & beyond</p>
        </div>
      </div>

      {/* Visual Map Representation */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 mb-6 overflow-hidden" style={{ minHeight: '300px' }}>
        {/* Map Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Fife Region */}
            <ellipse cx="65" cy="35" rx="20" ry="15" fill="#10b981" />
            {/* Edinburgh Area */}
            <ellipse cx="35" cy="65" rx="15" ry="12" fill="#3b82f6" />
            {/* Glasgow Area */}
            <ellipse cx="15" cy="75" rx="12" ry="10" fill="#6366f1" />
            {/* Dundee Area */}
            <ellipse cx="55" cy="30" rx="10" ry="8" fill="#8b5cf6" />
            {/* Route Lines */}
            <line x1="65" y1="35" x2="35" y2="65" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="65" y1="35" x2="15" y2="75" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="65" y1="35" x2="55" y2="30" stroke="#f59e0b" strokeWidth="0.5" />
            <line x1="55" y1="30" x2="35" y2="65" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2" />
          </svg>
        </div>

        {/* Location Markers */}
        {locations.map((location, index) => (
          <motion.div
            key={location.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${location.coords.x}%`, top: `${location.coords.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="group relative">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
                  location.type === 'hub'
                    ? 'bg-yellow-400'
                    : location.type === 'airport'
                    ? 'bg-blue-500'
                    : 'bg-green-500'
                }`}
                whileHover={{ scale: 1.2 }}
              >
                {location.type === 'airport' ? (
                  <Plane className="h-5 w-5 text-white" />
                ) : location.type === 'hub' ? (
                  <Car className="h-5 w-5 text-black" />
                ) : (
                  <MapPin className="h-5 w-5 text-white" />
                )}
              </motion.div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <div className="bg-black text-white px-3 py-2 rounded-lg text-sm">
                  <p className="font-semibold">{location.name}</p>
                  <p className="text-gray-300 text-xs">{location.description}</p>
                </div>
              </div>
              {/* Label */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow whitespace-nowrap">
                {location.name}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
          <p className="text-xs font-semibold text-gray-600 mb-2">Legend:</p>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <span>Main Hub</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Airport</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>City</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Routes Table */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Route className="h-5 w-5 text-yellow-500" />
          <h4 className="font-bold text-lg">Popular Routes</h4>
        </div>
        <div className="space-y-3">
          {popularRoutes.map((route, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{route.from}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-medium">{route.to}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{route.time}</span>
                </div>
                <span className="font-bold text-yellow-500">{route.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coverage Info */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h5 className="font-semibold text-blue-900 mb-1">Airports</h5>
          <p className="text-sm text-blue-700">
            Edinburgh, Glasgow, Dundee & all UK airports
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h5 className="font-semibold text-green-900 mb-1">Cities</h5>
          <p className="text-sm text-green-700">
            St Andrews, Dundee, Edinburgh, Glasgow, Perth
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h5 className="font-semibold text-purple-900 mb-1">Nationwide</h5>
          <p className="text-sm text-purple-700">
            Long-distance journeys across Scotland & UK
          </p>
        </div>
      </div>
    </div>
  );
}
