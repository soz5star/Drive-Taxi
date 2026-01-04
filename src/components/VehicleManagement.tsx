import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Car, Users, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plate_number: string;
  capacity: number;
  status: 'available' | 'in_use' | 'maintenance';
  created_at: string;
}

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('make', { ascending: true });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setVehicles(vehicles.filter(v => v.id !== id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle');
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingVehicle(null);
    setShowModal(true);
  };

  if (!supabase) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Vehicle Management</h2>
        <p className="text-gray-500">Supabase is not configured. Please check your environment variables.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Vehicle Management</h2>
        <motion.button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Vehicle</span>
        </motion.button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-yellow-400"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {vehicles.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No vehicles yet. Add one to get started!
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <VehicleModal
            vehicle={editingVehicle}
            onClose={() => {
              setShowModal(false);
              setEditingVehicle(null);
            }}
            onSuccess={() => {
              fetchVehicles();
              setShowModal(false);
              setEditingVehicle(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function VehicleCard({ vehicle, onEdit, onDelete }: {
  vehicle: Vehicle;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    in_use: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-orange-100 text-orange-800',
  };

  const statusLabels = {
    available: 'Available',
    in_use: 'In Use',
    maintenance: 'Maintenance',
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
            <Car className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{vehicle.make} {vehicle.model}</h3>
            <span className={`text-xs px-2 py-1 rounded ${statusColors[vehicle.status]}`}>
              {statusLabels[vehicle.status]}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Year:</span> {vehicle.year}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Plate:</span> {vehicle.plate_number}
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span className="font-semibold">Capacity:</span>
          <span>{vehicle.capacity} passengers</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <motion.button
          onClick={() => onEdit(vehicle)}
          className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm font-semibold hover:bg-gray-300 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Edit2 className="w-4 h-4 inline mr-1" />
          Edit
        </motion.button>
        <motion.button
          onClick={() => onDelete(vehicle.id)}
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

function VehicleModal({ vehicle, onClose, onSuccess }: {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    year: vehicle?.year || new Date().getFullYear(),
    plate_number: vehicle?.plate_number || '',
    capacity: vehicle?.capacity || 4,
    status: vehicle?.status || 'available',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);

    try {
      if (vehicle) {
        const { error } = await supabase
          .from('vehicles')
          .update(formData)
          .eq('id', vehicle.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('vehicles')
          .insert([formData]);

        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      alert('Failed to save vehicle');
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
          <h2 className="text-2xl font-bold">{vehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Make *</label>
            <input
              type="text"
              required
              value={formData.make}
              onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="e.g., Toyota"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Model *</label>
            <input
              type="text"
              required
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="e.g., Camry"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Year *</label>
            <input
              type="number"
              required
              min="1900"
              max={new Date().getFullYear() + 1}
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Plate Number *</label>
            <input
              type="text"
              required
              value={formData.plate_number}
              onChange={(e) => setFormData({ ...formData, plate_number: e.target.value.toUpperCase() })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="e.g., ABC123"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Capacity *</label>
            <input
              type="number"
              required
              min="1"
              max="15"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Vehicle['status'] })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="available">Available</option>
              <option value="in_use">In Use</option>
              <option value="maintenance">Maintenance</option>
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
              {saving ? 'Saving...' : vehicle ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
