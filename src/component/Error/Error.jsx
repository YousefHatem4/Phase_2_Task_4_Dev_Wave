import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import img from '/public/rafiki.png';
import { FiHome, FiFrown } from 'react-icons/fi';

export default function Error() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 max-w-md w-full"
      >
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <FiFrown className="text-red-500 text-5xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img
              src={img}
              alt="Error illustration"
              className="w-full max-w-xs mx-auto pb-6"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              404 - Page Not Found
            </h2>
            <p className="text-gray-400 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              <FiHome className="mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full filter blur-xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-xl"></div>
        </div>
      </motion.div>
    </div>
  );
}