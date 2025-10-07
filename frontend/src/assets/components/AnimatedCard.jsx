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
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 🔍 Search handler (fetches products)
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:5000/api/products?search=${searchQuery}`);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError('Something went wrong while searching.');
            console.error(err);
        } finally {
            setLoading(false);
        }
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

                {/* Loading / Error / Results */}
                <div className="mt-6">
                    {loading && <p className="text-gray-600">Searching...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    
                    {!loading && results.length > 0 && (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {results.map((product) => (
                                <motion.div 
                                    key={product._id} 
                                    className="bg-white rounded-xl shadow-md p-4 text-left hover:shadow-lg transition"
                                    variants={itemVariants}
                                >
                                    <img
                                        src={product.image || 'https://via.placeholder.com/150'}
                                        alt={product.name}
                                        className="w-full h-40 object-cover rounded-lg mb-2"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                                    <p className="font-bold text-green-700 mt-1">₹{product.price}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {!loading && results.length === 0 && searchQuery && !error && (
                        <p className="text-gray-600 mt-4">No products found for "{searchQuery}".</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
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
        maxWidth: '900px',
        width: '100%'
    },
    heading: {
        fontSize: '3rem',
        marginBottom: '1rem',
        fontWeight: 'bold'
    },
    highlight: {
        color: '#f3cf00ff'
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
