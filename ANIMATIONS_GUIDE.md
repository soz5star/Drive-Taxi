# DriveTaxi Advanced Animations Guide

## 🎬 Overview

This document provides a comprehensive guide to all the advanced animation components integrated into the DriveTaxi website. The animations are built using **Framer Motion**, a powerful React animation library that provides smooth, performant animations with spring physics.

---

## 📦 Animation Components

### 1. **AnimatedIcon.tsx**
Versatile icon component with multiple animation effects.

**Features:**
- 10+ continuous animation variants (bounce, pulse, spin, float, wiggle, glow, morph, wave, breathe, shake)
- Hover effects (scale, rotate, flip, bounce, glow, shake)
- Container with background and border
- Ring icon with expanding ripple effect
- Badge icon with number indicators
- Morphing icon with shape transitions

**Usage:**
```tsx
import AnimatedIcon, { RingIcon, BadgeIcon, MorphingIcon } from '@/components/AnimatedIcon';
import { Car } from 'lucide-react';

// Basic animated icon
<AnimatedIcon 
  icon={Car} 
  variant="bounce" 
  hoverEffect="scale"
  size={24}
/>

// Ring icon with ripple effect
<RingIcon icon={Car} size={24} />

// Badge icon with number
<BadgeIcon icon={Car} badge={5} />
```

---

### 2. **ScrollProgress.tsx**
Visual indicators showing scroll progress and position.

**Features:**
- Circular progress indicator (bottom-right)
- Dot indicators (right side)
- Line progress bar (top/bottom/left/right)
- Scroll-to-top button with progress circle
- Section indicator for navigation

**Usage:**
```tsx
import ScrollProgress, { ScrollToTop, SectionIndicator } from '@/components/ScrollProgress';

// Progress bar at top
<ScrollProgress variant="bar" position="top" />

// Circular progress
<ScrollProgress variant="circle" showPercentage={true} />

// Scroll to top button
<ScrollToTop showAfter={300} />

// Section indicator
<SectionIndicator sections={['Home', 'Services', 'Pricing']} activeSection={0} />
```

---

### 3. **MagneticButton.tsx**
Buttons with magnetic cursor-following and advanced hover effects.

**Features:**
- Magnetic effect that follows cursor
- Multiple button variants (primary, secondary, outline, ghost, gradient)
- Glow on hover
- Ripple effect on click
- CTA button with animated arrow
- Glowing button with animated border
- Pulsing button for important actions
- Icon button with hover reveal text
- Shimmer and fill animations

**Usage:**
```tsx
import MagneticButton, { CTAButton, GlowingButton, PulsingButton } from '@/components/MagneticButton';

// Magnetic button
<MagneticButton variant="primary" magneticStrength={0.3}>
  Book Now
</MagneticButton>

// CTA with arrow
<CTAButton to="/book">Get Started</CTAButton>

// Glowing button
<GlowingButton href="/contact">Contact Us</GlowingButton>

// Pulsing button
<PulsingButton onClick={handleClick}>Important Action</PulsingButton>
```

---

### 4. **Card3D.tsx**
3D cards with tilt, flip, and advanced hover effects.

**Features:**
- 3D tilt effect on mouse move
- Glare effect on hover
- Float animation
- Flip cards (front/back)
- Stacked cards layout
- Glassmorphism cards
- Gradient border cards
- Hover reveal cards

**Usage:**
```tsx
import Card3D, { FlipCard, StackedCards, GlassCard, GradientBorderCard, HoverRevealCard } from '@/components/Card3D';

// 3D tilt card
<Card3D tiltStrength={15} glareEffect={true}>
  <div className="p-6">Card content</div>
</Card3D>

// Flip card
<FlipCard 
  front={<div>Front</div>} 
  back={<div>Back</div>} 
/>

// Glass card
<GlassCard blur={10}>
  <div>Frosted glass effect</div>
</GlassCard>

// Hover reveal card
<HoverRevealCard 
  title="Service" 
  description="Description"
  image="/image.jpg"
/>
```

---

### 5. **FloatingElements.tsx**
Decorative animated elements for backgrounds.

**Features:**
- Floating particles (circles, icons, dots, lines, mixed)
- Decorative shapes with continuous motion
- Grid pattern backgrounds
- Noise texture overlays
- Animated spotlight effects
- Parallax-like floating behavior

**Usage:**
```tsx
import FloatingElements, { DecorativeShapes, GridPattern, NoiseTexture, Spotlight } from '@/components/FloatingElements';

// Floating circles
<FloatingElements variant="circles" count={15} />

// Floating icons
<FloatingElements variant="icons" count={8} />

// Decorative shapes
<DecorativeShapes />

// Grid pattern
<GridPattern size={40} />

// Spotlight effect
<Spotlight />
```

---

### 6. **AnimatedCounter.tsx**
Animated number counters and statistics.

**Features:**
- Smooth number counting animation
- Stat cards with icons
- Progress bars (linear and circular)
- Number ticker effect
- Customizable duration and formatting
- Scroll-triggered animation

**Usage:**
```tsx
import AnimatedCounter, { StatCard, AnimatedProgress, CircularProgress, StatsRow } from '@/components/AnimatedCounter';
import { Users } from 'lucide-react';

// Counter
<AnimatedCounter value={1000} prefix="$" suffix="k" duration={2} />

// Stat card
<StatCard 
  icon={Users} 
  value={1000} 
  label="Happy Customers"
/>

// Progress bar
<AnimatedProgress value={75} max={100} label="Satisfaction" />

// Circular progress
<CircularProgress value={85} max={100} showValue={true} />
```

---

### 7. **PageTransition.tsx**
Page and section transition animations.

**Features:**
- Multiple transition variants (fade, slide, scale, slideUp, reveal, curtain)
- Page loader overlay
- Section transitions with direction
- Staggered children animations
- Reveal on scroll with mask
- Parallax wrapper

**Usage:**
```tsx
import PageTransition, { PageLoader, SectionTransition, StaggerWrapper, RevealOnScroll } from '@/components/PageTransition';

// Page transition
<PageTransition variant="slideUp">
  <YourPage />
</PageTransition>

// Page loader
<PageLoader isLoading={loading} />

// Section transition
<SectionTransition direction="up" delay={0.2}>
  <Section />
</SectionTransition>

// Stagger wrapper
<StaggerWrapper staggerDelay={0.1}>
  {items.map(item => <Item key={item.id} />)}
</StaggerWrapper>

// Reveal on scroll
<RevealOnScroll>
  <Content />
</RevealOnScroll>
```

---

### 8. **AnimatedSection.tsx**
Flexible section animations with multiple variants.

**Features:**
- 6+ animation variants (fade, slide, scale, blur, spring, bounce)
- Direction control (up, down, left, right)
- Staggered container animations
- Split text reveal
- Mask reveal animations
- Animated lists

**Usage:**
```tsx
import AnimatedSection, { AnimatedContainer, AnimatedItem, SplitReveal, MaskReveal } from '@/components/AnimatedSection';

// Animated section
<AnimatedSection variant="scale" direction="up" delay={0.2}>
  <Content />
</AnimatedSection>

// Staggered container
<AnimatedContainer staggerDelay={0.1}>
  {items.map(item => <div key={item}>{item}</div>)}
</AnimatedContainer>

// Split text reveal
<SplitReveal text="Welcome to Drive Taxi" />

// Mask reveal
<MaskReveal direction="left">
  <Content />
</MaskReveal>
```

---

### 9. **AnimatedCard.tsx**
Enhanced card components with animations.

**Features:**
- Multiple hover effects (lift, glow, tilt, scale, border)
- Feature cards with icons
- Service cards with badges
- Pricing cards with highlights
- Testimonial cards with ratings

**Usage:**
```tsx
import AnimatedCard, { FeatureCard, ServiceCard, PricingCard, TestimonialCard } from '@/components/AnimatedCard';

// Feature card
<FeatureCard 
  icon={<Icon />}
  title="Feature"
  description="Description"
/>

// Service card
<ServiceCard 
  icon={<Icon />}
  title="Service"
  description="Description"
  features={['Feature 1', 'Feature 2']}
  popular={true}
/>

// Pricing card
<PricingCard 
  title="Plan"
  price="$99"
  features={['Feature 1', 'Feature 2']}
  cta="Get Started"
/>

// Testimonial card
<TestimonialCard 
  quote="Great service!"
  author="John Doe"
  role="Customer"
  rating={5}
/>
```

---

### 10. **AnimatedButton.tsx**
Enhanced button components with animations.

**Features:**
- Arrow buttons with animated arrows
- Shimmer button effects
- Fill buttons with animation
- Bouncing buttons
- Icon-only buttons
- Social media buttons

**Usage:**
```tsx
import AnimatedButton, { ArrowButton, ShimmerButton, FillButton, BouncingButton } from '@/components/AnimatedButton';

// Arrow button
<ArrowButton to="/book">Book Now</ArrowButton>

// Shimmer button
<ShimmerButton href="/contact">Contact</ShimmerButton>

// Fill button
<FillButton onClick={handleClick}>Click Me</FillButton>

// Bouncing button
<BouncingButton to="/services">Explore</BouncingButton>
```

---

### 11. **Header.tsx**
Enhanced header with animations.

**Features:**
- Animated header with scroll-based opacity
- Staggered navigation items
- Mobile menu with smooth animations
- Animated logo with shimmer
- Scroll progress indicator
- Active link highlighting with layout animation
- Hover effects on all interactive elements

---

### 12. **Footer.tsx**
Enhanced footer with animations.

**Features:**
- Animated background elements
- Staggered content sections
- Hover effects on links
- Contact icons with animations
- Scroll-to-top button
- Animated dividers and underlines
- Pulsing heart icon

---

### 13. **HowItWorks.tsx**
Process/steps component with multiple layouts.

**Features:**
- 4 layout variants (default, compact, vertical, timeline)
- Animated step numbers
- Connector arrows with animation
- Timeline lines with staggered reveal
- Pulsing icon effects
- Hover animations on steps

---

### 14. **TrustBadges.tsx**
Trust badges and feature lists.

**Features:**
- 4 badge layout variants (default, compact, detailed, floating)
- Floating animations with shadows
- Stat badges with counters
- Feature list with checkmarks
- Rotating icons and shimmer effects

---

### 15. **Testimonials.tsx**
Testimonials with multiple layouts.

**Features:**
- 4 layout variants (carousel, grid, highlights, single)
- Auto-play carousel with progress bar
- Animated star ratings
- Slide transitions with spring physics
- Marquee scrolling testimonials
- Navigation dots and arrows

---

## 🎨 Animation Principles

### Timing
- **Fast animations**: 0.2-0.3s (hover effects, micro-interactions)
- **Medium animations**: 0.5-0.7s (section reveals, transitions)
- **Slow animations**: 1-2s+ (continuous effects, parallax)

### Easing
- **Standard**: `[0.22, 1, 0.36, 1]` (smooth, natural feel)
- **Spring**: `type: 'spring', stiffness: 300, damping: 15` (bouncy, playful)
- **Linear**: For continuous rotations and scrolling effects

### Stagger
- **Stagger delay**: 0.05-0.15s between children
- **Container delay**: 0.1-0.3s before children start

---

## 🚀 Performance Tips

1. **Use `once: true` on scroll triggers** - Animations only trigger once
2. **Set `margin: '-50px'` on viewport** - Trigger animations before elements are visible
3. **Limit simultaneous animations** - Use stagger to spread animations over time
4. **Use `will-change` CSS** - For frequently animated elements
5. **Disable animations on mobile** - Use media queries for performance

---

## 🎯 Best Practices

1. **Keep animations under 1 second** - Except for continuous effects
2. **Use spring physics** - For more natural, interactive feel
3. **Provide visual feedback** - Hover, focus, and active states
4. **Test on various devices** - Ensure smooth performance
5. **Accessibility first** - Respect `prefers-reduced-motion`
6. **Consistent timing** - Use same easing across similar animations

---

## 📱 Responsive Animations

Most animations automatically scale to mobile:
- Reduced movement on smaller screens
- Faster animations on touch devices
- Simplified effects on low-power devices

---

## 🔧 Customization

All components accept customization props:
- `delay` - Stagger animation start
- `duration` - Animation length
- `variant` - Animation style
- `className` - Custom styling
- `once` - Trigger animation once or repeatedly

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Best Practices](https://www.framer.com/motion/guide-animation-basics/)
- [Spring Physics](https://www.framer.com/motion/guide-animation-types/)

---

## 🐛 Troubleshooting

**Animations not triggering?**
- Check `useInView` is properly imported
- Verify element is in viewport
- Check `once: true` setting

**Animations too slow/fast?**
- Adjust `duration` prop
- Modify `stiffness` and `damping` for springs
- Check `delay` values

**Performance issues?**
- Reduce animation count
- Use `will-change` CSS
- Profile with DevTools
- Consider disabling on mobile

---

Generated: January 2026
