import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useMenu } from '../Context/menuContext';
import { FiShoppingCart, FiClock, FiLoader } from 'react-icons/fi';
import { FaHamburger, FaPizzaSlice, FaUtensils } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Menu() {
  const {
    menuItems = [],
    activeCategory = 'all',
    loading,
    error,
    categories: contextCategories,
    setActiveCategory,
    addToCart
  } = useMenu();

  const [localLoading, setLocalLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Default categories if not provided by context
  const defaultCategories = [
    { name: "all", icon: <FaUtensils className="mr-2" /> },
    { name: "burger", icon: <FaHamburger className="mr-2" /> },
    { name: "pizza", icon: <FaPizzaSlice className="mr-2" /> },
    { name: "pasta", icon: <FiUtensils className="mr-2" /> }
  ];

  // Use context categories if available, otherwise fallback to default
  const categories = contextCategories
    ? Array.isArray(contextCategories)
      ? contextCategories.map(cat => typeof cat === 'string' ? { name: cat } : cat)
      : defaultCategories
    : defaultCategories;

  useEffect(() => {
    if (!isFirstLoad) {
      setLocalLoading(true);
      const timer = setTimeout(() => setLocalLoading(false), 500);
      return () => clearTimeout(timer);
    }
    setIsFirstLoad(false);
  }, [activeCategory]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      style: {
        background: '#1F2937',
        color: '#fff',
        border: '1px solid #374151'
      },
      icon: '🛒',
      position: 'bottom-right'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Menu Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-white text-center mb-4"
          >
            Our <span className="text-red-500">Menu</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
          >
            Explore our delicious selection of dishes made with the finest ingredients
          </motion.p>

          {/* Category Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {categories.map((category) => {
              const categoryName = category.name || category;
              const categoryIcon = category.icon ||
                (categoryName === 'burger' ? <FaHamburger className="mr-2" /> :
                  categoryName === 'pizza' ? <FaPizzaSlice className="mr-2" /> :
                    categoryName === 'pasta' ? <FiUtensils className="mr-2" /> :
                      <FaUtensils className="mr-2" />);

              return (
                <motion.button
                  key={categoryName}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(categoryName)}
                  className={`cursor-pointer px-4 py-2 rounded-full flex items-center text-sm font-medium transition-colors ${activeCategory === categoryName
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  {categoryIcon}
                  {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Menu Items */}
          {(loading || localLoading) ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FiLoader className="inline-block animate-spin text-red-500 text-4xl" />
              <p className="mt-4 text-gray-400">Loading menu items...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-red-900/50 border border-red-700 rounded-md p-4 max-w-md mx-auto">
                <p className="text-red-400">{error}</p>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="h-48 bg-gray-700 flex items-center justify-center p-4 overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-red-500 font-bold">{item.price} EGP</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                        >
                          <FiShoppingCart />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We're constantly adding new items to our menu. Check back soon for more delicious options!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-lg transition duration-300 inline-flex items-center"
          >
            Back to Top <FiClock className="ml-2" />
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}

// Fallback icon if FiUtensils is not available
function FiUtensils(props) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
      <path d="M7 2v20"></path>
      <path d="M21 15V2a10 10 0 0 0-4 8v5a4 4 0 0 0 4 4z"></path>
    </svg>
  );
}