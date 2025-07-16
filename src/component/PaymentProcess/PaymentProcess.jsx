import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCreditCard, FiArrowLeft, FiLock, FiCalendar, FiUser } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { useMenu } from "../Context/menuContext";

export default function PaymentProcess() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setCartItems } = useMenu();
    const { orderDetails } = location.state || {};
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        number: "",
        expiry: "",
        cvv: "",
        name: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Format card number with spaces every 4 digits
        if (name === "number") {
            const formattedValue = value
                .replace(/\s/g, "")
                .match(/.{1,4}/g)
                ?.join(" ")
                .substr(0, 19) || "";
            setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
        }
        // Format expiry date with slash
        else if (name === "expiry") {
            const formattedValue = value
                .replace(/\D/g, "")
                .replace(/^(\d{2})/, "$1/")
                .substr(0, 5);
            setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
        }
        // Limit CVV to 3-4 digits
        else if (name === "cvv") {
            const formattedValue = value.replace(/\D/g, "").substr(0, 4);
            setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
        }
        else {
            setCardDetails(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Validate card details
        if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
            toast.error("Please fill all card details", {
                style: {
                    background: '#1F2937',
                    color: '#fff',
                    border: '1px solid #374151'
                }
            });
            setIsProcessing(false);
            return;
        }

        // Validate card number length (16 digits without spaces)
        if (cardDetails.number.replace(/\s/g, "").length !== 16) {
            toast.error("Please enter a valid 16-digit card number", {
                style: {
                    background: '#1F2937',
                    color: '#fff',
                    border: '1px solid #374151'
                }
            });
            setIsProcessing(false);
            return;
        }

        // Validate expiry date
        const [month, year] = cardDetails.expiry.split("/");
        if (!month || !year || month.length !== 2 || year.length !== 2) {
            toast.error("Please enter a valid expiry date (MM/YY)", {
                style: {
                    background: '#1F2937',
                    color: '#fff',
                    border: '1px solid #374151'
                }
            });
            setIsProcessing(false);
            return;
        }

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Clear the cart after successful payment
        setCartItems([]);

        // On successful payment
        toast.success("Payment successful!", {
            style: {
                background: '#1F2937',
                color: '#fff',
                border: '1px solid #374151'
            }
        });

        navigate("/order-confirmation", {
            state: {
                orderDetails: {
                    ...orderDetails,
                    paymentMethod: "Bank Transfer",
                    transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`,
                    date: new Date().toISOString()
                }
            },
            replace: true // Prevent going back to payment page
        });
    };

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">No order details found</h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/payment")}
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Back to Payment
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="bottom-right" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center text-red-500 hover:text-red-400 mb-8 transition-colors"
                >
                    <FiArrowLeft className="mr-2" />
                    Back to Payment
                </motion.button>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-extrabold text-white mb-8"
                >
                    Complete <span className="text-red-500">Payment</span>
                </motion.h1>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8 bg-gray-700/50 rounded-lg border border-gray-700 p-6"
                    >
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                            <FiCreditCard className="text-red-500 mr-2" />
                            Order Summary
                        </h2>
                        <div className="space-y-3 text-gray-300">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="text-white">{orderDetails.subtotal.toFixed(2)} EGP</span>
                            </div>
                            {orderDetails.discount > 0 && (
                                <div className="flex justify-between text-green-500">
                                    <span>Discount:</span>
                                    <span>-{orderDetails.discount.toFixed(2)} EGP</span>
                                </div>
                            )}
                            <div className="border-t border-gray-600 my-2"></div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span className="text-red-500">{orderDetails.total.toFixed(2)} EGP</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-gray-300 mb-2">Card Number</label>
                            <div className="relative">
                                <FiCreditCard className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="text"
                                    name="number"
                                    value={cardDetails.number}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                    maxLength={19}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Expiry Date</label>
                                <div className="relative">
                                    <FiCalendar className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={cardDetails.expiry}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                        maxLength={5}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">CVV</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-3 text-gray-500" />
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={cardDetails.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                        maxLength={4}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2">Cardholder Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="text"
                                    name="name"
                                    value={cardDetails.name}
                                    onChange={handleInputChange}
                                    placeholder="Name on card"
                                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Payment Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full bg-red-600 text-white p-4 rounded-md font-bold text-lg ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                                }`}
                        >
                            {isProcessing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing Payment...
                                </span>
                            ) : (
                                `Pay ${orderDetails.total.toFixed(2)} EGP`
                            )}
                        </motion.button>

                        {/* Security Info */}
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-4">
                            <FiLock className="text-green-500" />
                            <span>Your payment is secured with 256-bit encryption</span>
                        </div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
}