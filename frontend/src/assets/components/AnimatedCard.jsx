import React, { useState } from 'react';
import { motion } from 'framer-motion';
import img from '../img/city.jpg';
import { FaSearch } from "react-icons/fa";

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
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`);
    };

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
                    Sketch your coordinates.
                </motion.p>

                {/* Search Bar */}
                <motion.form 
                    variants={itemVariants} 
                    style={styles.searchForm}
                    onSubmit={handleSearch}
                >
                    <div className="relative w-full max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 rounded-full bg-gray-100 text-gray-800 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-500 transition-all duration-300 focus:shadow"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition"
                        >
                            <FaSearch />
                        </button>
                    </div>
                </motion.form>
            </motion.div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '70vh',
        background: `
            linear-gradient(135deg, rgba(222, 226, 225, 0.9), rgba(255, 255, 255, 0.64)),
            url(${img}) center/cover no-repeat
        `,
        color: 'rgba(0, 0, 0, 1)',
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
    searchForm: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
    }
};

export default LandingPage;
