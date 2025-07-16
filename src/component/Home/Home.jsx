import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMenu } from "../Context/menuContext";
import toast, { Toaster } from 'react-hot-toast';
import { FiShoppingCart, FiClock, FiPercent } from 'react-icons/fi';
import { FaHamburger, FaPizzaSlice, FaUtensils } from 'react-icons/fa';

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useMenu();

  const categories = [
    { name: "all", icon: <FaUtensils className="mr-2" /> },
    { name: "burger", icon: <FaHamburger className="mr-2" /> },
    { name: "pizza", icon: <FaPizzaSlice className="mr-2" /> },
    { name: "pasta", icon: <FiUtensils className="mr-2" /> }
  ];

  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenuItems() {
      setLoading(true);
      setError(null);
      try {
        let url = "https://eldeeb.pythonanywhere.com/api/menu/items/";
        if (activeCategory !== "all") {
          url += `?category=${activeCategory}`;
        }
        const response = await axios.get(url);
        setMenuItems(response.data);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items. Please try again later.");
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, [activeCategory]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      style: {
        background: '#1F2937',
        color: '#fff',
        border: '1px solid #374151'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/50 z-10"></div>
        <div className="absolute inset-0 bg-[url('hero-bg.jpg')] bg-cover bg-center"></div>

        <div className="container mx-auto px-6 z-20 md:absolute left-30">
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
              Fast <span className="text-red-500">Food</span> Restaurant
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
              TripleBite brings you delicious, quick, and satisfying meals. From juicy burgers to crispy fries and fresh wraps, we deliver bold flavors with quality ingredients.
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="px-8 py-3 bg-red-600 cursor-pointer hover:bg-red-700 text-white font-medium rounded-md shadow-lg transition duration-300 flex items-center mx-auto md:mx-0"
            >
              Order Now <FiShoppingCart className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">
            Special <span className="text-red-500">Offers</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Offer 1 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300 flex flex-col sm:flex-row items-center">
              <div className="w-32 h-32 rounded-full  flex items-center justify-center mb-6 sm:mb-0 sm:mr-6">
                <img src="f7.png" className="w-full object-co" alt="" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Tasty Thursdays</h3>
                <p className="text-xl text-gray-300 mb-4">
                  <span className="text-red-500 font-bold">20%</span> Off
                </p>
                <button
                  onClick={() => navigate("/payment")}
                  className="px-6 py-2 bg-red-600 cursor-pointer hover:bg-red-700 text-white text-sm font-medium rounded-md transition duration-300"
                >
                  Order Now <FiShoppingCart className="inline ml-2" />
                </button>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300 flex flex-col sm:flex-row items-center">
              <div className="w-32 h-32 rounded-full  flex items-center justify-center mb-6 sm:mb-0 sm:mr-6">
                <img src="f6.png" alt="" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Pizza Days</h3>
                <p className="text-xl text-gray-300 mb-4">
                  <span className="text-red-500 font-bold">15%</span> Off
                </p>
                <button
                  onClick={() => navigate("/payment")}
                  className="px-6 cursor-pointer py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition duration-300"
                >
                  Order Now <FiShoppingCart className="inline ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white text-center mb-4">
            Our <span className="text-red-500">Menu</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Explore our delicious selection of dishes made with the finest ingredients
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`cursor-pointer px-4 py-2 rounded-full flex items-center text-sm font-medium transition-colors ${activeCategory === category.name
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
              >
                {category.icon}
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-400">Loading menu items...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-900/50 border border-red-700 rounded-md p-4 max-w-md mx-auto">
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800  rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="h-48 bg-gray-700 flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-red-500 font-bold">{item.price} EGP</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Ready to order your favorite food?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying our delicious meals delivered to your door.
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="px-8 cursor-pointer py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-lg transition duration-300 inline-flex items-center"
          >
            Browse Full Menu <FiShoppingCart className="ml-2" />
          </button>
        </div>
      </section>
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