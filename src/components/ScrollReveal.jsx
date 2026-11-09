// src/components/ScrollReveal.jsx
import React from 'react';
import { motion } from 'framer-motion';

const scrollRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ScrollReveal = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={className}
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 'some', margin: '0px 0px -30px 0px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
