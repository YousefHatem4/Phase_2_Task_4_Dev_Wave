import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Us */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center justify-center md:justify-start text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Egypt
              </p>
              <p className="flex items-center justify-center md:justify-start text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +021140821819
              </p>
              <p className="flex items-center justify-center md:justify-start text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
               yousef.hatem.developer@gmail.com
              </p>
            </div>
          </div>

          {/* TastyBites Info */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">TripleBite</h3>
            <p className="text-gray-300 text-sm">
              Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              {['facebook-f', 'twitter', 'linkedin-in', 'instagram', 'pinterest'].map((icon) => (
                <Link
                  key={icon}
                  to="#"
                  className="text-gray-400 hover:text-red-600"
                >
                  <span className="sr-only">{icon}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <use xlinkHref={`/icons.svg#${icon}`} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Opening Hours */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">Opening Hours</h3>
            <div className="space-y-2">
              <p className="text-gray-300">Everyday</p>
              <p className="text-gray-300">10.00 AM - 10.00 PM</p>
            </div>
            <div className="mt-6">
              <Link
                to="/menu"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                View Our Menu
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2025. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0 text-center md:text-right">
            Made by Yousef_Hatem
          </p>
        </div>
      </div>
    </footer>
  );
}