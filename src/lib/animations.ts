// Custom easing functions
export const customEase = [0.22, 1, 0.36, 1];
export const elasticEase = [0.34, 1.56, 0.64, 1];
export const smoothEase = [0.4, 0, 0.2, 1];
export const snappyEase = [0.68, -0.55, 0.265, 1.55];

// ============ ENTRANCE ANIMATIONS ============

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
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: customEase }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: customEase }
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: customEase }
};

// ============ ADVANCED ENTRANCE ANIMATIONS ============

export const bounceInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: elasticEase }
};

export const bounceInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: elasticEase }
};

export const rotateInUp = {
  initial: { opacity: 0, y: 40, rotate: -20 },
  animate: { opacity: 1, y: 0, rotate: 0 },
  transition: { duration: 0.7, ease: customEase }
};

export const rotateInDown = {
  initial: { opacity: 0, y: -40, rotate: 20 },
  animate: { opacity: 1, y: 0, rotate: 0 },
  transition: { duration: 0.7, ease: customEase }
};

export const zoomIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: customEase }
};

export const zoomInRotate = {
  initial: { opacity: 0, scale: 0.5, rotate: -180 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: { duration: 0.8, ease: elasticEase }
};

export const flipInX = {
  initial: { opacity: 0, rotateY: -90 },
  animate: { opacity: 1, rotateY: 0 },
  transition: { duration: 0.7, ease: customEase }
};

export const flipInY = {
  initial: { opacity: 0, rotateX: -90 },
  animate: { opacity: 1, rotateX: 0 },
  transition: { duration: 0.7, ease: customEase }
};

// ============ STAGGER ANIMATIONS ============

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
      delayChildren: 0.15
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

export const staggerItemRotate = {
  initial: { opacity: 0, y: 20, rotate: -10 },
  animate: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: customEase
    }
  }
};

// ============ SCALE & ZOOM ANIMATIONS ============

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
      duration: 0.7,
      ease: elasticEase
    }
  }
};

// ============ HOVER ANIMATIONS ============

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2, ease: 'easeOut' }
};

export const buttonHoverAdvanced = {
  scale: 1.08,
  y: -3,
  boxShadow: '0 20px 40px rgba(250, 204, 21, 0.3)',
  transition: { duration: 0.3, ease: customEase }
};

export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

export const cardHover = {
  y: -8,
  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const cardHoverAdvanced = {
  y: -12,
  scale: 1.02,
  boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
  transition: { duration: 0.4, ease: customEase }
};

export const cardHover3D = {
  y: -10,
  rotateX: 5,
  rotateY: 5,
  boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
  transition: { duration: 0.4, ease: customEase }
};

// ============ ICON ANIMATIONS ============

export const iconHover = {
  y: -3,
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const iconHoverBounce = {
  y: -8,
  scale: 1.15,
  transition: { duration: 0.4, ease: elasticEase }
};

export const iconRotate = {
  rotate: [0, -10, 10, -10, 0],
  transition: { duration: 0.5 }
};

export const iconRotateFull = {
  rotate: [0, 360],
  transition: { duration: 0.8, ease: 'linear' }
};

export const iconScale = {
  scale: 1.1,
  rotate: 5,
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const iconPulse = {
  scale: [1, 1.2, 1],
  transition: { duration: 0.6, repeat: Infinity }
};

export const iconFloat = {
  y: [0, -10, 0],
  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
};

// ============ PAGE TRANSITIONS ============

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: customEase }
};

export const pageTransitionFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 }
};

export const pageTransitionSlide = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.5, ease: customEase }
};

// ============ PARALLAX & SCROLL ANIMATIONS ============

export const parallaxUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: customEase }
};

export const parallaxDown = {
  initial: { opacity: 0, y: -60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: customEase }
};

export const revealLeft = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: customEase }
};

export const revealRight = {
  initial: { opacity: 0, x: 100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: customEase }
};

export const revealScale = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: customEase }
};

// ============ TEXT ANIMATIONS ============

export const textReveal = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: customEase }
};

export const textSlideIn = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: customEase }
};

// ============ FLOATING & CONTINUOUS ANIMATIONS ============

export const float = {
  y: [0, -20, 0],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
};

export const floatSlow = {
  y: [0, -15, 0],
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
};

export const floatFast = {
  y: [0, -25, 0],
  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
};

export const pulse = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity }
};

export const pulseSlow = {
  scale: [1, 1.03, 1],
  transition: { duration: 3, repeat: Infinity }
};

export const shimmer = {
  backgroundPosition: ['200% 0%', '-200% 0%'],
  transition: { duration: 3, repeat: Infinity, ease: 'linear' }
};

export const glow = {
  boxShadow: [
    '0 0 20px rgba(250, 204, 21, 0.3)',
    '0 0 40px rgba(250, 204, 21, 0.6)',
    '0 0 20px rgba(250, 204, 21, 0.3)'
  ],
  transition: { duration: 2, repeat: Infinity }
};

// ============ COMPLEX SEQUENCES ============

export const heroSequence = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: customEase,
      staggerChildren: 0.1
    }
  }
};

export const cardFlip = {
  initial: { rotateY: 0 },
  whileHover: { rotateY: 180 },
  transition: { duration: 0.6, ease: customEase }
};

export const expandCollapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.4, ease: customEase }
};

// ============ BACKGROUND ANIMATIONS ============

export const gradientShift = {
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  transition: { duration: 8, repeat: Infinity, ease: 'linear' }
};

export const gradientPulse = {
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
};

// ============ UTILITY ANIMATIONS ============

export const noAnimation = {
  transition: { duration: 0 }
};

export const instantAppear = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.1 }
};
