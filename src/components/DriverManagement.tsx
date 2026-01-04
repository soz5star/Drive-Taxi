import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, User, Phone, Mail, FileText, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  license_number: string;
  status: 'available' | 'on_trip' | 'offline';
  created_at: string;
}

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setDrivers(data || []);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Are you sure you want to delete this driver?')) return;

    try {
      const { error } = await supabase
        .from('drivers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setDrivers(drivers.filter(d => d.id !== id));
    } catch (error) {
      console.error('Error deleting driver:', error);
      alert('Failed to delete driver');
    }
  };

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingDriver(null);
    setShowModal(true);
  };

  if (!supabase) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Driver Management</h2>
        <p className="text-gray-500">Supabase is not configured. Please check your environment variables.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Driver Management</h2>
        <motion.button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Driver</span>
        </motion.button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-yellow-400"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drivers.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {drivers.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No drivers yet. Add one to get started!
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <DriverModal
            driver={editingDriver}
            onClose={() => {
              setShowModal(false);
              setEditingDriver(null);
            }}
            onSuccess={() => {
              fetchDrivers();
              setShowModal(false);
              setEditingDriver(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DriverCard({ driver, onEdit, onDelete }: {
  driver: Driver;
  onEdit: (driver: Driver) => void;
  onDelete: (id: string) => void;
}) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    on_trip: 'bg-blue-100 text-blue-800',
    offline: 'bg-gray-100 text-gray-800',
  };

  const statusLabels = {
    available: 'Available',
    on_trip: 'On Trip',
    offline: 'Offline',
  };

  return (
    <motion.div
      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{driver.name}</h3>
            <span className={`text-xs px-2 py-1 rounded ${statusColors[driver.status]}`}>
              {statusLabels[driver.status]}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <a href={`tel:${driver.phone}`} className="hover:text-yellow-600">
            {driver.phone}
          </a>
        </div>
        {driver.email && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${driver.email}`} className="hover:text-yellow-600">
              {driver.email}
            </a>
          </div>
        )}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FileText className="w-4 h-4" />
          <span>{driver.license_number}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <motion.button
          onClick={() => onEdit(driver)}
          className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm font-semibold hover:bg-gray-300 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Edit2 className="w-4 h-4 inline mr-1" />
          Edit
        </motion.button>
        <motion.button
          onClick={() => onDelete(driver.id)}
          className="bg-red-100 text-red-600 px-3 py-2 rounded text-sm font-semibold hover:bg-red-200 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function DriverModal({ driver, onClose, onSuccess }: {
  driver: Driver | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: driver?.name || '',
    phone: driver?.phone || '',
    email: driver?.email || '',
    license_number: driver?.license_number || '',
    status: driver?.status || 'available',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);

    try {
      if (driver) {
        const { error } = await supabase
          .from('drivers')
          .update(formData)
          .eq('id', driver.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('drivers')
          .insert([formData]);

        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving driver:', error);
      alert('Failed to save driver');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-2xl max-w-md w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-black text-white p-6 rounded-t-lg flex items-center justify-between">
          <h2 className="text-2xl font-bold">{driver ? 'Edit Driver' : 'Add Driver'}</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">License Number *</label>
            <input
              type="text"
              required
              value={formData.license_number}
              onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Driver['status'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="available">Available</option>
              <option value="on_trip">On Trip</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : driver ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
