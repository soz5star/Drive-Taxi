import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface AnimatedLinkProps {
  children: ReactNode;
  to?: string;
  href?: string;
  className?: string;
  scaleOnHover?: boolean;
}

export default function AnimatedLink({
  children,
  to,
  href,
  className = '',
  scaleOnHover = true
}: AnimatedLinkProps) {
  const animationProps = scaleOnHover ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 }
  } : {};

  if (to) {
    return (
      <motion.div
        className="inline-block"
        {...animationProps}
      >
        <Link to={to} className={className}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={href}
      className={className}
      {...animationProps}
    >
      {children}
    </motion.a>
  );
}
