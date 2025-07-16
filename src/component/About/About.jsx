import React from 'react';
import { motion } from 'framer-motion';
import img from '../../assets/about-img.png';
import { FiClock } from 'react-icons/fi';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            {/* Image Column */}
            <motion.div
              className="w-full lg:w-1/2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative rounded-xl overflow-hidden  hover:border-red-500 transition-all duration-300">
                <img
                  src={img}
                  alt="About Our Restaurant"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
              </div>
            </motion.div>

            {/* Text Column */}
            <div className="w-full lg:w-1/2">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6"
              >
                About <span className="text-red-500">Our Restaurant</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8"
              >
                Welcome to our culinary haven where passion meets flavor. Since our founding, we've dedicated ourselves to crafting exceptional dining experiences using only the finest ingredients and traditional techniques with a modern twist.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8"
              >
                Our team of talented chefs brings years of expertise to every dish, ensuring each bite tells a story of quality, creativity, and care. We source locally whenever possible to support our community and guarantee freshness.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <FiClock className="text-red-500 mr-2" /> Opening Hours
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex justify-between">
                    <span>Everyday</span>
                    <span>10:00 AM - 10:00 PM</span>
                  </li>
                 
                </ul>
              </motion.div>
            </div>
          </motion.div>
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
            Ready to experience our delicious food?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Visit us today and discover why we're the favorite choice for food lovers in the area.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-lg transition duration-300 inline-flex items-center"
          >
            View Our Menu <FiClock className="ml-2" />
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}