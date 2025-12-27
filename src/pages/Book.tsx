import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Plane, Users, Luggage, MessageSquare, Phone, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';

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
      ]);

      for (let i = 0; i < emailResults.length; i++) {
        const result = emailResults[i];
        const emailType = i === 0 ? 'customer' : 'owner';

        if (result.status === 'rejected') {
          console.error(`${emailType} email failed:`, result.reason);
        } else if (result.value && typeof (result.value as Response).ok !== 'undefined') {
          const response = result.value as Response;
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`${emailType} email error (${response.status}):`, errorText);
          } else {
            console.log(`${emailType} email sent successfully`);
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
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
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
                        placeholder="e.g., 123 High Street, St Andrews"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
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
                        placeholder="e.g., Edinburgh Airport"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <label className="block text-sm font-semibold mb-2" htmlFor="flightNumber">
                      Flight Number (Optional)
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
                        placeholder="e.g., BA1234"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="passengers">
                        Number of Passengers *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <select
                          id="passengers"
                          name="passengers"
                          required
                          value={formData.passengers}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none appearance-none transition-all"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="luggage">
                        Number of Luggage Items *
                      </label>
                      <div className="relative">
                        <Luggage className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <select
                          id="luggage"
                          name="luggage"
                          required
                          value={formData.luggage}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none appearance-none transition-all"
                        >
                          {[0, 1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-yellow-50 border border-yellow-400 rounded-lg p-4"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        id="isStudent"
                        name="isStudent"
                        checked={formData.isStudent}
                        onChange={handleChange}
                        className="w-5 h-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                      />
                      <span className="font-semibold text-gray-900">
                        I am a student (10% discount applies)
                      </span>
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    <label className="block text-sm font-semibold mb-2" htmlFor="notes">
                      Additional Notes (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                        placeholder="Any special requirements or requests..."
                      />
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    whileHover={isSubmitting ? {} : { scale: 1.02, boxShadow: '0 0 30px rgba(250, 204, 21, 0.5)' }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                  </motion.button>

                  <motion.p
                    className="text-sm text-gray-500 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                  >
                    By submitting this form, you agree to be contacted regarding your booking. We'll confirm your journey details and final price.
                  </motion.p>
                </div>
              </form>
            </AnimatedCard>

            <div className="mt-12">
              <AnimatedSection delay={0.2}>
                <h3 className="text-2xl font-bold mb-4 text-center">Prefer to Call or Message?</h3>
              </AnimatedSection>
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <motion.a
                  href="tel:+447470856699"
                  className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="h-5 w-5" />
                  <span>07470 856699</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/447470856699"
                  className="flex items-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>WhatsApp Us</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
