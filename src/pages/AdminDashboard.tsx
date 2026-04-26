import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogOut, Trash2, Phone, Mail, MapPin, Calendar, Clock, Users, Luggage,
  Plane, MessageSquare, GraduationCap, RefreshCw, Download, Search, Filter,
  DollarSign, TrendingUp, TrendingDown, Car, User, Package, CheckCircle, Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import DriverManagement from '../components/DriverManagement';
import VehicleManagement from '../components/VehicleManagement';
import SMSManager from '../components/SMSManager';
import ExpenseTracker from '../components/ExpenseTracker';

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

type Tab = 'bookings' | 'drivers' | 'vehicles' | 'analytics' | 'sms' | 'expenses' | 'settings';

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

  // Notification settings from Supabase
  const [sendOwnerNotifications, setSendOwnerNotifications] = useState(true);

  // Fetch settings from Supabase
  const fetchSettings = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'send_owner_notifications')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
      if (data) {
        setSendOwnerNotifications(data.value);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  }, []);

  const toggleOwnerNotifications = async () => {
    if (!supabase) return;
    const newValue = !sendOwnerNotifications;
    setSendOwnerNotifications(newValue);
    
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ key: 'send_owner_notifications', value: newValue }, { onConflict: 'key' });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error saving setting:', error);
      // Revert on error
      setSendOwnerNotifications(!newValue);
    }
  };

  const fetchData = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      console.warn('Supabase is not configured. Admin dashboard will be empty.');
      return;
    }

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
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchData();
    fetchSettings();

    // Subscribe to realtime bookings updates
    if (supabase) {
      const subscription = supabase
        .channel('bookings_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookings',
          },
          (payload) => {
            console.log('Booking change received:', payload);
            // Refresh bookings data when any change occurs
            fetchData();
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user, navigate, fetchData]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
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
    if (!supabase) return;
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
    if (!supabase) return;
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
    if (!supabase) return;
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
    if (!supabase) return;
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

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Supabase Not Configured</h2>
          <p className="text-gray-600 mb-8">
            The admin dashboard requires Supabase to be configured. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

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
            value={`£${totalRevenue.toFixed(2)}`}
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

        {/* Today's Schedule */}
        <TodaySchedule bookings={bookings} onSelectBooking={setSelectedBooking} />

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
              <TabButton
                active={activeTab === 'analytics'}
                onClick={() => setActiveTab('analytics')}
                icon={TrendingUp}
                label="Analytics"
              />
              <TabButton
                active={activeTab === 'sms'}
                onClick={() => setActiveTab('sms')}
                icon={MessageSquare}
                label="SMS"
              />
              <TabButton
                active={activeTab === 'expenses'}
                onClick={() => setActiveTab('expenses')}
                icon={TrendingDown}
                label="Expenses"
              />
              <TabButton
                active={activeTab === 'settings'}
                onClick={() => setActiveTab('settings')}
                icon={Settings}
                label="Settings"
              />
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'bookings' && (
              <>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-5 w-5 text-gray-400" />
                      <select
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <button
                      onClick={exportToCSV}
                      className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 text-yellow-400 animate-spin" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                          <th className="px-4 py-3 font-semibold">Customer</th>
                          <th className="px-4 py-3 font-semibold">Journey</th>
                          <th className="px-4 py-3 font-semibold">Date & Time</th>
                          <th className="px-4 py-3 font-semibold">Status</th>
                          <th className="px-4 py-3 font-semibold">Price</th>
                          <th className="px-4 py-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredBookings.map((booking) => (
                          <tr
                            key={booking.id}
                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <td className="px-4 py-4">
                              <div className="font-bold text-gray-900">{booking.name}</div>
                              <div className="text-sm text-gray-500">{booking.phone}</div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm">
                                <span className="text-gray-500">From:</span> {booking.pickup_location}
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">To:</span> {booking.dropoff_location}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm font-medium">{booking.pickup_date}</div>
                              <div className="text-sm text-gray-500">{booking.pickup_time}</div>
                            </td>
                            <td className="px-4 py-4">
                              <StatusBadge status={booking.status} />
                            </td>
                            <td className="px-4 py-4 font-bold">
                              {booking.price ? `£${booking.price.toFixed(2)}` : '-'}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center space-x-1">
                                {booking.status === 'pending' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateBookingStatus(booking.id, 'confirmed');
                                    }}
                                    className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                    title="Confirm Booking"
                                  >
                                    <CheckCircle className="w-5 h-5" />
                                  </button>
                                )}
                                {booking.status === 'confirmed' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateBookingStatus(booking.id, 'completed');
                                    }}
                                    className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-green-50 transition-colors"
                                    title="Mark Complete"
                                  >
                                    <TrendingUp className="w-5 h-5" />
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(booking.id);
                                  }}
                                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {activeTab === 'drivers' && <DriverManagement />}
            {activeTab === 'vehicles' && <VehicleManagement />}
            {activeTab === 'analytics' && <AnalyticsView bookings={bookings} />}
            {activeTab === 'sms' && <SMSManager />}
            {activeTab === 'expenses' && <ExpenseTracker />}
            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold mb-6">Notification Settings</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Send Owner Notifications</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Receive email/SMS when a new booking is submitted
                      </p>
                    </div>
                    <button
                      onClick={toggleOwnerNotifications}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        sendOwnerNotifications ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          sendOwnerNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Status:</strong> {sendOwnerNotifications ? 'ON - You will receive notifications' : 'OFF - No notifications will be sent'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <RefreshCw className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Customer Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold text-lg">{selectedBooking.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-yellow-400" />
                        <a href={`tel:${selectedBooking.phone}`} className="hover:text-yellow-600">{selectedBooking.phone}</a>
                      </div>
                      {selectedBooking.email && (
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-yellow-400" />
                          <a href={`mailto:${selectedBooking.email}`} className="hover:text-yellow-600">{selectedBooking.email}</a>
                        </div>
                      )}
                      {selectedBooking.is_student && (
                        <div className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                          <GraduationCap className="w-4 h-4" />
                          <span className="text-sm font-bold">Student Discount Applied</span>
                        </div>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Journey Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                        <div>
                          <div className="text-sm text-gray-500">Pickup</div>
                          <div className="font-bold">{selectedBooking.pickup_location}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-red-400 mt-1" />
                        <div>
                          <div className="text-sm text-gray-500">Drop-off</div>
                          <div className="font-bold">{selectedBooking.dropoff_location}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-yellow-400" />
                          <span className="font-bold">{selectedBooking.pickup_date}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-yellow-400" />
                          <span className="font-bold">{selectedBooking.pickup_time}</span>
                        </div>
                      </div>
                      {selectedBooking.flight_number && (
                        <div className="flex items-center space-x-3">
                          <Plane className="w-5 h-5 text-yellow-400" />
                          <span className="font-bold">Flight: {selectedBooking.flight_number}</span>
                        </div>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Requirements</h3>
                    <div className="flex space-x-8">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold">{selectedBooking.passengers} Passengers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Luggage className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold">{selectedBooking.luggage} Luggage</span>
                      </div>
                    </div>
                    {selectedBooking.notes && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="w-4 h-4 text-gray-400 mt-1" />
                          <p className="text-sm text-gray-600 italic">"{selectedBooking.notes}"</p>
                        </div>
                      </div>
                    )}
                  </section>
                </div>

                <div className="space-y-8">
                  <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Management</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                        <select
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none font-bold"
                          value={selectedBooking.status}
                          onChange={(e) => updateBookingStatus(selectedBooking.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Price (£)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 font-bold">£</span>
                          <input
                            type="number"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none font-bold"
                            placeholder="0.00"
                            defaultValue={selectedBooking.price || ''}
                            onBlur={(e) => updatePrice(selectedBooking.id, parseFloat(e.target.value))}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Assign Driver</label>
                        <select
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                          value={selectedBooking.driver_id || ''}
                          onChange={(e) => assignDriver(selectedBooking.id, e.target.value || null)}
                        >
                          <option value="">Unassigned</option>
                          {drivers.map(d => (
                            <option key={d.id} value={d.id}>{d.name} ({d.status})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Assign Vehicle</label>
                        <select
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                          value={selectedBooking.vehicle_id || ''}
                          onChange={(e) => assignVehicle(selectedBooking.id, e.target.value || null)}
                        >
                          <option value="">Unassigned</option>
                          {vehicles.map(v => (
                            <option key={v.id} value={v.id}>{v.make} {v.model} ({v.plate_number})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </section>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="flex-grow bg-gray-200 text-gray-800 py-4 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => handleDelete(selectedBooking.id)}
                      className="bg-red-50 text-red-600 px-6 py-4 rounded-lg font-bold hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div className={`${color} p-4 rounded-xl text-white shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-all font-bold ${active
        ? 'border-yellow-400 text-black'
        : 'border-transparent text-gray-400 hover:text-gray-600'
        }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status.toUpperCase()}
    </span>
  );
}

function AnalyticsView({ bookings }: { bookings: Booking[] }) {
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const bookingsByDay = last7Days.map(day => ({
    day,
    count: bookings.filter(b => b.created_at.startsWith(day)).length,
    revenue: bookings.filter(b => b.created_at.startsWith(day)).reduce((sum, b) => sum + (b.price || 0), 0)
  }));

  const maxCount = Math.max(...bookingsByDay.map(d => d.count), 1);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold mb-6">Bookings (Last 7 Days)</h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {bookingsByDay.map((data, i) => (
              <div key={i} className="flex-grow flex flex-col items-center gap-2">
                <motion.div
                  className="w-full bg-yellow-400 rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.count / maxCount) * 100}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
                <span className="text-[10px] text-gray-400 font-bold rotate-45 mt-2">{data.day.split('-').slice(1).join('/')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold mb-6">Revenue Summary</h3>
          <div className="space-y-6">
            {bookingsByDay.slice(-3).map((data, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="font-bold text-gray-600">{data.day}</span>
                </div>
                <span className="font-bold">£{data.revenue.toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="font-bold text-lg">Total Period Revenue</span>
              <span className="font-bold text-2xl text-green-600">
                £{bookingsByDay.reduce((sum, d) => sum + d.revenue, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TodaySchedule Component - Shows today's bookings at a glance
function TodaySchedule({ bookings, onSelectBooking }: { bookings: Booking[]; onSelectBooking: (booking: Booking) => void }) {
  // Use local date to avoid timezone issues (returns YYYY-MM-DD in local time)
  const today = new Date().toLocaleDateString('en-CA');
  const todaysBookings = bookings.filter(b => b.pickup_date === today).sort((a, b) => a.pickup_time.localeCompare(b.pickup_time));
  
  const confirmedCount = todaysBookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = todaysBookings.filter(b => b.status === 'pending').length;
  const completedCount = todaysBookings.filter(b => b.status === 'completed').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-100 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Today's Schedule</h2>
            <p className="text-gray-500">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span>{pendingCount} Pending</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span>{confirmedCount} Confirmed</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>{completedCount} Completed</span>
          </span>
        </div>
      </div>

      {todaysBookings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No bookings scheduled for today</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todaysBookings.map((booking) => (
            <motion.div
              key={booking.id}
              onClick={() => onSelectBooking(booking)}
              className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-yellow-50 transition-colors border-l-4"
              style={{
                borderLeftColor: booking.status === 'confirmed' ? '#3B82F6' : booking.status === 'completed' ? '#10B981' : booking.status === 'cancelled' ? '#EF4444' : '#FBBF24'
              }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-lg font-bold">{booking.pickup_time}</div>
              </div>
              <div className="flex-grow px-4">
                <div className="font-bold">{booking.name}</div>
                <div className="text-sm text-gray-600">{booking.pickup_location} → {booking.dropoff_location}</div>
              </div>
              <div className="flex items-center space-x-3">
                <StatusBadge status={booking.status} />
                {booking.price && <span className="font-bold">£{booking.price}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
