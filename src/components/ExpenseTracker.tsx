import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Fuel, Wrench, Receipt, Trash2, TrendingDown, Calendar, PoundSterling } from 'lucide-react';

interface Expense {
  id: string;
  date: string;
  category: 'fuel' | 'maintenance' | 'insurance' | 'other';
  description: string;
  amount: number;
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', date: '2024-01-15', category: 'fuel', description: 'Diesel - Shell', amount: 65.50 },
    { id: '2', date: '2024-01-10', category: 'maintenance', description: 'Oil change', amount: 45.00 },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'fuel' as Expense['category'],
    description: '',
    amount: ''
  });

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;
    
    const expense: Expense = {
      id: Date.now().toString(),
      date: newExpense.date,
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount)
    };
    
    setExpenses([expense, ...expenses]);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: 'fuel',
      description: '',
      amount: ''
    });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this expense?')) return;
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const thisMonth = expenses.filter(e => e.date.startsWith(new Date().toISOString().slice(0, 7)));
  const monthlyTotal = thisMonth.reduce((sum, e) => sum + e.amount, 0);

  const categoryColors = {
    fuel: 'bg-red-100 text-red-700',
    maintenance: 'bg-blue-100 text-blue-700',
    insurance: 'bg-green-100 text-green-700',
    other: 'bg-gray-100 text-gray-700'
  };

  const categoryIcons = {
    fuel: Fuel,
    maintenance: Wrench,
    insurance: Receipt,
    other: Receipt
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-xl border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold">£{totalExpenses.toFixed(2)}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-xl border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold">£{monthlyTotal.toFixed(2)}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-xl border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Entries</p>
              <p className="text-2xl font-bold">{expenses.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Receipt className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </motion.button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gray-50 p-4 rounded-xl border border-gray-200"
        >
          <h3 className="font-bold mb-4">Add New Expense</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as Expense['category'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              >
                <option value="fuel">Fuel</option>
                <option value="maintenance">Maintenance</option>
                <option value="insurance">Insurance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                placeholder="e.g., Diesel refill"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (£)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">£</span>
                <input
                  type="number"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleAddExpense}
              disabled={!newExpense.description || !newExpense.amount}
              className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50"
            >
              Add Expense
            </button>
          </div>
        </motion.div>
      )}

      {/* Expenses List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense) => {
              const Icon = categoryIcons[expense.category];
              return (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{expense.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${categoryColors[expense.category]}`}>
                      <Icon className="w-3 h-3" />
                      <span className="capitalize">{expense.category}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{expense.description}</td>
                  <td className="px-4 py-3 text-sm font-bold">£{expense.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {expenses.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Receipt className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No expenses recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
