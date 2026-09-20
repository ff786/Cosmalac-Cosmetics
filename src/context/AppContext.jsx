import {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openMobileMenu = () => {
        setIsMobileMenuOpen(true);
        document.body.classList.add("menu-open");
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.classList.remove("menu-open");
    };

    const toggleMobileMenu = () => {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    };

    const openModal = (modalName, data = null) => {
        setActiveModal({
            name: modalName,
            data,
        });
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const openProduct = (product) => {
        setSelectedProduct(product);
    };

    const closeProduct = () => {
        setSelectedProduct(null);
    };

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
        [
            isMobileMenuOpen,
            activeModal,
            selectedProduct,
        ]
    );

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "useApp must be used inside an AppProvider"
        );
    }

    return context;
};

export default AppContext;