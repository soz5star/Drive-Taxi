import { motion } from 'framer-motion';
import { GraduationCap, BadgePercent, CheckCircle, Plane, BookOpen } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedBackground3D from '../components/AnimatedBackground3D';
import SEO from '../components/SEO';

export default function StudentDiscount() {
  const benefits = [
    'Airport transfers to/from Edinburgh, Glasgow, and Dundee airports',
    'Early morning departures for flights',
    'Train station pickups from Leuchars',
    'Long-distance journeys across Scotland',
    'Local taxi services in St Andrews, Leuchars, and Dundee',
    'Holiday travel to and from university',
  ];

  const examples = [
    { route: 'St Andrews → Edinburgh Airport', regular: '£120', student: '£108', saving: '£12' },
    { route: 'Edinburgh Airport → St Andrews', regular: '£130', student: '£117', saving: '£13' },
    { route: 'St Andrews → Dundee Airport', regular: '£50', student: '£45', saving: '£5' },
    { route: 'Dundee → Glasgow Airport', regular: '£190', student: '£171', saving: '£19' },
  ];

  return (
    <div>
      <SEO
        title="Student Taxi Discount St Andrews | 10% Off Airport Transfers"
        description="10% student discount on all taxi journeys from St Andrews. Airport transfers to Edinburgh, Glasgow & Dundee. Valid student ID required. Book now: 07470 856699"
        canonical="https://drivetaxi.co.uk/student-discount"
        keywords="student taxi discount St Andrews, student airport transfer, cheap taxi students, St Andrews student transport"
      />
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 md:py-24 relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center justify-center space-x-3 bg-yellow-400 text-black px-6 py-3 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <GraduationCap className="h-8 w-8" />
              </motion.div>
              <span className="text-2xl font-bold">10% Off</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Student Discount
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Save 10% on all journeys with valid student ID
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedCard className="bg-yellow-50 border-2 border-yellow-400 p-8 mb-12" hoverEffect={false}>
              <div className="flex items-start space-x-4">
                <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}>
                  <BadgePercent className="h-12 w-12 text-yellow-600 flex-shrink-0" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">How It Works</h2>
                  <p className="text-gray-700 text-lg mb-4">
                    All students with valid student ID receive an automatic 10% discount on their fare. Simply present your student ID when booking or at pickup.
                  </p>
                  <motion.div
                    className="flex items-center space-x-2 text-yellow-600 font-semibold"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Valid for all journey types</span>
                  </motion.div>
                </div>
              </div>
            </AnimatedCard>

            <div className="mb-12">
              <AnimatedSection>
                <h2 className="text-3xl font-bold mb-6 text-center">Perfect For Students</h2>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Plane, title: 'Airport Transfers', text: 'Affordable, reliable transport to airports for holidays, study abroad, or visits home. Early morning departures no problem.' },
                  { icon: BookOpen, title: 'University Travel', text: 'Start and end of term transport, moving luggage between accommodation, or trips around St Andrews and Scotland.' }
                ].map((item, index) => (
                  <AnimatedCard key={index} delay={index * 0.1} className="p-6 border border-gray-200 shadow-sm">
                    <motion.div whileHover={{ scale: 1.1, y: -5 }} transition={{ duration: 0.3 }}>
                      <item.icon className="h-10 w-10 text-yellow-400 mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </AnimatedCard>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <AnimatedSection delay={0.2}>
                <h2 className="text-3xl font-bold mb-6 text-center">Student Discount Applies To:</h2>
              </AnimatedSection>
              <AnimatedCard className="p-8 bg-gray-50 border border-gray-100">
                <div className="grid md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <motion.div whileHover={{ scale: 1.3, rotate: 360 }} transition={{ duration: 0.4 }}>
                        <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedCard>
            </div>

            <div className="mb-12">
              <AnimatedSection delay={0.3}>
                <h2 className="text-3xl font-bold mb-6 text-center">Example Student Fares</h2>
              </AnimatedSection>
              <AnimatedCard delay={0.4} className="overflow-hidden p-0 border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold">Route</th>
                        <th className="px-6 py-4 text-right font-bold">Regular Price</th>
                        <th className="px-6 py-4 text-right font-bold">Student Price</th>
                        <th className="px-6 py-4 text-right font-bold text-yellow-600">You Save</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {examples.map((example, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <td className="px-6 py-4 font-medium">{example.route}</td>
                          <td className="px-6 py-4 text-right text-gray-500 line-through">{example.regular}</td>
                          <td className="px-6 py-4 text-right font-bold text-yellow-600 text-lg">{example.student}</td>
                          <td className="px-6 py-4 text-right font-semibold text-yellow-600">{example.saving}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-sm text-gray-500 px-6 py-4 bg-gray-50">
                  All prices are estimates and confirmed at booking
                </p>
              </AnimatedCard>
            </div>

            <AnimatedCard delay={0.5} className="bg-gray-50 p-8 border border-gray-100" hoverEffect={false}>
              <h3 className="text-2xl font-bold mb-4">Eligibility</h3>
              <div className="space-y-3 text-gray-700">
                {[
                  'Valid for all full-time and part-time students',
                  'Accepted IDs: University student card, NUS card, TOTUM card',
                  'Student ID must be shown at booking or pickup',
                  'Discount applies to the final confirmed fare'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.4 }}>
                      <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <p>{item}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.6 }} className="inline-block mb-6">
                <GraduationCap className="h-16 w-16 text-yellow-400 mx-auto" />
              </motion.div>
            </motion.div>
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-6">
                Ready to Save 10%?
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-xl text-gray-300 mb-8">
                Book your journey and remember to mention your student discount
              </p>
            </AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AnimatedButton to="/book" glowColor="rgba(250, 204, 21, 0.5)">
                Get Student Quote
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
