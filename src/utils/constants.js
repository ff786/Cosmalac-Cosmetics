export const APP_NAME = "Cosmalac";

export const NAVIGATION_ITEMS = [
    { label: "Products", path: "/products" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/", hash: "#benefits" },
    { label: "Contact Us", path: "/", hash: "#wholesale" },
];

export const SOCIAL_LINKS = {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
};

export const CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";

export const PRODUCT_CATEGORIES = {
    CLEANSER: "cleanser",
    SERUM: "serum",
    MOISTURIZER: "moisturizer",
    SUNSCREEN: "sunscreen",
};

export const TREATMENT_CATEGORIES = {
    ANTI_AGING: "anti-aging",
    ACNE: "acne-care",
    BRIGHTENING: "brightening",
};

export const TREATMENT_SERVICES = [
    {
        id: "anti-aging-care",
        title: "Anti-Aging Care",
        description: "A gentle professional treatment designed to refresh mature and sensitive skin.",
        duration: "60 min",
        price: 85,
        category: TREATMENT_CATEGORIES.ANTI_AGING,
    },
    {
        id: "acne-care",
        title: "Targeted Acne Care",
        description: "A targeted treatment focused on reducing breakouts while supporting the skin barrier.",
        duration: "50 min",
        price: 75,
        category: TREATMENT_CATEGORIES.ACNE,
    },
    {
        id: "brightening-facial",
        title: "Brightening Facial",
        description: "A radiance-focused facial designed to leave skin looking fresh, hydrated and luminous.",
        duration: "60 min",
        price: 90,
        category: TREATMENT_CATEGORIES.BRIGHTENING,
    },
];

export const FAQ_ITEMS = [
    {
        question: "Which skin types can use Cosmalac products?",
        answer: "Our collection is designed with gentle, skin-conscious formulas suitable for a variety of skin types. We recommend checking each product's ingredients and usage instructions before adding it to your routine.",
    },
    {
        question: "How long does it take to see results?",
        answer: "Results vary depending on the product, your skin and how consistently you use your routine. Hydration can often be noticed quickly, while concerns such as uneven tone and texture generally require consistent care over time.",
    },
    {
        question: "How do I choose the right products?",
        answer: "Start by identifying your primary skin concern and building a simple routine around cleansing, hydration and daily sun protection. Our team can also help guide you toward suitable products.",
    },
    {
        question: "Are professional treatments suitable for sensitive skin?",
        answer: "Treatments are selected according to individual skin needs. During your consultation, our skincare professional will assess your skin and recommend an appropriate treatment approach.",
    },
    {
        question: "Are your products cruelty-free?",
        answer: "We are committed to building a thoughtful skincare collection with responsible ingredient and product-development practices.",
    },
];

export const ROUTES = {
    HOME: "/",
    PRODUCTS: "/products",
    ABOUT: "/about",
    SERVICES: "/#benefits",
    CONTACT: "/#wholesale",
};

export const STORAGE_KEYS = {
    CART: "cosmalac-cart",
    APP: "cosmalac-app",
};

export const BREAKPOINTS = {
    MOBILE: 767,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE: 1200,
};

export const API_ENDPOINTS = {
    PRODUCTS: "/api/products",
    ORDERS: "/api/orders",
    CONTACT: "/api/contact",
    NEWSLETTER: "/api/newsletter",
    BOOKINGS: "/api/bookings",
};