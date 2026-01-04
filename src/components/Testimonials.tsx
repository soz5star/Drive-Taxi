import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Shield, Clock, Award, ThumbsUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Testimonial {
  name: string;
  role?: string;
  text: string;
  rating: number;
  avatar?: string;
}

interface TestimonialsProps {
  variant?: 'carousel' | 'grid' | 'highlights' | 'single';
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    role: 'University Student',
    text: 'Absolutely fantastic service! Always on time for my early morning airport runs. The driver was professional and the car was spotless.',
    rating: 5
  },
  {
    name: 'James K.',
    role: 'Business Traveler',
    text: 'Best taxi service in St Andrews. Reliable, professional, and great prices. The student discount is a real bonus!',
    rating: 5
  },
  {
    name: 'Emma T.',
    role: 'Local Resident',
    text: 'I use Drive Taxi for all my airport transfers. They never let me down and the booking process is so easy.',
    rating: 5
  },
  {
    name: 'Michael R.',
    role: 'Tourist',
    text: 'Excellent experience from start to finish. The driver knew all the best routes and got us there ahead of schedule.',
    rating: 5
  },
  {
    name: 'Lisa P.',
    role: 'Conference Attendee',
    text: 'Booked for a group transfer and the service was impeccable. Will definitely use again!',
    rating: 5
  }
];

export default function Testimonials({
  variant = 'highlights',
  autoPlay = true,
  autoPlayInterval = 5000
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!autoPlay || variant !== 'carousel') return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, variant]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  const renderStars = (rating: number, delay: number = 0) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: delay + i * 0.05, type: 'spring', stiffness: 300 }}
        >
          <Star
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        </motion.div>
      ))}
    </div>
  );

  // Highlights variant (original)
  if (variant === 'highlights') {
    const highlights = [
      {
        icon: Shield,
        title: 'Reliable Service',
        text: 'Punctual pickups and professional drivers for stress-free travel'
      },
      {
        icon: Clock,
        title: 'Early Morning Specialists',
        text: 'Experienced in dawn departures and tight airport schedules'
      },
      {
        icon: Award,
        title: 'Quality Vehicles',
        text: 'Clean, comfortable, and well-maintained fleet'
      },
      {
        icon: ThumbsUp,
        title: 'Local Knowledge',
        text: 'Serving St Andrews and Fife with expertise'
      }
    ];

    return (
      <motion.div
        ref={ref}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative overflow-hidden group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ 
              y: -10, 
              boxShadow: '0 25px 50px rgba(0,0,0,0.12)',
              borderColor: 'rgba(250, 204, 21, 0.5)'
            }}
          >
            {/* Background gradient on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            <motion.div
              className="bg-yellow-400 w-14 h-14 rounded-xl flex items-center justify-center mb-4 relative"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <highlight.icon className="h-7 w-7 text-black" />
              
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 bg-yellow-400 rounded-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
            </motion.div>
            
            <h3 className="font-bold text-lg mb-2 text-gray-900 relative z-10">
              {highlight.title}
            </h3>
            <p className="text-gray-600 text-sm relative z-10">{highlight.text}</p>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (variant === 'grid') {
    return (
      <motion.div
        ref={ref}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {testimonials.slice(0, 6).map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ 
              y: -10, 
              boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
              borderColor: 'rgba(250, 204, 21, 0.5)'
            }}
          >
            {/* Quote icon */}
            <motion.div
              className="absolute top-4 right-4 text-yellow-400/20"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <Quote className="h-12 w-12" />
            </motion.div>

            {renderStars(testimonial.rating, 0.2 + index * 0.1)}
            
            <p className="text-gray-700 my-4 relative z-10 italic">
              "{testimonial.text}"
            </p>
            
            <div className="flex items-center gap-3 mt-4">
              <motion.div
                className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-black font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </span>
              </motion.div>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                {testimonial.role && (
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (variant === 'single') {
    const testimonial = testimonials[0];
    return (
      <motion.div
        ref={ref}
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-yellow-400 mb-6"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <Quote className="h-16 w-16 mx-auto" />
        </motion.div>
        
        <motion.p
          className="text-2xl md:text-3xl text-gray-800 mb-8 italic leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          "{testimonial.text}"
        </motion.p>
        
        <div className="flex justify-center mb-4">
          {renderStars(testimonial.rating, 0.4)}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="font-bold text-xl text-gray-900">{testimonial.name}</p>
          {testimonial.role && (
            <p className="text-gray-500">{testimonial.role}</p>
          )}
        </motion.div>
      </motion.div>
    );
  }

  // Carousel variant
  return (
    <div ref={ref} className="relative max-w-4xl mx-auto">
      {/* Main testimonial */}
      <div className="relative overflow-hidden min-h-[300px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 text-center relative"
          >
            {/* Quote icon */}
            <motion.div
              className="absolute top-6 left-6 text-yellow-400/20"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Quote className="h-16 w-16" />
            </motion.div>

            {/* Stars */}
            <div className="flex justify-center mb-6">
              {renderStars(testimonials[currentIndex].rating)}
            </div>

            {/* Quote */}
            <motion.p
              className="text-xl md:text-2xl text-gray-800 mb-8 italic leading-relaxed relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              "{testimonials[currentIndex].text}"
            </motion.p>

            {/* Author */}
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-black font-bold text-xl">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </motion.div>
              <div className="text-left">
                <p className="font-bold text-lg text-gray-900">
                  {testimonials[currentIndex].name}
                </p>
                {testimonials[currentIndex].role && (
                  <p className="text-gray-500">
                    {testimonials[currentIndex].role}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <motion.button
          onClick={prevTestimonial}
          className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-yellow-600 hover:border-yellow-400 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-yellow-400' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: index === currentIndex ? 1.2 : 1
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={nextTestimonial}
          className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-yellow-600 hover:border-yellow-400 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Progress bar */}
      {autoPlay && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-yellow-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: autoPlayInterval / 1000,
              ease: 'linear',
              repeat: Infinity
            }}
            key={currentIndex}
          />
        </motion.div>
      )}
    </div>
  );
}

// Testimonial marquee component
interface TestimonialMarqueeProps {
  speed?: number;
}

export function TestimonialMarquee({ speed = 30 }: TestimonialMarqueeProps) {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden py-4">
      <motion.div
        className="flex gap-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <span className="font-medium text-sm text-gray-900">
                {testimonial.name}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
