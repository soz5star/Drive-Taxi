import { motion } from 'framer-motion';
import { Clock, MapPin, CheckCircle, Phone, ArrowRight, Luggage, Shield } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedBackground3D from '../components/AnimatedBackground3D';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';

export default function StAndrewsToDundeeAirport() {
  const features = [
    { icon: Clock, text: '30 minute journey time' },
    { icon: Luggage, text: 'Ample luggage space' },
    { icon: Shield, text: 'Flight tracking included' },
    { icon: CheckCircle, text: 'Quick local transfer' },
  ];

  const faqs = [
    {
      q: 'How long does the journey take?',
      a: 'The journey from St Andrews to Dundee Airport is just 30 minutes, making it our quickest airport transfer.'
    },
    {
      q: 'What is the cost?',
      a: 'Our standard rate is £50 for transfers between St Andrews and Dundee Airport in either direction.'
    },
    {
      q: 'Which airlines fly from Dundee?',
      a: 'Dundee Airport offers flights to London City Airport with Loganair. Perfect for connecting to international flights.'
    },
  ];

  return (
    <div>
      <SEO
        title="St Andrews to Dundee Airport Taxi | £50 Transfer | 30 Mins"
        description="Quick taxi from St Andrews to Dundee Airport. Only 30 minutes, £50 fixed price. Perfect for London flights. 24/7 service. Book: 07470 856699"
        canonical="https://drivetaxi.co.uk/st-andrews-to-dundee-airport"
        keywords="St Andrews Dundee airport taxi, Dundee airport transfer, St Andrews to DND, Dundee airport shuttle, quick airport taxi"
      />
      
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 md:py-24 relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-green-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              Quickest Airport Transfer
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              St Andrews to <span className="text-yellow-400">Dundee Airport</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Just 30 minutes to Dundee Airport. Fixed price £50.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatedButton to="/book?pickup=St%20Andrews&dropoff=Dundee%20Airport">
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Choose Our Dundee Airport Service?
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

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <h2 className="text-3xl font-bold mb-6">The Local Choice</h2>
                <p className="text-gray-600 mb-4">
                  Dundee Airport is just 15 miles from St Andrews, making it the closest airport 
                  for local residents. Ideal for London connections via Loganair.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="font-semibold">Distance</p>
                      <p className="text-gray-600">Just 15 miles</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <Clock className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="font-semibold">Journey Time</p>
                      <p className="text-gray-600">30 minutes (typical)</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="bg-black text-white p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-6">Pricing</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                      <span>St Andrews ↔ Dundee Airport</span>
                      <span className="text-2xl font-bold text-yellow-400">£50</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                      <span>Dundee ↔ St Andrews Airport</span>
                      <span className="text-2xl font-bold text-yellow-400">£50</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>Student Discount (10% off)</span>
                      <span>Save £5</span>
                    </div>
                  </div>
                  <AnimatedButton to="/book?pickup=St%20Andrews&dropoff=Dundee%20Airport" className="w-full mt-6">
                    Book Now
                  </AnimatedButton>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Other Popular Routes</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedButton to="/st-andrews-to-edinburgh-airport" variant="outline">
                Edinburgh Airport
                <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedButton>
              <AnimatedButton to="/st-andrews-to-glasgow-airport" variant="outline">
                Glasgow Airport
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
