import React, { useState } from "react";
import { useMenu } from "../Context/menuContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCreditCard, FiTruck, FiTag, FiShoppingCart, FiArrowLeft, FiMapPin, FiShoppingBag } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

export default function Payment() {
  const { cartItems, updateCartItemQuantity, setCartItems } = useMenu();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    phone: ""
  });

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isProcessing, setIsProcessing] = useState(false);

  const validCoupons = ["yba24", "yy21", "bb20", "aa21", "gg21", "toka"];

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!address.street || !address.city || !address.phone) {
      toast.error("Please fill all required address fields", {
        style: {
          background: '#1F2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
      return false;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        style: {
          background: '#1F2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    if (paymentMethod === "bank") {
      navigate("/payment-process", {
        state: {
          orderDetails: {
            items: cartItems,
            address,
            subtotal: subtotal,
            discount: subtotal * discount,
            total: discountedTotal
          }
        }
      });
    } else {
      // Simulate API call for cash on delivery
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCartItems([]);
      toast.success("Order placed successfully! Cash on Delivery", {
        style: {
          background: '#1F2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
      navigate("/order-confirmation", {
        state: {
          orderDetails: {
            items: cartItems,
            address,
            subtotal: subtotal,
            discount: subtotal * discount,
            total: discountedTotal,
            paymentMethod: "Cash on Delivery"
          }
        }
      });
    }
    setIsProcessing(false);
  };

  const handleApplyCoupon = () => {
    if (validCoupons.includes(couponCode.toLowerCase())) {
      setDiscount(0.1);
      toast.success("Coupon applied successfully! 10% discount added.", {
        style: {
          background: '#1F2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code. Please try again.", {
        style: {
          background: '#1F2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountedTotal = subtotal - (subtotal * discount);

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="bottom-right" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/menu")}
          className="flex items-center text-red-500 hover:text-red-400 mb-8 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Menu
        </motion.button>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-extrabold text-white mb-8"
        >
          Check<span className="text-red-500">out</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            <div className="flex items-center mb-6">
              <div className="p-2 bg-gray-700 rounded-full mr-3">
                <FiMapPin className="text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-white">Delivery Information</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Street Address*</label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Apartment, floor, etc. (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  value={address.apartment}
                  onChange={handleAddressChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Town/City*</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            <div className="flex items-center mb-6">
              <div className="p-2 bg-gray-700 rounded-full mr-3">
                <FiShoppingCart className="text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-white">Order Summary</h2>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center py-4 text-gray-400">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-700">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              <FiShoppingBag className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-white">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-600 rounded-md">
                          <button
                            type="button"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 text-gray-300"
                          >
                            -
                          </button>
                          <span className="mx-2 w-6 text-center text-white">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 text-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-white w-20 text-right">{(item.price * item.quantity).toFixed(2)} EGP</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-white">{subtotal.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500 font-medium">
                      <span>Discount (10%):</span>
                      <span>-{(subtotal * discount).toFixed(2)} EGP</span>
                    </div>
                  )}
                  <div className="border-t border-gray-700 my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-red-500">{discountedTotal.toFixed(2)} EGP</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gray-700 rounded-full mr-3">
                      <FiCreditCard className="text-red-500" />
                    </div>
                    <h3 className="font-bold text-white">Payment Method</h3>
                  </div>
                  <div className="space-y-3 ml-11">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                        className="form-radio text-red-500 border-gray-600 focus:ring-red-500"
                      />
                      <span className="text-gray-300">Bank Transfer</span>
                      <div className="flex gap-2 ml-4">
                        <img src="WhatsApp Image 2025-03-22 at 12.20.43 AM.jpeg" alt="Visa" className="w-10 h-auto" />
                        <img src="WhatsApp Image 2025-03-22 at 12.11.45 AM.jpeg" alt="MasterCard" className="w-10 h-auto" />
                        <img src="WhatsApp Image 2025-03-22 at 12.20.35 AM.jpeg" alt="Meeza" className="w-10 h-auto" />
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        className="form-radio text-red-500 border-gray-600 focus:ring-red-500"
                      />
                      <span className="text-gray-300">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gray-700 rounded-full mr-3">
                      <FiTag className="text-red-500" />
                    </div>
                    <h3 className="font-bold text-white">Coupon Code</h3>
                  </div>
                  <div className="flex gap-2 ml-11">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="bg-red-600 text-white px-4 py-3 rounded-md hover:bg-red-700 transition-colors"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </motion.button>
                  </div>
                </div>

                {/* Place Order Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePlaceOrder}
                  disabled={cartItems.length === 0 || isProcessing}
                  className={`w-full bg-red-600 text-white p-4 rounded-md font-bold text-lg ${cartItems.length === 0 || isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                    }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}