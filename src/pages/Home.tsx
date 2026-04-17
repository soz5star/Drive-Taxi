import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, MessageCircle, Clock, Shield, MapPin, GraduationCap, Plane, Award, Star, Users, Luggage } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedCard from '../components/AnimatedCard';
import TrustBadges from '../components/TrustBadges';
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
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 md:py-28 overflow-hidden">
        <AnimatedBackground3D />
        <ParticleBackground />

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,204,21,0.1),transparent_50%)]" />
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: Text */}
            <div className="text-center md:text-left">
              <motion.div
                className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-6"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                Serving St Andrews & Fife
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100, damping: 12 }}
              >
                Reliable Airport Transfers
                <br />
                <motion.span
                  className="text-yellow-400"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                >
                  From St Andrews
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Professional airport transfers and long-distance taxi service across Scotland
              </motion.p>

              <motion.p
                className="text-sm text-gray-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Edinburgh • Glasgow • Dundee Airports • Early Morning Specialists • Student Discounts
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 mb-6"
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

            {/* Right: Car Photo */}
            <motion.div
              className="relative hidden md:block"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4, type: 'spring', stiffness: 80 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
                  alt="Professional taxi service"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-sm rounded-xl p-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="h-5 w-5 text-black fill-black" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">5-Star Rated Service</p>
                      <p className="text-gray-300 text-xs">Trusted by hundreds of passengers</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-yellow-400/10 rounded-2xl blur-xl -z-10" />
            </motion.div>
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

      {/* St Andrews Scenery Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
          alt="St Andrews, Scotland"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedSection>
            <div className="text-center text-white px-4">
              <motion.p
                className="text-yellow-400 font-semibold text-sm uppercase tracking-widest mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Based in
              </motion.p>
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                St Andrews, Fife
              </motion.h2>
              <motion.p
                className="text-gray-300 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Serving the local community and beyond since day one
              </motion.p>
            </div>
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

      {/* Vehicle Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Ride</h2>
                <p className="text-xl text-gray-600">Comfortable, spacious, and reliable</p>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <AnimatedSection>
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"
                    alt="Ford Grand C-Max taxi"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    2017 Ford Grand C-Max
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="space-y-5">
                  <h3 className="text-3xl font-bold">Ford Grand C-Max</h3>
                  <p className="text-gray-600 text-lg">A spacious, comfortable people carrier — perfect for families, groups, and passengers with lots of luggage.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Users, label: 'Up to 7 Passengers' },
                      { icon: Luggage, label: 'Ample Luggage Space' },
                      { icon: Shield, label: 'Fully Insured' },
                      { icon: Star, label: 'Clean & Comfortable' },
                    ].map((spec, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center space-x-3 bg-gray-50 rounded-xl p-3 border border-gray-100"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="bg-yellow-400 w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
                          <spec.icon className="h-5 w-5 text-black" />
                        </div>
                        <span className="font-semibold text-sm text-gray-800">{spec.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  <AnimatedButton to="/book" glowColor="rgba(250, 204, 21, 0.5)">
                    Book This Vehicle
                  </AnimatedButton>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose + Google Reviews Testimonials */}
      <section className="py-20 bg-gray-50">
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
              <AnimatedCard key={index} delay={index * 0.1} hoverEffect="glow" className="p-6 text-center bg-white border border-gray-100">
                <motion.div
                  className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                >
                  <feature.icon className="h-8 w-8 text-black" />
                </motion.div>
                <p className="font-semibold text-gray-900">{feature.text}</p>
              </AnimatedCard>
            ))}
          </div>

          {/* Google Reviews Style */}
          <AnimatedSection delay={0.3}>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold">What Customers Say</h3>
                <a
                  href="https://www.google.com/maps/search/Drive+Taxi+St+Andrews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                  <span>See Google Reviews</span>
                </a>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Sarah M.', initial: 'S', color: 'bg-blue-500', role: 'University Student', text: 'Absolutely fantastic service! Always on time for my early morning airport runs. The driver was professional and the car was spotless.', time: '2 weeks ago' },
                  { name: 'James K.', initial: 'J', color: 'bg-green-500', role: 'Business Traveller', text: 'Best taxi service in St Andrews. Reliable, professional, and great prices. Would 100% recommend for airport transfers.', time: '1 month ago' },
                  { name: 'Emma T.', initial: 'E', color: 'bg-purple-500', role: 'Local Resident', text: 'I use Drive Taxi for all my airport transfers. They never let me down and the booking process is so easy.', time: '3 weeks ago' },
                ].map((review, i) => (
                  <motion.div
                    key={i}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-10 h-10 ${review.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold">{review.initial}</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                        <p className="text-gray-500 text-xs">{review.role}</p>
                      </div>
                      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 ml-auto" />
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">"{review.text}"</p>
                    <p className="text-gray-400 text-xs mt-3">{review.time}</p>
                  </motion.div>
                ))}
              </div>
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

      <section className="py-20 bg-black text-white relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
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
