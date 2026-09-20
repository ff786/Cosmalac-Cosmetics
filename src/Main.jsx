import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AppProvider } from "./context/AppContext";
import { CartProvider } from "./context/CartContext";

import "./styles/variables.css";
import "./styles/typography.css";
import "./styles/global.css";
import "./styles/components.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <BrowserRouter>
            <AppProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </AppProvider>
        </BrowserRouter>
    </React.StrictMode>
);