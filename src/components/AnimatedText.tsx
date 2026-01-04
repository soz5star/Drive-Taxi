import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: 'words' | 'characters' | 'lines' | 'typewriter' | 'gradient' | 'wave' | 'bounce';
  delay?: number;
  duration?: number;
  once?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerChildren: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerChildren,
      delayChildren: custom.delayChildren
    }
  })
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const characterVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const typewriterVariants: Variants = {
  hidden: { opacity: 0, width: 0 },
  visible: {
    opacity: 1,
    width: 'auto',
    transition: {
      duration: 0.05
    }
  }
};

const waveVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const bounceVariants: Variants = {
  hidden: { opacity: 0, y: -50, scale: 0.5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  }
};

export default function AnimatedText({
  text,
  className = '',
  variant = 'words',
  delay = 0,
  duration = 0.05,
  once = true,
  tag = 'div'
}: AnimatedTextProps) {
  const Tag = tag;
  const words = text.split(' ');
  const characters = text.split('');

  if (variant === 'gradient') {
    return (
      <motion.div
        className={`relative inline-block ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent bg-[length:200%_auto]"
          animate={{
            backgroundPosition: ['0% center', '200% center']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {text}
        </motion.span>
      </motion.div>
    );
  }

  if (variant === 'typewriter') {
    return (
      <motion.div
        className={`overflow-hidden ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
      >
        <motion.span
          variants={{
            hidden: { width: 0 },
            visible: {
              width: 'auto',
              transition: {
                duration: text.length * 0.05,
                delay,
                ease: 'linear'
              }
            }
          }}
          className="inline-block whitespace-nowrap overflow-hidden"
          style={{ borderRight: '2px solid currentColor' }}
        >
          {text}
        </motion.span>
      </motion.div>
    );
  }

  if (variant === 'wave') {
    return (
      <Tag className={className}>
        {characters.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={waveVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
            className="inline-block"
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </Tag>
    );
  }

  if (variant === 'bounce') {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        custom={{ staggerChildren: duration, delayChildren: delay }}
      >
        {characters.map((char, i) => (
          <motion.span
            key={i}
            variants={bounceVariants}
            className="inline-block"
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (variant === 'characters') {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        custom={{ staggerChildren: duration, delayChildren: delay }}
        style={{ perspective: 1000 }}
      >
        {characters.map((char, i) => (
          <motion.span
            key={i}
            variants={characterVariants}
            className="inline-block"
            style={{ 
              display: char === ' ' ? 'inline' : 'inline-block',
              transformStyle: 'preserve-3d'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // Default: words
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      custom={{ staggerChildren: 0.1, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Animated Heading Component
interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4;
  delay?: number;
  animate?: boolean;
}

export function AnimatedHeading({
  children,
  className = '',
  level = 2,
  delay = 0,
  animate = true
}: AnimatedHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  if (!animate) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}

// Animated Paragraph Component
interface AnimatedParagraphProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedParagraph({
  children,
  className = '',
  delay = 0
}: AnimatedParagraphProps) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.p>
  );
}

// Highlight Text Component
interface HighlightTextProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function HighlightText({
  children,
  className = '',
  color = 'yellow-400'
}: HighlightTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className={`absolute bottom-0 left-0 h-3 bg-${color}/30 -z-0`}
        variants={{
          hidden: { width: 0 },
          visible: {
            width: '100%',
            transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }
          }
        }}
      />
    </motion.span>
  );
}

// Counting Number Component
interface CountingNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountingNumber({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  className = ''
}: CountingNumberProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {prefix}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  );
}
