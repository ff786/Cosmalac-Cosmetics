import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    calculateCartQuantity,
    calculateCartTotal,
} from "../utils/helpers";

import { STORAGE_KEYS } from "../utils/constants";
import { CartContext } from "./CartContextValue";

const getStoredCart = () => {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const storedCart = localStorage.getItem(
            STORAGE_KEYS.CART
        );

        return storedCart ? JSON.parse(storedCart) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] =
        useState(getStoredCart);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        localStorage.setItem(
            STORAGE_KEYS.CART,
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    image: product.image,
                    quantity,
                },
            ];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== productId
            )
        );
    };

    const updateQuantity = (productId, quantity) => {
        const parsedQuantity = Number(quantity);

        if (parsedQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: parsedQuantity,
                    }
                    : item
            )
        );
    };

    const incrementQuantity = (productId) => {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    const decrementQuantity = (productId) => {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === productId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const isInCart = (productId) => {
        return cartItems.some(
            (item) => item.id === productId
        );
    };

    const getItemQuantity = (productId) => {
        const item = cartItems.find(
            (cartItem) => cartItem.id === productId
        );

        return item?.quantity || 0;
    };

    const cartTotal = calculateCartTotal(cartItems);
    const cartQuantity = calculateCartQuantity(cartItems);

    const value = useMemo(
        () => ({
            cartItems,
            cartTotal,
            cartQuantity,

            addToCart,
            removeFromCart,
            updateQuantity,
            incrementQuantity,
            decrementQuantity,
            clearCart,

            isInCart,
            getItemQuantity,
        }),
        [cartItems, cartTotal, cartQuantity, isInCart, getItemQuantity]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
