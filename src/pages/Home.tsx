import { motion } from 'framer-motion';
import { Phone, MessageCircle, Clock, Shield, MapPin, GraduationCap, Plane, Award, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedCard from '../components/AnimatedCard';
import TrustBadges from '../components/TrustBadges';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';

export default function Home() {
  const services = [
    {
      icon: Plane,
      title: 'Airport Transfers',
      description: 'Edinburgh, Glasgow & Dundee airports with flight tracking and meet & greet',
      popular: true
    },
    {
      icon: Clock,
      title: 'Early Morning Pickups',
      description: 'Catch those dawn flights with confidence. We specialize in early departures'
    },
    {
      icon: MapPin,
      title: 'Long-Distance Travel',
      description: 'Comfortable journeys across Scotland with experienced drivers'
    },
    {
      icon: GraduationCap,
      title: 'Student Discount',
      description: 'Save 10% on all journeys with valid student ID'
    }
  ];

  const features = [
    { icon: Shield, text: 'Fully Licensed & Insured Drivers' },
    { icon: Star, text: 'Local Experts - Based in St Andrews' },
    { icon: Award, text: 'Professional Airport Transfer Service' },
    { icon: Clock, text: '24/7 Advance Booking Available' }
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,204,21,0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Serving St Andrews & Fife
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Reliable Airport Transfers
              <br />
              <span className="text-yellow-400">From St Andrews</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Professional airport transfers and long-distance taxi service across Scotland
            </motion.p>

            <motion.p
              className="text-lg text-gray-400 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Edinburgh • Glasgow • Dundee Airports • Early Morning Specialists • Student Discounts
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <AnimatedButton to="/book" glowColor="rgba(250, 204, 21, 0.5)">
                Get a Free Quote
              </AnimatedButton>

              <AnimatedButton href="tel:+447470856699" variant="secondary" glowColor="rgba(255, 255, 255, 0.3)">
                <Phone className="h-5 w-5 mr-2" />
                Call: 07470 856699
              </AnimatedButton>
            </motion.div>

            <motion.a
              href="https://wa.me/447470856699"
              className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp for Quick Booking</span>
            </motion.a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <TrustBadges />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional transport solutions across Fife and Scotland
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="p-8 relative overflow-hidden border border-gray-200 shadow-sm">
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <motion.div
                  className="bg-yellow-400 w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <service.icon className="h-7 w-7 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-lg">{service.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Simple, fast, and reliable booking in three easy steps
              </p>
            </AnimatedSection>
          </div>

          <div className="max-w-6xl mx-auto">
            <HowItWorks />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose Drive Taxi?
              </h2>
              <p className="text-xl text-gray-600">
                Professional airport transfers across St Andrews and Fife
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="p-6 text-center bg-gray-50 border border-gray-100">
                <motion.div
                  className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="h-8 w-8 text-black" />
                </motion.div>
                <p className="font-semibold text-gray-900">{feature.text}</p>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-8">Our Commitment</h3>
              <Testimonials />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-yellow-400">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="inline-block mb-4"
              >
                <GraduationCap className="h-16 w-16 text-black mx-auto" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Students Save 10% on All Journeys
              </h2>
              <p className="text-xl text-black/80 mb-6">
                Perfect for airport transfers, term travel, and trips home
              </p>
              <AnimatedButton to="/student-discount" variant="secondary">
                Learn More About Student Discounts
              </AnimatedButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Book Your Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get your free quote in minutes. No obligation, quick response guaranteed
              </p>
            </AnimatedSection>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatedButton to="/book" glowColor="rgba(250, 204, 21, 0.5)">
                Get a Free Quote
              </AnimatedButton>

              <AnimatedButton to="/pricing" variant="outline" glowColor="rgba(250, 204, 21, 0.3)">
                View Pricing Examples
              </AnimatedButton>
            </motion.div>

            <motion.p
              className="mt-8 text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Or call us now: <a href="tel:+447470856699" className="text-yellow-400 hover:text-yellow-300 font-semibold">07470 856699</a>
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
