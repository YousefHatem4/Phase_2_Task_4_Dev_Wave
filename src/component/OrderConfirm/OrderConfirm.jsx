import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiHome, FiClock, FiTruck, FiCreditCard } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

export default function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderDetails } = location.state || {};

    useEffect(() => {
        if (orderDetails) {
            const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
            const newOrder = {
                ...orderDetails,
                orderId: `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
                date: new Date().toISOString(),
                status: 'Processing'
            };
            localStorage.setItem('orderHistory', JSON.stringify([newOrder, ...orderHistory]));
        }
    }, [orderDetails]);

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">No order details found</h1>
                    <p className="text-gray-400 mb-6">Please place your order again</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const orderId = `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="bottom-right" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 md:p-8">
                    {/* Confirmation Header */}
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-center mb-8"
                    >
                        <div className="w-24 h-24 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiCheckCircle className="h-12 w-12 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Order <span className="text-green-500">Confirmed!</span>
                        </h1>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Thank you for your purchase! Your order is being processed and will be delivered soon.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-700/50 rounded-lg border border-gray-700 p-6"
                        >
                            <div className="flex items-center mb-6">
                                <div className="p-2 bg-gray-700 rounded-full mr-3">
                                    <FiClock className="text-red-500" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Order Summary</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Order Number:</span>
                                    <span className="font-medium text-white">{orderId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Date:</span>
                                    <span className="font-medium text-white">
                                        {new Date().toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Status:</span>
                                    <span className="font-medium text-yellow-500">Processing</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Payment Method:</span>
                                    <span className="font-medium text-white flex items-center gap-1">
                                        {orderDetails.paymentMethod === "Cash on Delivery" ? (
                                            <>
                                                <FiCreditCard className="text-red-500" /> Cash on Delivery
                                            </>
                                        ) : (
                                            <>
                                                <FiCreditCard className="text-red-500" /> Bank Transfer
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className="pt-4 mt-4 border-t border-gray-600">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Total Amount:</span>
                                        <span className="text-2xl font-bold text-red-500">
                                            {orderDetails.total.toFixed(2)} EGP
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Delivery Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-700/50 rounded-lg border border-gray-700 p-6"
                        >
                            <div className="flex items-center mb-6">
                                <div className="p-2 bg-gray-700 rounded-full mr-3">
                                    <FiTruck className="text-red-500" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Delivery Information</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-gray-400 mb-1">Delivery Address</h3>
                                    <p className="text-white">
                                        {orderDetails.address.street}
                                        {orderDetails.address.apartment && `, ${orderDetails.address.apartment}`}
                                        <br />
                                        {orderDetails.address.city}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 mb-1">Contact</h3>
                                    <p className="text-white">{orderDetails.address.phone}</p>
                                </div>
                                <div className="pt-4 mt-4 border-t border-gray-600">
                                    <h3 className="text-gray-400 mb-2">Estimated Delivery</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-white">
                                            {new Date(Date.now() + 3600000 * 2).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                            {' - '}
                                            {new Date(Date.now() + 3600000 * 3).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Order Items */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 bg-gray-700/50 rounded-lg border border-gray-700 p-6"
                    >
                        <h2 className="text-xl font-bold text-white mb-6">Order Items</h2>
                        <div className="space-y-4">
                            {orderDetails.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-600">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-600">
                                                    <FiHome className="h-5 w-5" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <span className="font-medium text-white block">{item.name}</span>
                                            <span className="text-gray-400 text-sm">Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <span className="font-bold text-white">
                                        {(item.price * item.quantity).toFixed(2)} EGP
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Back to Home Button */}
                    <motion.div
                        className="mt-8 text-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <button
                            onClick={() => navigate('/')}
                            className="bg-red-600 text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                        >
                            <FiHome className="h-5 w-5" />
                            Back to Home
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}