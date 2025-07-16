import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiClock, FiArrowLeft, FiHome, FiShoppingCart, FiTruck, FiCreditCard, FiMapPin } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useMenu } from '../Context/menuContext';

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useMenu();

    useEffect(() => {
        const fetchOrder = () => {
            try {
                const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
                const foundOrder = orderHistory.find(o => o.orderId === orderId || o.id === orderId);

                if (foundOrder) {
                    setOrder(foundOrder);
                } else {
                    navigate('/recent-orders', { replace: true });
                }
            } catch (error) {
                toast.error('Failed to load order details', {
                    style: {
                        background: '#1F2937',
                        color: '#fff',
                        border: '1px solid #374151'
                    }
                });
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, navigate]);

    const handleReorder = () => {
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
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    if (!order) {
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
                    <h2 className="text-2xl font-bold text-white mb-4">Order not found</h2>
                    <p className="text-gray-400 mb-6">The requested order could not be located.</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/recent-orders')}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-300 inline-flex items-center mx-auto"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Orders
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
            <Toaster position="bottom-right" />
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center mb-8 cursor-pointer"
                    onClick={() => navigate('/recent-orders')}
                >
                    <FiArrowLeft className="text-red-500 mr-2" />
                    <span className="text-red-500 hover:text-red-400 transition-colors">Back to Orders</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
                >
                    <div className="p-6 border-b border-gray-700">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-2xl font-bold text-white mb-2"
                        >
                            Order <span className="text-red-500">Details</span>
                        </motion.h1>
                        <p className="text-gray-400 flex items-center">
                            <FiClock className="mr-2" />
                            {formatDate(order.date || new Date().toISOString())}
                        </p>
                    </div>

                    <div className="p-6 border-b border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-gray-700 rounded-full mr-3">
                                        <FiTruck className="text-red-500" />
                                    </div>
                                    <h3 className="font-bold text-white">Order Information</h3>
                                </div>
                                <div className="ml-11 space-y-2">
                                    <p className="text-gray-300">
                                        <span className="font-medium">Order #:</span> {order.orderId || `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`}
                                    </p>
                                    <p className="text-gray-300">
                                        <span className="font-medium">Status:</span>
                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${order.status === 'Delivered' ? 'bg-green-900/50 text-green-400 border border-green-800' :
                                            order.status === 'Cancelled' ? 'bg-red-900/50 text-red-400 border border-red-800' :
                                                'bg-yellow-900/50 text-yellow-400 border border-yellow-800'
                                            }`}>
                                            {order.status || 'Processing'}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-gray-700 rounded-full mr-3">
                                        <FiCreditCard className="text-red-500" />
                                    </div>
                                    <h3 className="font-bold text-white">Payment Information</h3>
                                </div>
                                <div className="ml-11 space-y-2">
                                    <p className="text-gray-300">
                                        <span className="font-medium">Method:</span> {order.paymentMethod || 'N/A'}
                                    </p>
                                    {order.transactionId && (
                                        <p className="text-gray-300">
                                            <span className="font-medium">Transaction ID:</span> {order.transactionId}
                                        </p>
                                    )}
                                    <p className="text-gray-300">
                                        <span className="font-medium">Total:</span> <span className="text-red-500 font-medium">{order.total?.toFixed(2) || '0.00'} EGP</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-b border-gray-700">
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-gray-700 rounded-full mr-3">
                                <FiShoppingBag className="text-red-500" />
                            </div>
                            <h3 className="font-bold text-white">Order Items</h3>
                        </div>

                        <AnimatePresence>
                            <div className="space-y-4 ml-11">
                                {order.items.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex py-3 border-b border-gray-700 last:border-b-0"
                                    >
                                        <div className="w-16 h-16 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                    <FiShoppingBag className="h-6 w-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h4 className="font-medium text-white">{item.name}</h4>
                                            <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                                            <p className="text-red-500 font-medium mt-1">{(item.price * item.quantity).toFixed(2)} EGP</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatePresence>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-gray-700 rounded-full mr-3">
                                <FiMapPin className="text-red-500" />
                            </div>
                            <h3 className="font-bold text-white">Delivery Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-11">
                            <div className="space-y-2">
                                <p className="text-gray-300">
                                    <span className="font-medium">Street:</span> {order.address?.street || 'N/A'}
                                </p>
                                {order.address?.apartment && (
                                    <p className="text-gray-300">
                                        <span className="font-medium">Apartment:</span> {order.address.apartment}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-300">
                                    <span className="font-medium">City:</span> {order.address?.city || 'N/A'}
                                </p>
                                <p className="text-gray-300">
                                    <span className="font-medium">Phone:</span> {order.address?.phone || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 flex justify-end"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReorder}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-300 inline-flex items-center"
                    >
                        <FiShoppingCart className="mr-2" />
                        Reorder All Items
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderDetails;