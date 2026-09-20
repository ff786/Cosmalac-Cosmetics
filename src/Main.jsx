import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AppProvider } from "./context/AppContext";
import { CartProvider } from "./context/CartContext";

import { initLenis } from "./utils/lenis";

import "./styles/variables.css";
import "./styles/typography.css";
import "./styles/global.css";
import "./styles/components.css";

const scrollToHash = () => {
    const hash = window.location.hash;

    if (!hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    const target = document.querySelector(hash);

    if (!target) return;

    const headerOffset = window.innerWidth <= 767 ? 72 : 88;
    const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

    window.scrollTo({
        top,
        behavior: "smooth",
    });
};

const ScrollManager = () => {
    React.useEffect(() => {
        const handleRouteReady = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(scrollToHash);
            });
        };

        window.addEventListener("popstate", handleRouteReady);
        window.addEventListener("hashchange", handleRouteReady);

        handleRouteReady();

        return () => {
            window.removeEventListener("popstate", handleRouteReady);
            window.removeEventListener("hashchange", handleRouteReady);
        };
    }, []);

    return null;
};

initLenis();

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <BrowserRouter>
            <AppProvider>
                <CartProvider>
                    <ScrollManager />
                    <App />
                </CartProvider>
            </AppProvider>
        </BrowserRouter>
    </React.StrictMode>
);