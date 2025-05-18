import React, { useState } from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { motion } from 'framer-motion';

const SpacedRepetitionChart: React.FC = () => {
  // Mock data for the chart
  const generateData = () => {
    const categories = ['Biology', 'Physics', 'Chemistry', 'Math', 'History'];
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    
    return days.map(day => {
      const result: any = { day: `Day ${day}` };
      
      categories.forEach(category => {
        // Generate a value that mimics spaced repetition pattern
        // More reviews in the beginning, fewer as time goes on
        const base = Math.max(0, 10 - Math.floor(day / 3));
        const random = Math.floor(Math.random() * 5);
        result[category] = base + random;
      });
      
      return result;
    });
  };

  const [data] = useState(generateData());
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  const colors = {
    Biology: '#7209b7', // primary
    Physics: '#00c2b3', // secondary
    Chemistry: '#f72585', // accent
    Math: '#4cc9f0',
    History: '#f8961e',
  };
  
  const handleMouseEnter = (category: string) => {
    setHoveredCategory(category);
  };
  
  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };
  
  return (
    <div className="w-full h-[300px]">
      <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
        {Object.entries(colors).map(([category, color]) => (
          <motion.div
            key={category}
            className="flex items-center cursor-pointer"
            onMouseEnter={() => handleMouseEnter(category)}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
          >
            <div 
              className="w-3 h-3 rounded-full mr-1" 
              style={{ backgroundColor: color }}
            />
            <span className={`text-xs ${
              hoveredCategory === category ? 'text-white' : 'text-neutral-400'
            } transition-colors`}>
              {category}
            </span>
          </motion.div>
        ))}
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            {Object.entries(colors).map(([category, color]) => (
              <linearGradient key={category} id={`gradient-${category}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
          <XAxis 
            dataKey="day" 
            tick={{ fill: '#a3a3a3', fontSize: 10 }} 
            tickFormatter={(value) => value.replace('Day ', '')}
            interval={6}
          />
          <YAxis tick={{ fill: '#a3a3a3', fontSize: 10 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#262626', 
              border: 'none', 
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)' 
            }}
            labelStyle={{ color: '#f5f5f5', fontWeight: 'bold', marginBottom: '4px' }}
            itemStyle={{ fontSize: '12px' }}
          />
          
          {Object.entries(colors).map(([category, color]) => (
            <Area
              key={category}
              type="monotone"
              dataKey={category}
              stroke={color}
              fillOpacity={1}
              fill={`url(#gradient-${category})`}
              strokeWidth={hoveredCategory === category ? 3 : 1.5}
              style={{
                opacity: hoveredCategory && hoveredCategory !== category ? 0.3 : 1,
                transition: 'opacity 0.3s, stroke-width 0.3s',
              }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpacedRepetitionChart;