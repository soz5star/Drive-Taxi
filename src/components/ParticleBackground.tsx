import AnimatedBackground from './AnimatedBackground';
import { useReducedMotion } from '../hooks/useReducedMotion';

// ParticleBackground is now a lightweight wrapper around AnimatedBackground
// to maintain backward compatibility while eliminating code duplication
export default function ParticleBackground() {
  const prefersReducedMotion = useReducedMotion();
  
  // Return empty div if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }
  
  return <AnimatedBackground variant="particles" particleCount={30} />;
}
