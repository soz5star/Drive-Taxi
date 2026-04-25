import { motion } from 'framer-motion';
import { Plane, Clock, MapPin, CheckCircle, Phone, ArrowRight, Luggage, Shield } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedBackground3D from '../components/AnimatedBackground3D';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';

export default function StAndrewsToGlasgowAirport() {
  const features = [
    { icon: Clock, text: '120 minute journey time' },
    { icon: Luggage, text: 'Ample luggage space' },
    { icon: Shield, text: 'Flight tracking included' },
    { icon: CheckCircle, text: 'Meet & greet service' },
  ];

  const faqs = [
    {
      q: 'How long does the journey take?',
      a: 'The journey from St Andrews to Glasgow Airport typically takes 2 hours (120 minutes), depending on traffic conditions.'
    },
    {
      q: 'What is the cost?',
      a: 'Our standard rate is £190 from St Andrews to Glasgow Airport. The return journey is £170.'
    },
    {
      q: 'Why is Glasgow more expensive than Edinburgh?',
      a: 'Glasgow Airport is further from St Andrews (approximately 90 miles vs 50 miles to Edinburgh), resulting in a longer journey time and higher fuel costs.'
    },
  ];

  return (
    <div>
      <SEO
        title="St Andrews to Glasgow Airport Taxi | £190 Transfer | Drive Taxi"
        description="Reliable taxi from St Andrews to Glasgow Airport. 2 hour journey, £190 fixed price, flight tracking, meet & greet. 24/7 service. Book: 07470 856699"
        canonical="https://drivetaxi.co.uk/st-andrews-to-glasgow-airport"
        keywords="St Andrews Glasgow airport taxi, Glasgow airport transfer, St Andrews to GLA, Glasgow airport shuttle Fife, taxi to Glasgow airport"
      />
      
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 md:py-24 relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              St Andrews to <span className="text-yellow-400">Glasgow Airport</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Comfortable 2-hour journey to Scotland's largest airport. Fixed price £190.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatedButton to="/book?pickup=St%20Andrews&dropoff=Glasgow%20Airport">
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
                Glasgow Airport Transfer Service
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
                <h2 className="text-3xl font-bold mb-6">About the Journey</h2>
                <p className="text-gray-600 mb-4">
                  Glasgow Airport (GLA) is Scotland's principal long-haul airport with connections 
                  to destinations across Europe, North America, and beyond.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="font-semibold">Distance</p>
                      <p className="text-gray-600">Approximately 90 miles</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <Clock className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="font-semibold">Journey Time</p>
                      <p className="text-gray-600">2 hours (typical)</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="bg-black text-white p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-6">Pricing</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                      <span>St Andrews → Glasgow Airport</span>
                      <span className="text-2xl font-bold text-yellow-400">£190</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                      <span>Glasgow Airport → St Andrews</span>
                      <span className="text-2xl font-bold text-yellow-400">£170</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>Student Discount (10% off)</span>
                      <span>Save up to £19</span>
                    </div>
                  </div>
                  <AnimatedButton to="/book?pickup=St%20Andrews&dropoff=Glasgow%20Airport" className="w-full mt-6">
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
