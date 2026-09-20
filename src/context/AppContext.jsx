import {
    useEffect,
    useMemo,
    useState,
} from "react";

import { initLenis } from "../utils/lenis";

import { AppContext } from "./AppContextValue";

export const AppProvider = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;
        const lenis = initLenis();

        if (isMobileMenuOpen) {
            body.classList.add("menu-open");
            html.classList.add("menu-open");
            lenis?.stop();
        } else {
            body.classList.remove("menu-open");
            html.classList.remove("menu-open");
            lenis?.start();
        }

        return () => {
            body.classList.remove("menu-open");
            html.classList.remove("menu-open");
            lenis?.start();
        };
    }, [isMobileMenuOpen]);

    const openMobileMenu = () => setIsMobileMenuOpen(true);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((open) => !open);
    };

    const openModal = (modalName, data = null) => {
        setActiveModal({
            name: modalName,
            data,
        });
    };

    const closeModal = () => setActiveModal(null);

    const openProduct = (product) => setSelectedProduct(product);
    const closeProduct = () => setSelectedProduct(null);

    const value = useMemo(
        () => ({
            isMobileMenuOpen,
            activeModal,
            selectedProduct,
            openMobileMenu,
            closeMobileMenu,
            toggleMobileMenu,
            openModal,
            closeModal,
            openProduct,
            closeProduct,
        }),
        [isMobileMenuOpen, activeModal, selectedProduct]
    );

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

