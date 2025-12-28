import { motion } from 'framer-motion';
import { Phone, MessageCircle, Clock, Shield, MapPin, GraduationCap, Plane, Award, Star, ArrowRight } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div>
      {/* Hero Section with Enhanced Animations */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-24 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,204,21,0.1),transparent_50%)]" />
        </motion.div>

        {/* Floating accent elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full opacity-5 blur-3xl"
          animate={{ 
            y: [0, 30, -20, 0],
            x: [0, 20, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400 rounded-full opacity-5 blur-3xl"
          animate={{ 
            y: [0, -40, 20, 0],
            x: [0, -30, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with bounce animation */}
            <motion.div
              className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              Serving St Andrews & Fife
            </motion.div>

            {/* Main heading with staggered letter animation effect */}
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 40, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Reliable Airport Transfers
              <br />
              <motion.span 
                className="text-yellow-400 inline-block"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                From St Andrews
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Professional airport transfers and long-distance taxi service across Scotland
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-400 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Edinburgh • Glasgow • Dundee Airports • Early Morning Specialists • Student Discounts
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              variants={containerVariants}
            >
              <AnimatedButton 
                to="/book" 
                glowColor="rgba(250, 204, 21, 0.5)"
                animationVariant="bounce"
              >
                Get a Free Quote
              </AnimatedButton>

              <AnimatedButton 
                href="tel:+447470856699" 
                variant="secondary" 
                glowColor="rgba(255, 255, 255, 0.3)"
                animationVariant="advanced"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call: 07470 856699
              </AnimatedButton>
            </motion.div>

            {/* WhatsApp Link with floating animation */}
            <motion.a
              href="https://wa.me/447470856699"
              className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageCircle className="h-5 w-5" />
              </motion.div>
              <span>WhatsApp for Quick Booking</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="bounceUp">
            <TrustBadges />
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section with Enhanced Card Animations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <AnimatedSection variant="rotateUp">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional transport solutions across Fife and Scotland
              </p>
            </AnimatedSection>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {services.map((service, index) => (
              <AnimatedCard 
                key={index} 
                delay={index * 0.1} 
                className="p-8 relative overflow-hidden border border-gray-200 shadow-sm"
                variant="glow"
              >
                {service.popular && (
                  <motion.div 
                    className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Most Popular
                  </motion.div>
                )}
                <motion.div
                  className="bg-yellow-400 w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                >
                  <service.icon className="h-7 w-7 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-lg">{service.description}</p>
              </AnimatedCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AnimatedSection variant="flipX">
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <AnimatedSection variant="slideRight">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose Drive Taxi?
              </h2>
              <p className="text-xl text-gray-600">
                Professional airport transfers across St Andrews and Fife
              </p>
            </AnimatedSection>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {features.map((feature, index) => (
              <AnimatedCard 
                key={index} 
                delay={index * 0.1} 
                className="p-6 text-center bg-gray-50 border border-gray-100"
                variant="3d"
              >
                <motion.div
                  className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.15 }}
                >
                  <feature.icon className="h-8 w-8 text-black" />
                </motion.div>
                <p className="font-semibold text-gray-900">{feature.text}</p>
              </AnimatedCard>
            ))}
          </motion.div>

          {/* Testimonials */}
          <AnimatedSection delay={0.4} variant="zoomIn">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-8">Our Commitment</h3>
              <Testimonials />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Student Discount Section */}
      <section className="py-16 bg-yellow-400">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="bounceUp">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
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
              <AnimatedButton 
                to="/student-discount" 
                variant="secondary"
                animationVariant="bounce"
              >
                Learn More About Student Discounts
              </AnimatedButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        {/* Background animations */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.1),transparent_70%)]" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection variant="rotateUp">
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
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              variants={containerVariants}
            >
              <AnimatedButton 
                to="/book" 
                glowColor="rgba(250, 204, 21, 0.5)"
                animationVariant="bounce"
              >
                Get a Free Quote
              </AnimatedButton>

              <AnimatedButton 
                to="/pricing" 
                variant="outline" 
                glowColor="rgba(250, 204, 21, 0.3)"
                animationVariant="advanced"
              >
                View Pricing Examples
              </AnimatedButton>
            </motion.div>

            <motion.p
              className="mt-8 text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Or call us now: <a href="tel:+447470856699" className="text-yellow-400 hover:text-yellow-300 font-semibold">07470 856699</a>
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
