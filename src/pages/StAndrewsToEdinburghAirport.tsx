import { motion } from 'framer-motion';
import { Plane, Clock, MapPin, CheckCircle, Phone, ArrowRight, Luggage, Shield } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedBackground3D from '../components/AnimatedBackground3D';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';

export default function StAndrewsToEdinburghAirport() {
  const features = [
    { icon: Clock, text: '80 minute journey time' },
    { icon: Luggage, text: 'Ample luggage space' },
    { icon: Shield, text: 'Flight tracking included' },
    { icon: CheckCircle, text: 'Meet & greet service' },
  ];

  const faqs = [
    {
      q: 'How long does the journey take?',
      a: 'The journey from St Andrews to Edinburgh Airport typically takes 80 minutes, depending on traffic conditions.'
    },
    {
      q: 'What is the cost?',
      a: 'Our standard rate is £120 from St Andrews to Edinburgh Airport. The return journey is £130.'
    },
    {
      q: 'Do you track flights?',
      a: 'Yes, we monitor flight arrivals and adjust pickup times accordingly at no extra cost.'
    },
  ];

  return (
    <div>
      <SEO
        title="St Andrews to Edinburgh Airport Taxi | £120 Transfer | Drive Taxi"
        description="Reliable taxi from St Andrews to Edinburgh Airport. 80 min journey, £120 fixed price, flight tracking, meet & greet. 24/7 service. Book: 07470 856699"
        canonical="https://drivetaxi.co.uk/st-andrews-to-edinburgh-airport"
        keywords="St Andrews Edinburgh airport taxi, Edinburgh airport transfer, St Andrews to EDI, airport taxi Fife, Edinburgh airport shuttle"
      />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 md:py-24 relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              Most Popular Route
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              St Andrews to <span className="text-yellow-400">Edinburgh Airport</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Reliable airport transfer in 80 minutes. Fixed price £120.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatedButton to="/book?pickup=St%20Andrews&dropoff=Edinburgh%20Airport">
                Book This Journey
              </AnimatedButton>
              <AnimatedButton href="tel:+447470856699" variant="secondary">
                <Phone className="w-5 h-5 mr-2" />
                Call 07470 856699
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Choose Our Edinburgh Airport Service?
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <AnimatedCard key={i} delay={i * 0.1} className="p-6 text-center">
                  <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-black" />
                  </div>
                  <p className="font-semibold">{feature.text}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Route Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <h2 className="text-3xl font-bold mb-6">Journey Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="font-semibold">Distance</p>
                      <p className="text-gray-600">Approximately 50 miles</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <Clock className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="font-semibold">Journey Time</p>
                      <p className="text-gray-600">80 minutes (typical)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <Plane className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="font-semibold">Flight Tracking</p>
                      <p className="text-gray-600">We monitor your flight for delays</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="bg-black text-white p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-6">Pricing</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                      <span>St Andrews → Edinburgh Airport</span>
                      <span className="text-2xl font-bold text-yellow-400">£120</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                      <span>Edinburgh Airport → St Andrews</span>
                      <span className="text-2xl font-bold text-yellow-400">£130</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>Student Discount (10% off)</span>
                      <span>Save up to £13</span>
                    </div>
                  </div>
                  <AnimatedButton to="/book?pickup=St%20Andrews&dropoff=Edinburgh%20Airport" className="w-full mt-6">
                    Book Now
                  </AnimatedButton>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            </AnimatedSection>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <AnimatedCard key={i} delay={i * 0.1} className="p-6">
                  <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Routes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Other Popular Routes</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedButton to="/st-andrews-to-glasgow-airport" variant="outline">
                Glasgow Airport
                <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedButton>
              <AnimatedButton to="/st-andrews-to-dundee-airport" variant="outline">
                Dundee Airport
                <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedButton>
              <AnimatedButton to="/leuchars-taxi" variant="outline">
                Leuchars Station
                <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
