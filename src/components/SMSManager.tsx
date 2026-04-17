import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Settings, CheckCircle, XCircle, Phone, Clock } from 'lucide-react';

interface SMSTemplate {
  id: string;
  name: string;
  message: string;
  enabled: boolean;
}

interface SMSLog {
  id: string;
  to: string;
  message: string;
  status: 'sent' | 'failed' | 'pending';
  timestamp: string;
}

export default function SMSManager() {
  const [activeTab, setActiveTab] = useState<'send' | 'templates' | 'logs' | 'settings'>('send');
  const [autoSmsEnabled, setAutoSmsEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  
  const [templates, setTemplates] = useState<SMSTemplate[]>([
    {
      id: '1',
      name: 'Booking Confirmation',
      message: 'Hi {name}, your taxi from {pickup} to {dropoff} on {date} at {time} is confirmed. Thank you!',
      enabled: true
    },
    {
      id: '2',
      name: 'Driver On The Way',
      message: 'Hi {name}, your driver is on the way to {pickup}. See you soon!',
      enabled: true
    },
    {
      id: '3',
      name: 'Journey Complete',
      message: 'Thank you for choosing Drive Taxi! Your journey is complete. Price: £{price}. We hope to see you again soon.',
      enabled: true
    },
    {
      id: '4',
      name: 'Reminder (1 hour before)',
      message: 'Reminder: Your taxi pickup is scheduled for {time} from {pickup}. Your driver will arrive shortly.',
      enabled: false
    }
  ]);

  const [logs, setLogs] = useState<SMSLog[]>([
    { id: '1', to: '+447470856699', message: 'Booking confirmed...', status: 'sent', timestamp: '2024-01-15 14:30' },
    { id: '2', to: '+447123456789', message: 'Driver assigned...', status: 'sent', timestamp: '2024-01-15 13:15' },
  ]);

  const handleSendSMS = async () => {
    if (!phoneNumber || !message) return;
    setSending(true);
    
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const response = await fetch(`${supabaseUrl}/functions/v1/send-sms-manual`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          message: message,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Add to logs
        const newLog: SMSLog = {
          id: Date.now().toString(),
          to: phoneNumber,
          message: message,
          status: 'sent',
          timestamp: new Date().toLocaleString('en-GB'),
        };
        setLogs([newLog, ...logs]);
        
        setPhoneNumber('');
        setMessage('');
        alert('SMS sent successfully!');
      } else {
        alert(`Failed to send SMS: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('Failed to send SMS. Check console for details.');
    } finally {
      setSending(false);
    }
  };

  const toggleTemplate = (id: string) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, enabled: !t.enabled } : t
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('send')}
          className={`flex items-center space-x-2 pb-3 px-2 font-semibold transition-colors ${
            activeTab === 'send' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Send SMS</span>
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center space-x-2 pb-3 px-2 font-semibold transition-colors ${
            activeTab === 'templates' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Auto Templates</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center space-x-2 pb-3 px-2 font-semibold transition-colors ${
            activeTab === 'logs' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>History</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center space-x-2 pb-3 px-2 font-semibold transition-colors ${
            activeTab === 'settings' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* Send SMS Tab */}
      {activeTab === 'send' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl border border-gray-200"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-yellow-500" />
            Send Manual SMS
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 font-bold">+</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="447470856699"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter number with country code (e.g., 44 for UK)</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Enter your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none resize-none"
                maxLength={160}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{message.length}/160 characters</span>
                <span>{Math.ceil(message.length / 160)} SMS</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-gray-600">
                <Settings className="w-4 h-4 inline mr-1" />
                Twilio integration required for live sending
              </div>
              <motion.button
                onClick={handleSendSMS}
                disabled={!phoneNumber || !message || sending}
                className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send SMS</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Quick Templates */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Templates</h4>
            <div className="flex flex-wrap gap-2">
              {templates.filter(t => t.enabled).map(template => (
                <button
                  key={template.id}
                  onClick={() => setMessage(template.message)}
                  className="text-sm bg-gray-100 hover:bg-yellow-100 text-gray-700 hover:text-yellow-700 px-3 py-2 rounded-lg transition-colors"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Auto SMS:</strong> When enabled, these messages are sent automatically based on booking status changes. 
              Placeholders like {'{name}'}, {'{pickup}'}, {'{driver}'} will be replaced with actual booking data.
            </p>
          </div>

          {templates.map(template => (
            <div
              key={template.id}
              className={`p-4 rounded-lg border transition-colors ${
                template.enabled ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-bold">{template.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      template.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {template.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded font-mono">
                    {template.message}
                  </p>
                </div>
                <button
                  onClick={() => toggleTemplate(template.id)}
                  className={`ml-4 p-2 rounded-lg transition-colors ${
                    template.enabled 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                  }`}
                >
                  {template.enabled ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )}

  {/* Templates Tab */}
  {activeTab === 'templates' && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Auto SMS:</strong> When enabled, these messages are sent automatically based on booking status changes. 
          Placeholders like {'{name}'}, {'{pickup}'}, {'{driver}'} will be replaced with actual booking data.
        </p>
      </div>

      {templates.map(template => (
        <div
          key={template.id}
          className={`p-4 rounded-lg border transition-colors ${
            template.enabled ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200 opacity-60'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="font-bold">{template.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  template.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                }`}>
                  {template.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded font-mono">
                {template.message}
              </p>
            </div>
            <button
              onClick={() => toggleTemplate(template.id)}
              className={`ml-4 p-2 rounded-lg transition-colors ${
                template.enabled 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {template.enabled ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  )}

  {/* Logs Tab */}
  {activeTab === 'logs' && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
    >
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Time</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">To</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Message</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-500">{log.timestamp}</td>
              <td className="px-4 py-3 text-sm font-medium">{log.to}</td>
              <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">{log.message}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${
                  log.status === 'sent' ? 'bg-green-100 text-green-700' : 
                  log.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {log.status === 'sent' ? <CheckCircle className="w-3 h-3" /> : 
                   log.status === 'failed' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  <span className="capitalize">{log.status}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {logs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No SMS history yet</p>
        </div>
      )}
    </motion.div>
  )}

  {activeTab === 'settings' && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 p-6"
    >
      <h3 className="text-lg font-bold mb-6">SMS Settings</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-semibold">Auto-SMS on Booking</h4>
            <p className="text-sm text-gray-500">Automatically send SMS confirmation when customer books</p>
          </div>
          <button
            onClick={() => setAutoSmsEnabled(!autoSmsEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              autoSmsEnabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoSmsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">ClickSend Setup</h4>
          <p className="text-sm text-yellow-700 mb-4">
            To enable SMS, add these secrets to your Supabase project:
          </p>
          <code className="block bg-black text-green-400 p-3 rounded text-xs font-mono">
            npx supabase secrets set CLICKSEND_USERNAME=your_username<br/>
            npx supabase secrets set CLICKSEND_API_KEY=your_api_key<br/>
            npx supabase secrets set CLICKSEND_FROM=DriveTaxi
          </code>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-semibold">Status</h4>
            <p className="text-sm text-gray-500">
              {autoSmsEnabled ? 'Auto-SMS enabled' : 'Auto-SMS disabled'}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            autoSmsEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {autoSmsEnabled ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>
    </motion.div>
  )}
</div>
);
}
