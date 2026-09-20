/* =========================================================
   Cosmalac — HELPERS
   ========================================================= */

export const formatPrice = (
    amount,
    currency = "USD",
    locale = "en-US"
) => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
};

export const truncateText = (text, maxLength = 120) => {
    if (!text || text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trim()}...`;
};

export const slugify = (value = "") => {
    return value
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

export const calculateCartTotal = (items = []) => {
    return items.reduce((total, item) => {
        return total + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);
};

export const calculateCartQuantity = (items = []) => {
    return items.reduce((total, item) => {
        return total + Number(item.quantity || 0);
    }, 0);
};

export const getDiscountedPrice = (price, discountPercentage = 0) => {
    if (!discountPercentage) {
        return Number(price);
    }

    return Number(price) * (1 - Number(discountPercentage) / 100);
};

export const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};

export const scrollToElement = (id, offset = 0) => {
    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
    });
};

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

export const getInitials = (name = "") => {
    return name
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

export const generateId = (prefix = "id") => {
    return `${prefix}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;
};

export const debounce = (callback, delay = 300) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};

export const capitalize = (value = "") => {
    if (!value) {
        return "";

    }

    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getAverageRating = (reviews = []) => {
    if (!reviews.length) {
        return 0;
    }

    const total = reviews.reduce(
        (sum, review) => sum + Number(review.rating || 0),
        0
    );

    return Number((total / reviews.length).toFixed(1));
};

export const isBrowser = () => {
    return typeof window !== "undefined";
};