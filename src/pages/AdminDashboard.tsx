import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogOut, Trash2, Phone, Mail, MapPin, Calendar, Clock, Users, Luggage,
  Plane, MessageSquare, GraduationCap, RefreshCw, Download, Search, Filter,
  DollarSign, TrendingUp, Car, User, Package
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import DriverManagement from '../components/DriverManagement';
import VehicleManagement from '../components/VehicleManagement';

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  flight_number: string | null;
  passengers: number;
  luggage: number;
  is_student: boolean;
  notes: string | null;
  status: string;
  price: number | null;
  driver_id: string | null;
  vehicle_id: string | null;
  created_at: string;
}

interface Driver {
  id: string;
  name: string;
  status: string;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  plate_number: string;
  status: string;
}

type Tab = 'bookings' | 'drivers' | 'vehicles' | 'analytics';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, driversRes, vehiclesRes] = await Promise.all([
        supabase
          .from('bookings')
          .select('*')
          .order('pickup_date', { ascending: true })
          .order('pickup_time', { ascending: true }),
        supabase
          .from('drivers')
          .select('id, name, status'),
        supabase
          .from('vehicles')
          .select('id, make, model, plate_number, status')
      ]);

      if (bookingsRes.error) throw bookingsRes.error;
      if (driversRes.error) throw driversRes.error;
      if (vehiclesRes.error) throw vehiclesRes.error;

      setBookings(bookingsRes.data || []);
      setDrivers(driversRes.data || []);
      setVehicles(vehiclesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBookings(bookings.filter(b => b.id !== id));
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const assignDriver = async (bookingId: string, driverId: string | null) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ driver_id: driverId })
        .eq('id', bookingId);

      if (error) throw error;
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, driver_id: driverId } : b));
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, driver_id: driverId });
      }
    } catch (error) {
      console.error('Error assigning driver:', error);
      alert('Failed to assign driver');
    }
  };

  const assignVehicle = async (bookingId: string, vehicleId: string | null) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ vehicle_id: vehicleId })
        .eq('id', bookingId);

      if (error) throw error;
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, vehicle_id: vehicleId } : b));
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, vehicle_id: vehicleId });
      }
    } catch (error) {
      console.error('Error assigning vehicle:', error);
      alert('Failed to assign vehicle');
    }
  };

  const updatePrice = async (bookingId: string, price: number) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ price })
        .eq('id', bookingId);

      if (error) throw error;
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, price } : b));
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, price });
      }
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Failed to update price');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Pickup', 'Dropoff', 'Date', 'Time', 'Passengers', 'Status', 'Price'];
    const rows = filteredBookings.map(b => [
      b.name,
      b.phone,
      b.email || '',
      b.pickup_location,
      b.dropoff_location,
      b.pickup_date,
      b.pickup_time,
      b.passengers,
      b.status,
      b.price || ''
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = searchTerm === '' ||
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.pickup_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.dropoff_location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-300 mt-1">Manage your taxi service</p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={fetchData}
                className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </motion.button>
              <motion.button
                onClick={handleSignOut}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            color="bg-green-500"
          />
          <StatCard
            title="Total Bookings"
            value={bookings.length}
            icon={Package}
            color="bg-blue-500"
          />
          <StatCard
            title="Pending"
            value={pendingBookings}
            icon={Clock}
            color="bg-yellow-400"
          />
          <StatCard
            title="Completed"
            value={completedBookings}
            icon={TrendingUp}
            color="bg-black"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <TabButton
                active={activeTab === 'bookings'}
                onClick={() => setActiveTab('bookings')}
                icon={Calendar}
                label="Bookings"
              />
              <TabButton
                active={activeTab === 'drivers'}
                onClick={() => setActiveTab('drivers')}
                icon={User}
                label="Drivers"
              />
              <TabButton
                active={activeTab === 'vehicles'}
                onClick={() => setActiveTab('vehicles')}
                icon={Car}
                label="Vehicles"
              />
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'bookings' && (
              <div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <motion.button
                      onClick={exportToCSV}
                      className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </motion.button>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-yellow-400"></div>
                    <p className="mt-4 text-gray-600">Loading bookings...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredBookings.map((booking, index) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        index={index}
                        drivers={drivers}
                        vehicles={vehicles}
                        onView={setSelectedBooking}
                        onDelete={handleDelete}
                        onStatusChange={updateBookingStatus}
                      />
                    ))}
                    {filteredBookings.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-lg">No bookings found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'drivers' && <DriverManagement />}
            {activeTab === 'vehicles' && <VehicleManagement />}
          </div>
        </div>
      </div>

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          drivers={drivers}
          vehicles={vehicles}
          onClose={() => setSelectedBooking(null)}
          onDelete={handleDelete}
          onStatusChange={updateBookingStatus}
          onAssignDriver={assignDriver}
          onAssignVehicle={assignVehicle}
          onUpdatePrice={updatePrice}
        />
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: {
  title: string;
  value: string | number;
  icon: any;
  color: string;
}) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
          <p className="text-3xl font-bold text-black mt-2">{value}</p>
        </div>
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: {
  active: boolean;
  onClick: () => void;
  icon: any;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
        active
          ? 'border-yellow-400 text-black'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold">{label}</span>
    </button>
  );
}

function BookingCard({
  booking,
  index,
  drivers,
  vehicles,
  onView,
  onDelete,
  onStatusChange,
}: {
  booking: Booking;
  index: number;
  drivers: Driver[];
  vehicles: Vehicle[];
  onView: (booking: Booking) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const assignedDriver = drivers.find(d => d.id === booking.driver_id);
  const assignedVehicle = vehicles.find(v => v.id === booking.vehicle_id);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onView(booking)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-xl font-bold text-gray-900">{booking.name}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[booking.status] || 'bg-gray-100 text-gray-800'}`}>
              {booking.status}
            </span>
            {booking.is_student && (
              <span className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                <GraduationCap className="w-3 h-3" />
                <span>Student</span>
              </span>
            )}
            {booking.price && (
              <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800">
                ${booking.price}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <a href={`tel:${booking.phone}`} className="hover:text-yellow-600" onClick={(e) => e.stopPropagation()}>
                  {booking.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{booking.pickup_date}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{booking.pickup_time}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold">{booking.pickup_location}</div>
                  <div className="text-gray-500">to {booking.dropoff_location}</div>
                </div>
              </div>
            </div>
          </div>

          {(assignedDriver || assignedVehicle) && (
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              {assignedDriver && (
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{assignedDriver.name}</span>
                </div>
              )}
              {assignedVehicle && (
                <div className="flex items-center space-x-1">
                  <Car className="w-4 h-4" />
                  <span>{assignedVehicle.make} {assignedVehicle.model}</span>
                </div>
              )}
            </div>
          )}

          <select
            value={booking.status}
            onChange={(e) => {
              e.stopPropagation();
              onStatusChange(booking.id, e.target.value);
            }}
            className="text-sm px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(booking.id);
          }}
          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function BookingDetailModal({
  booking,
  drivers,
  vehicles,
  onClose,
  onDelete,
  onStatusChange,
  onAssignDriver,
  onAssignVehicle,
  onUpdatePrice,
}: {
  booking: Booking;
  drivers: Driver[];
  vehicles: Vehicle[];
  onClose: () => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onAssignDriver: (bookingId: string, driverId: string | null) => void;
  onAssignVehicle: (bookingId: string, vehicleId: string | null) => void;
  onUpdatePrice: (bookingId: string, price: number) => void;
}) {
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceValue, setPriceValue] = useState(booking.price?.toString() || '');

  const handlePriceSubmit = () => {
    const price = parseFloat(priceValue);
    if (!isNaN(price) && price >= 0) {
      onUpdatePrice(booking.id, price);
      setEditingPrice(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-black text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Booking Details</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-yellow-400 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-sm mb-2">Status</h3>
              <select
                value={booking.status}
                onChange={(e) => onStatusChange(booking.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-sm mb-2">Price</h3>
              {editingPrice ? (
                <div className="flex space-x-2">
                  <input
                    type="number"
                    step="0.01"
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                    placeholder="0.00"
                  />
                  <button
                    onClick={handlePriceSubmit}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingPrice(true)}
                  className="w-full text-left px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  {booking.price ? `$${booking.price}` : 'Set price'}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-sm mb-2">Assign Driver</h3>
              <select
                value={booking.driver_id || ''}
                onChange={(e) => onAssignDriver(booking.id, e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">No driver assigned</option>
                {drivers.filter(d => d.status !== 'offline').map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.status})</option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-sm mb-2">Assign Vehicle</h3>
              <select
                value={booking.vehicle_id || ''}
                onChange={(e) => onAssignVehicle(booking.id, e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">No vehicle assigned</option>
                {vehicles.filter(v => v.status !== 'maintenance').map(v => (
                  <option key={v.id} value={v.id}>{v.make} {v.model} ({v.plate_number})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold min-w-24">Name:</span>
                <span>{booking.name}</span>
                {booking.is_student && (
                  <span className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded ml-2">
                    <GraduationCap className="w-3 h-3" />
                    <span>Student 10% Off</span>
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">Phone:</span>
                <a href={`tel:${booking.phone}`} className="text-yellow-600 hover:underline">
                  {booking.phone}
                </a>
              </div>
              {booking.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="font-semibold">Email:</span>
                  <a href={`mailto:${booking.email}`} className="text-yellow-600 hover:underline">
                    {booking.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-3">Journey Details</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <span className="font-semibold block">Pickup:</span>
                  <span>{booking.pickup_location}</span>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <span className="font-semibold block">Drop-off:</span>
                  <span>{booking.dropoff_location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Date:</span>
                <span>{booking.pickup_date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Time:</span>
                <span>{booking.pickup_time}</span>
              </div>
              {booking.flight_number && (
                <div className="flex items-center space-x-2">
                  <Plane className="w-5 h-5" />
                  <span className="font-semibold">Flight:</span>
                  <span>{booking.flight_number}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">Passengers:</span>
                <span>{booking.passengers}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Luggage className="w-5 h-5" />
                <span className="font-semibold">Luggage:</span>
                <span>{booking.luggage} items</span>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <MessageSquare className="w-5 h-5 mt-0.5" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Special Requests</h3>
                  <p className="text-gray-700">{booking.notes}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Booking created: {new Date(booking.created_at).toLocaleString()}
            </p>
          </div>

          <div className="flex space-x-3">
            <motion.button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
            <motion.button
              onClick={() => {
                onDelete(booking.id);
                onClose();
              }}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Booking</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
