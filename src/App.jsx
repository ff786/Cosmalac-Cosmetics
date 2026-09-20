import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import WholesalePage from "./pages/WholesalePage";
import ContactPage from "./pages/ContactPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import { destroyLenis, initLenis } from "./utils/lenis";

const App = () => {
    const location = useLocation();

    useEffect(() => {
        const lenis = initLenis();

        const handleResize = () => {
            lenis?.resize();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            destroyLenis();
        };
    }, []);

    useEffect(() => {
        const lenis = initLenis();

        const getHeaderOffset = () => {
            const header = document.querySelector(".nuvia-header");
            const headerHeight = header?.offsetHeight || 0;
            return Math.max(headerHeight + 12, 72);
        };

        const scrollToHash = (hash) => {
            const target = document.querySelector(hash);

            if (!target) {
                return false;
            }

            const offset = getHeaderOffset();

            if (lenis) {
                lenis.scrollTo(target, {
                    offset: -offset,
                });
            } else {
                const reducedMotion = window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;
                const behavior = reducedMotion ? "auto" : "smooth";
                const top =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: Math.max(0, top),
                    left: 0,
                    behavior,
                });
            }

            return true;
        };

        if (location.hash) {
            const didScroll = scrollToHash(location.hash);

            if (!didScroll) {
                const timeoutId = window.setTimeout(() => {
                    scrollToHash(location.hash);
                }, 80);

                return () => window.clearTimeout(timeoutId);
            }
        } else if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [location.pathname, location.hash]);

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/products"
                    element={<ProductsPage />}
                />
                <Route
                    path="/about"
                    element={<AboutPage />}
                />
                <Route
                    path="/ContactUs"
                    element={<ContactPage />}
                />
                <Route
                    path="/contact"
                    element={<ContactPage />}
                />
                <Route
                    path="/wholesale"
                    element={<WholesalePage />}
                />
                <Route
                    path="/privacy"
                    element={<PrivacyPolicyPage />}
                />
                <Route
                    path="/terms"
                    element={<TermsPage />}
                />
            </Route>
        </Routes>
    );
};

export default App;