import AnimatedBackground from './AnimatedBackground';

// ParticleBackground is now a lightweight wrapper around AnimatedBackground
// to maintain backward compatibility while eliminating code duplication
export default function ParticleBackground() {
  return <AnimatedBackground variant="particles" particleCount={30} />;
}
