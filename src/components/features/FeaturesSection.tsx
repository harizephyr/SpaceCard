import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import FeatureCard from './FeatureCard';
import { Brain, Calendar, BarChart3 } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const features = [
    {
      id: 1,
      title: 'Spaced Repetition Science',
      description: 'Our algorithm optimizes your learning by showing cards right before you would forget them, leveraging proven cognitive science.',
      icon: <Brain className="w-12 h-12 text-primary" />,
      delay: 0,
    },
    {
      id: 2,
      title: 'Smart Scheduling',
      description: 'Study less, learn more with intelligent scheduling that adapts to your performance and optimizes review intervals.',
      icon: <Calendar className="w-12 h-12 text-secondary" />,
      delay: 0.2,
    },
    {
      id: 3,
      title: 'Detailed Analytics',
      description: 'Track your progress with comprehensive statistics and visualizations that help you understand your learning patterns.',
      icon: <BarChart3 className="w-12 h-12 text-accent" />,
      delay: 0.4,
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  return (
    <section className="py-20 bg-neutral-900 relative" id="features">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Supercharge Your Learning</h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Our scientifically optimized features work together to help you learn faster, 
            remember longer, and master any subject with confidence.
          </p>
        </motion.div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;