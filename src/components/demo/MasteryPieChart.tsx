import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const MasteryPieChart: React.FC = () => {
  // Mock data for mastery levels
  const initialData = [
    { name: 'Mastered', value: 45, color: '#00c2b3' }, // secondary
    { name: 'Learning', value: 35, color: '#7209b7' }, // primary
    { name: 'Needs Review', value: 20, color: '#f72585' }, // accent
  ];
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(initialData.map(item => ({ ...item, value: 0 })));
  
  React.useEffect(() => {
    // Animate the chart data
    const timeout = setTimeout(() => {
      setIsLoaded(true);
      
      // Animate each slice one by one
      initialData.forEach((item, index) => {
        setTimeout(() => {
          setData(prev => {
            const newData = [...prev];
            newData[index] = { ...initialData[index] };
            return newData;
          });
        }, index * 300);
      });
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Custom tooltip
  const renderTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-800 p-2 rounded-md shadow-lg border border-neutral-700">
          <p className="text-sm font-medium text-white">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            animationDuration={800}
            animationBegin={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
        </PieChart>
      </ResponsiveContainer>
      
      {!isLoaded && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div 
            className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </motion.div>
      )}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.5 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-2xl font-bold gradient-text">
            {data.length > 0 ? data[0].value : 0}%
          </div>
          <div className="text-xs text-neutral-400">Mastered</div>
        </motion.div>
      </div>
    </div>
  );
};

export default MasteryPieChart;