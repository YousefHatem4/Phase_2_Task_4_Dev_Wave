import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const MenuContext = createContext();

export function MenuProvider({ children }) {
    const [menuItems, setMenuItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const categories = ["all", "burger", "pizza", "pasta"];

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
                console.error('Error fetching menu items:', err);
                setError('Failed to load menu items.');
                setMenuItems([]); // Ensure menuItems is always an array
            } finally {
                setLoading(false);
            }
        }

        fetchMenuItems();
    }, [activeCategory]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const updateCartItemQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <MenuContext.Provider value={{
            menuItems,
            activeCategory,
            loading,
            error,
            categories,
            cartItems,
            setActiveCategory,
            addToCart,
            updateCartItemQuantity,
            setCartItems
        }}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    return useContext(MenuContext);
}