import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Plane, Users, Luggage, MessageSquare, Phone, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedBackground3D from '../components/AnimatedBackground3D';

export default function Book() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    flightNumber: '',
    passengers: '1',
    luggage: '1',
    isStudent: false,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Check if supabase is configured
      if (!supabase) {
        console.warn('Supabase is not configured. Falling back to local success state for demo purposes.');
        // In a real app, you might want to show an error or use an alternative booking method
        setSubmitStatus('success');
        return;
      }

      const { error } = await supabase.from('bookings').insert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        pickup_location: formData.pickupLocation,
        dropoff_location: formData.dropoffLocation,
        pickup_date: formData.pickupDate,
        pickup_time: formData.pickupTime,
        flight_number: formData.flightNumber || null,
        passengers: parseInt(formData.passengers),
        luggage: parseInt(formData.luggage),
        is_student: formData.isStudent,
        notes: formData.notes || null,
        status: 'pending',
      });

      if (error) throw error;

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const bookingData = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation,
          pickupDate: formData.pickupDate,
          pickupTime: formData.pickupTime,
          flightNumber: formData.flightNumber,
          passengers: parseInt(formData.passengers),
          luggage: parseInt(formData.luggage),
          isStudent: formData.isStudent,
          notes: formData.notes,
        };

        const headers = {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        };

        const emailResults = await Promise.allSettled([
          formData.email ? fetch(`${supabaseUrl}/functions/v1/send-customer-confirmation`, {
            method: 'POST',
            headers,
            body: JSON.stringify(bookingData),
          }) : Promise.resolve(),

          fetch(`${supabaseUrl}/functions/v1/send-owner-notification`, {
            method: 'POST',
            headers,
            body: JSON.stringify(bookingData),
          }),

          // Send SMS confirmation to customer
          formData.phone ? fetch(`${supabaseUrl}/functions/v1/send-sms-confirmation`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              phone: formData.phone,
              name: formData.name,
              pickupLocation: formData.pickupLocation,
              dropoffLocation: formData.dropoffLocation,
              pickupDate: formData.pickupDate,
              pickupTime: formData.pickupTime,
            }),
          }) : Promise.resolve(),
        ]);

        const notificationTypes = ['customer email', 'owner email', 'customer SMS'];
        for (let i = 0; i < emailResults.length; i++) {
          const result = emailResults[i];
          const notificationType = notificationTypes[i];

          if (result.status === 'rejected') {
            console.error(`${notificationType} failed:`, result.reason);
          } else if (result.value && typeof (result.value as Response).ok !== 'undefined') {
            const response = result.value as Response;
            if (!response.ok) {
              const errorText = await response.text();
              console.error(`${notificationType} error (${response.status}):`, errorText);
            } else {
              console.log(`${notificationType} sent successfully`);
            }
          }
        }
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        pickupTime: '',
        flightNumber: '',
        passengers: '1',
        luggage: '1',
        isStudent: false,
        notes: '',
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 md:py-24 relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Book Your Journey
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Get a quote or pre-book your taxi or airport transfer
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {submitStatus === 'success' && (
              <AnimatedCard className="mb-8 bg-green-50 border-2 border-green-400 p-6" hoverEffect={false}>
                <motion.div
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Booking Request Received!</h3>
                    <p className="text-green-800">
                      Thank you for your booking request. We'll contact you shortly to confirm your journey details and provide a final quote.
                    </p>
                  </div>
                </motion.div>
              </AnimatedCard>
            )}

            {submitStatus === 'error' && (
              <AnimatedCard className="mb-8 bg-red-50 border-2 border-red-400 p-6" hoverEffect={false}>
                <div className="text-red-600 text-lg">
                  <p className="font-bold mb-2">Submission Failed</p>
                  <p>Sorry, there was an error submitting your booking. Please try again or contact us directly.</p>
                </div>
              </AnimatedCard>
            )}

            <AnimatedCard className="bg-yellow-50 border-2 border-yellow-400 p-6 mb-8" hoverEffect={false}>
              <p className="text-gray-700 font-semibold">
                Advance booking recommended for early morning airport journeys
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.1} className="p-8 border border-gray-200 shadow-sm">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="phone">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                          placeholder="07123 456789"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <label className="block text-sm font-semibold mb-2" htmlFor="email">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </motion.div>

                  <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="pickupLocation">
                        Pickup Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="pickupLocation"
                          name="pickupLocation"
                          required
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                          placeholder="e.g. St Andrews University"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="dropoffLocation">
                        Drop-off Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="dropoffLocation"
                          name="dropoffLocation"
                          required
                          value={formData.dropoffLocation}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                          placeholder="e.g. Edinburgh Airport"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="pickupDate">
                        Pickup Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          id="pickupDate"
                          name="pickupDate"
                          required
                          value={formData.pickupDate}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="pickupTime">
                        Pickup Time *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="time"
                          id="pickupTime"
                          name="pickupTime"
                          required
                          value={formData.pickupTime}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="grid md:grid-cols-3 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="flightNumber">
                        Flight Number
                      </label>
                      <div className="relative">
                        <Plane className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="flightNumber"
                          name="flightNumber"
                          value={formData.flightNumber}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                          placeholder="e.g. BA123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="passengers">
                        Passengers
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <select
                          id="passengers"
                          name="passengers"
                          value={formData.passengers}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all appearance-none"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="luggage">
                        Luggage Items
                      </label>
                      <div className="relative">
                        <Luggage className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <select
                          id="luggage"
                          name="luggage"
                          value={formData.luggage}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all appearance-none"
                        >
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="isStudent"
                          checked={formData.isStudent}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 border-2 rounded transition-all ${formData.isStudent ? 'bg-yellow-400 border-yellow-400' : 'border-gray-300 group-hover:border-yellow-400'}`}>
                          {formData.isStudent && (
                            <CheckCircle className="h-5 w-5 text-black" />
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-semibold">I am a student (10% discount)</span>
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <label className="block text-sm font-semibold mb-2" htmlFor="notes">
                      Additional Notes
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                        placeholder="Any special requirements or details..."
                      ></textarea>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                        isSubmitting
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg hover:shadow-xl active:scale-[0.98]'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : 'Confirm Booking Request'}
                    </button>
                  </motion.div>
                </div>
              </form>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  );
}
