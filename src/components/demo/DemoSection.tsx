import React from 'react';
import { motion } from 'framer-motion';
import SpacedRepetitionChart from './SpacedRepetitionChart';
import MasteryPieChart from './MasteryPieChart';
import ProgressRing from './ProgressRing';

const DemoSection: React.FC = () => {
  return (
    <section className="py-20 relative" id="demo">
      {/* Background glow effects */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Track Your Progress</h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Visualize your learning journey with powerful analytics designed to optimize your study habits 
            and maximize knowledge retention.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 card-shadow"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Study Activity Heatmap</h3>
            <SpacedRepetitionChart />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 card-shadow h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-white">Mastery Levels</h3>
              <div className="flex items-center justify-center h-[200px]">
                <MasteryPieChart />
              </div>
            </motion.div>
            
            <motion.div
              className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 card-shadow h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-white">Overall Progress</h3>
              <div className="flex items-center justify-center h-[200px]">
                <ProgressRing value={72} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;