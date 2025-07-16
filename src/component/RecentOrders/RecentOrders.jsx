import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiClock, FiRotateCw, FiEye, FiHome, FiShoppingCart } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useMenu } from '../Context/menuContext';

const RecentOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useMenu();

    useEffect(() => {
        const fetchOrders = () => {
            try {
                const savedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
                setOrders(savedOrders);
            } catch (error) {
                toast.error('Failed to load orders', {
                    style: {
                        background: '#1F2937',
                        color: '#fff',
                        border: '1px solid #374151'
                    }
                });
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleReorder = (order) => {
        order.items.forEach(item => {
            addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: item.quantity
            });
        });

        toast.success(`${order.items.length} items added to cart!`, {
            style: {
                background: '#1F2937',
                color: '#fff',
                border: '1px solid #374151'
            },
            icon: <FiShoppingCart className="text-red-500" />
        });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
                <Toaster position="bottom-right" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto bg-gray-800 rounded-xl p-8 border border-gray-700 text-center"
                >
                    <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiShoppingBag className="text-red-500 text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">No orders yet</h2>
                    <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/menu')}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-300 inline-flex items-center mx-auto"
                    >
                        <FiHome className="mr-2" />
                        Start Shopping
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
            <Toaster position="bottom-right" />
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-extrabold text-white mb-8"
                >
                    Your <span className="text-red-500">Order History</span>
                </motion.h1>

                <AnimatePresence>
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300"
                            >
                                <div className="p-6 border-b border-gray-700">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                        <div>
                                            <h3 className="font-bold text-white">
                                                Order #{order.orderId || `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`}
                                            </h3>
                                            <p className="text-sm text-gray-400 flex items-center mt-1">
                                                <FiClock className="mr-1" />
                                                Placed on {formatDate(order.date || new Date().toISOString())}
                                            </p>
                                        </div>
                                        <div className="mt-3 sm:mt-0">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered' ? 'bg-green-900/50 text-green-400 border border-green-800' :
                                                    order.status === 'Cancelled' ? 'bg-red-900/50 text-red-400 border border-red-800' :
                                                        'bg-yellow-900/50 text-yellow-400 border border-yellow-800'
                                                }`}>
                                                {order.status || 'Processing'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 border-b border-gray-700">
                                    {order.items.map((item, itemIndex) => (
                                        <motion.div
                                            key={itemIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: itemIndex * 0.05 }}
                                            className="flex py-4"
                                        >
                                            <div className="w-20 h-20 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                        <FiShoppingBag className="h-8 w-8" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <h4 className="font-medium text-white">{item.name}</h4>
                                                <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                                                <p className="text-red-500 font-medium mt-1">{(item.price * item.quantity).toFixed(2)} EGP</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                    <div className="mb-4 sm:mb-0">
                                        <p className="text-gray-400">Total: <span className="font-bold text-lg text-white">{order.total.toFixed(2)} EGP</span></p>
                                        <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleReorder(order)}
                                            className="px-4 py-2 border border-red-600 text-red-400 rounded-md hover:bg-gray-700 transition-colors flex items-center"
                                        >
                                            <FiRotateCw className="mr-2" />
                                            Reorder
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate(`/order-details/${order.orderId || index}`)}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center"
                                        >
                                            <FiEye className="mr-2" />
                                            View Details
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RecentOrders;