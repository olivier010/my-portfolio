import React from 'react';
import { motion } from 'framer-motion';

const scrollRevealVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
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
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;