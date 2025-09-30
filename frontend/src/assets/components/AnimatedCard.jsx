import React from 'react';
import { motion } from 'framer-motion';
import img from '../img/city.jpg'
const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
            duration: 0.6,
            ease: 'easeOut'
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const LandingPage = () => {
    return (
        <div style={styles.page}>
            <motion.div
                style={styles.hero}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h1 variants={itemVariants} style={styles.heading}>
                    Welcome to <span style={styles.highlight}>pook</span>
                </motion.h1>
                <motion.p variants={itemVariants} style={styles.subtext}>
                  sketch your coordinates. 
                </motion.p>
               
            </motion.div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '50vh',
         background: `
      linear-gradient(135deg, rgba(222, 226, 225, 0.9), rgba(255, 255, 255, 0.64)),
      url(${img}) center/cover no-repeat
    `,  
        color:  `rgba(0, 0, 0, 1)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
    },
    hero: {
        textAlign: 'center',
        maxWidth: '700px'
    },
    heading: {
        fontSize: '3rem',
        marginBottom: '1rem',
        fontWeight: 'bold'
    },
    highlight: {
        color: '#FFD700'
    },
    subtext: {
        fontSize: '1.25rem',
        marginBottom: '2rem'
    },
    button: {
        backgroundColor: '#FFD700',
        color: '#1e3c72',
        padding: '0.75rem 2rem',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        display: 'inline-block',
        transition: 'all 0.3s ease'
    }
};

export default LandingPage;
