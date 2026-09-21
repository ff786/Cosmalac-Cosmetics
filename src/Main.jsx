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

import ScrollManager from "./components/common/ScrollManager";
import { LanguageProvider } from "./i18n/LanguageContext";

initLenis();

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <BrowserRouter>
            <LanguageProvider>
                <AppProvider>
                    <CartProvider>
                        <ScrollManager />
                        <App />
                    </CartProvider>
                </AppProvider>
            </LanguageProvider>
        </BrowserRouter>
    </React.StrictMode>
);