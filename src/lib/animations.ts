// Advanced Animation Library for Drive Taxi
// Extensive collection of sophisticated animations

// Custom easing functions
export const customEase = [0.22, 1, 0.36, 1];
export const springEase = [0.175, 0.885, 0.32, 1.275];
export const bounceEase = [0.68, -0.55, 0.265, 1.55];
export const smoothEase = [0.43, 0.13, 0.23, 0.96];
export const elasticEase = [0.68, -0.6, 0.32, 1.6];

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: customEase }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: 'easeOut' }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: customEase }
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: springEase }
};

export const fadeInRotate = {
  initial: { opacity: 0, rotate: -10, scale: 0.9 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  transition: { duration: 0.6, ease: customEase }
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: customEase }
};

export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: customEase }
};

export const slideInFromBottom = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: customEase }
};

export const slideInFromTop = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: customEase }
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

export const staggerContainerSlow = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: customEase
    }
  }
};

export const staggerItemScale = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: springEase
    }
  }
};

export const staggerItemSlide = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: customEase
    }
  }
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: customEase
    }
  }
};

export const scaleInBounce = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  }
};

export const scaleInElastic = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

export const popIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: [0.5, 1.1, 1],
    transition: {
      duration: 0.5,
      times: [0, 0.7, 1],
      ease: customEase
    }
  }
};

// ============================================
// BUTTON ANIMATIONS
// ============================================

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2, ease: 'easeOut' }
};

export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

export const buttonGlow = {
  scale: 1.05,
  boxShadow: '0 0 30px rgba(250, 204, 21, 0.6)',
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const buttonPulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const magneticButton = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardHover = {
  y: -8,
  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const cardHover3D = {
  y: -10,
  rotateX: 5,
  rotateY: 5,
  boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
  transition: { duration: 0.4, ease: 'easeOut' }
};

export const cardFloat = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const cardGlow = {
  y: -8,
  boxShadow: '0 20px 40px rgba(250, 204, 21, 0.2)',
  borderColor: 'rgba(250, 204, 21, 0.5)',
  transition: { duration: 0.3, ease: 'easeOut' }
};

// ============================================
// ICON ANIMATIONS
// ============================================

export const iconHover = {
  y: -3,
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const iconRotate = {
  rotate: [0, -10, 10, -10, 0],
  transition: { duration: 0.5 }
};

export const iconScale = {
  scale: 1.1,
  rotate: 5,
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const iconBounce = {
  y: [0, -8, 0],
  transition: {
    duration: 0.6,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const iconPulse = {
  scale: [1, 1.2, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const iconSpin = {
  rotate: 360,
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'linear'
  }
};

export const iconWiggle = {
  rotate: [0, -15, 15, -15, 15, 0],
  transition: {
    duration: 0.6,
    ease: 'easeInOut'
  }
};

export const iconFloat = {
  y: [0, -5, 0],
  rotate: [0, 5, 0, -5, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: customEase }
};

export const pageSlide = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.4, ease: customEase }
};

export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const pageScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
  transition: { duration: 0.4, ease: customEase }
};

// ============================================
// TEXT ANIMATIONS
// ============================================

export const textReveal = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: customEase }
};

export const textFadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: customEase }
};

export const letterAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 }
};

export const wordAnimation = {
  initial: { opacity: 0, y: 20, rotateX: -90 },
  animate: { opacity: 1, y: 0, rotateX: 0 }
};

// ============================================
// CONTINUOUS ANIMATIONS
// ============================================

export const float = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const floatSlow = {
  y: [0, -10, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const floatRotate = {
  y: [0, -15, 0],
  rotate: [0, 5, 0, -5, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const pulse = {
  scale: [1, 1.05, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const pulseGlow = {
  scale: [1, 1.02, 1],
  boxShadow: [
    '0 0 0 0 rgba(250, 204, 21, 0)',
    '0 0 20px 10px rgba(250, 204, 21, 0.3)',
    '0 0 0 0 rgba(250, 204, 21, 0)'
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const shimmer = {
  x: ['-100%', '100%'],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'linear',
    repeatDelay: 1
  }
};

export const breathe = {
  scale: [1, 1.03, 1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const wave = {
  rotate: [0, 14, -8, 14, -4, 10, 0],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// ============================================
// PARALLAX ANIMATIONS
// ============================================

export const parallaxSlow = {
  y: [0, -50],
  transition: {
    duration: 1,
    ease: 'linear'
  }
};

export const parallaxFast = {
  y: [0, -100],
  transition: {
    duration: 1,
    ease: 'linear'
  }
};

// ============================================
// BACKGROUND ANIMATIONS
// ============================================

export const gradientShift = {
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  transition: {
    duration: 10,
    repeat: Infinity,
    ease: 'linear'
  }
};

export const backgroundPulse = {
  opacity: [0.5, 0.8, 0.5],
  scale: [1, 1.1, 1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// ============================================
// PARTICLE ANIMATIONS
// ============================================

export const particleFloat = (delay: number = 0) => ({
  y: [0, -30, 0],
  x: [0, 10, 0],
  opacity: [0.3, 0.8, 0.3],
  transition: {
    duration: 4 + Math.random() * 2,
    repeat: Infinity,
    ease: 'easeInOut',
    delay
  }
});

export const particleDrift = (delay: number = 0) => ({
  y: [0, -100],
  x: [0, Math.random() * 50 - 25],
  opacity: [0, 1, 0],
  transition: {
    duration: 5 + Math.random() * 3,
    repeat: Infinity,
    ease: 'easeOut',
    delay
  }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

export const scrollReveal = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: customEase }
};

export const scrollRevealLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: customEase }
};

export const scrollRevealRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: customEase }
};

export const scrollRevealScale = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: springEase }
};

// ============================================
// LOADING ANIMATIONS
// ============================================

export const spinnerRotate = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: 'linear'
  }
};

export const dotsLoading = {
  y: [0, -10, 0],
  transition: {
    duration: 0.6,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const progressBar = {
  scaleX: [0, 1],
  transition: {
    duration: 2,
    ease: 'easeInOut'
  }
};

// ============================================
// NOTIFICATION ANIMATIONS
// ============================================

export const notificationSlide = {
  initial: { opacity: 0, x: 100, scale: 0.9 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 100, scale: 0.9 },
  transition: { duration: 0.3, ease: customEase }
};

export const notificationPop = {
  initial: { opacity: 0, scale: 0.5, y: -20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.5, y: -20 },
  transition: { type: 'spring', stiffness: 500, damping: 25 }
};

// ============================================
// MODAL ANIMATIONS
// ============================================

export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
  transition: { duration: 0.3, ease: customEase }
};

export const modalSlideUp = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
  transition: { duration: 0.4, ease: customEase }
};

// ============================================
// COUNTER ANIMATIONS
// ============================================

export const counterReveal = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: springEase }
};

// ============================================
// DRAW ANIMATIONS (for SVG paths)
// ============================================

export const drawPath = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 2, ease: 'easeInOut' }
};

export const drawPathFast = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 1, ease: 'easeOut' }
};

// ============================================
// FLIP ANIMATIONS
// ============================================

export const flipIn = {
  initial: { opacity: 0, rotateY: -90 },
  animate: { opacity: 1, rotateY: 0 },
  transition: { duration: 0.6, ease: customEase }
};

export const flipOut = {
  initial: { opacity: 1, rotateY: 0 },
  exit: { opacity: 0, rotateY: 90 },
  transition: { duration: 0.6, ease: customEase }
};

// ============================================
// BLUR ANIMATIONS
// ============================================

export const blurIn = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.6, ease: customEase }
};

export const blurOut = {
  initial: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(10px)' },
  transition: { duration: 0.4, ease: customEase }
};

// ============================================
// SPRING PHYSICS PRESETS
// ============================================

export const springBouncy = {
  type: 'spring',
  stiffness: 400,
  damping: 10
};

export const springGentle = {
  type: 'spring',
  stiffness: 120,
  damping: 14
};

export const springStiff = {
  type: 'spring',
  stiffness: 600,
  damping: 30
};

export const springWobbly = {
  type: 'spring',
  stiffness: 180,
  damping: 12
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const createStaggerDelay = (index: number, baseDelay: number = 0.1) => ({
  delay: index * baseDelay
});

export const createRandomDelay = (maxDelay: number = 0.5) => ({
  delay: Math.random() * maxDelay
});

export const createSequenceAnimation = (animations: any[], durations: number[]) => {
  let totalDuration = 0;
  return animations.map((anim, index) => {
    const delay = totalDuration;
    totalDuration += durations[index] || 0.5;
    return { ...anim, transition: { ...anim.transition, delay } };
  });
};
