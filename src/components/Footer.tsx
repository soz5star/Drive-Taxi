import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-yellow-400">Drive</span> Taxi
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Airport Transfers & Taxi Services
            </p>
            <p className="text-yellow-400 font-semibold mb-2">
              10% Student Discount Available
            </p>
            <p className="text-gray-400 text-sm">
              Pre-Booked, Reliable, Professional
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/book" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/airport-transfers" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link to="/student-discount" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Student Discount
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>St Andrews</li>
              <li>Leuchars Train Station</li>
              <li>Dundee</li>
              <li>Edinburgh Airport</li>
              <li>Glasgow Airport</li>
              <li>Dundee Airport</li>
              <li>Across Scotland</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+447470856699"
                  className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  <span>07470 856699</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447470856699"
                  className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:haje2065@gmail.com"
                  className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>haje2065@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mt-1" />
                <span>St Andrews, Fife<br />Scotland</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Drive Taxi. All rights reserved.</p>
          <p className="mt-2">Available 24/7 by advance booking</p>
          <Link
            to="/admin/login"
            className="inline-block mt-4 text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
