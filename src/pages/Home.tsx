import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, MessageCircle, Clock, Shield, MapPin, GraduationCap, Plane, Award, Star, Users, Heart, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedCard from '../components/AnimatedCard';
import TrustBadges from '../components/TrustBadges';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedBackground3D from '../components/AnimatedBackground3D';

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const services = [
    {
      icon: Plane,
      title: 'Airport Transfers',
      description: 'Edinburgh, Glasgow & Dundee airports with flight tracking and meet & greet. We monitor your flight so you never wait alone.',
      popular: true,
      link: '/airport-transfers'
    },
    {
      icon: Clock,
      title: 'Early Morning Pickups',
      description: 'Catch those dawn flights with confidence. We specialize in early departures — no matter how early, we\'ll be there.',
      link: '/book'
    },
    {
      icon: MapPin,
      title: 'Long-Distance Travel',
      description: 'Comfortable journeys across Scotland with experienced drivers who know every road and shortcut.',
      link: '/pricing'
    },
    {
      icon: GraduationCap,
      title: 'Student Discount',
      description: 'Save 10% on all journeys with valid student ID. Perfect for term-time travel and trips home.',
      link: '/student-discount'
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
        <AnimatedBackground3D />
        <ParticleBackground />

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,204,21,0.1),transparent_50%)]" />
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              Serving St Andrews & Fife
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: 'spring',
                stiffness: 100,
                damping: 12
              }}
            >
              Reliable Airport Transfers
              <br />
              <motion.span
                className="text-gradient-shimmer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                From St Andrews
              </motion.span>
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
        </motion.div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <TrustBadges />
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-14 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Star, value: '5.0', label: 'Customer Rating' },
              { icon: Users, value: '1000+', label: 'Happy Passengers' },
              { icon: Clock, value: '24/7', label: 'Advance Booking' },
              { icon: Award, value: '10+', label: 'Years of Service' }
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                  >
                    <stat.icon className="h-6 w-6 text-black" />
                  </motion.div>
                  <motion.p
                    className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
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
                Professional transport solutions across Fife and Scotland — tailored to get you where you need to be, comfortably and on time
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <AnimatedCard key={index} delay={index * 0.1} hoverEffect="tilt" className="p-8 relative overflow-hidden border border-gray-200 shadow-sm">
                {service.popular && (
                  <motion.div
                    className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold"
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                  >
                    Most Popular
                  </motion.div>
                )}
                <motion.div
                  className="bg-yellow-400 w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                >
                  <service.icon className="h-7 w-7 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-lg mb-4">{service.description}</p>
                <motion.a
                  href={service.link}
                  className="inline-flex items-center text-yellow-600 font-semibold text-sm hover:text-yellow-700 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <CheckCircle className="h-4 w-4 ml-1" />
                </motion.a>
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
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're a locally owned taxi service rooted in St Andrews and Fife. Our drivers live here, know every route, and treat every passenger like family.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={index * 0.1} hoverEffect="glow" className="p-6 text-center bg-gray-50 border border-gray-100">
                <motion.div
                  className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    whileHover: { duration: 0.6, type: 'spring', stiffness: 200 },
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.2
                    }
                  }}
                >
                  <feature.icon className="h-8 w-8 text-black" />
                </motion.div>
                <p className="font-semibold text-gray-900">{feature.text}</p>
              </AnimatedCard>
            ))}
          </div>

          {/* Local trust blurb */}
          <AnimatedSection delay={0.2}>
            <div className="max-w-3xl mx-auto text-center mb-16 bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <motion.div
                className="inline-block mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart className="h-8 w-8 text-yellow-500 mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">Proudly Serving St Andrews Since Day One</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a student heading home for the holidays, a golfer visiting the Old Course, or a local catching an early flight from Edinburgh, we understand the needs of this community. Our commitment is simple: get you there safely, comfortably, and always on time.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-8">What Our Passengers Say</h3>
              <Testimonials variant="carousel" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-yellow-400 relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                className="inline-block mb-4"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  whileHover: { duration: 0.5 },
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }}
              >
                <GraduationCap className="h-16 w-16 text-black mx-auto" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Students Save 10% on All Journeys
              </h2>
              <p className="text-xl text-black/80 mb-2">
                Perfect for airport transfers, term travel, and trips home
              </p>
              <p className="text-black/60 mb-6">
                Just show your valid student ID and the discount is applied automatically. No codes, no fuss.
              </p>
              <AnimatedButton to="/student-discount" variant="secondary">
                Learn More About Student Discounts
              </AnimatedButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-black text-white relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Book Your Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-4">
                Get your free quote in minutes. No obligation, quick response guaranteed.
              </p>
              <p className="text-gray-400 mb-8">
                Whether it's a 4am airport run or a long-distance trip across Scotland, we've got you covered.
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
