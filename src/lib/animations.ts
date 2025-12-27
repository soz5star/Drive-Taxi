export const customEase = [0.22, 1, 0.36, 1];

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

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
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

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2, ease: 'easeOut' }
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

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: customEase }
};
