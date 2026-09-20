import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Navigation from "./Navigation";
import useScrollPosition from "../../hooks/useScrollPosition";
import { useApp } from "../../context/AppContext";

const Header = () => {
    const { y } = useScrollPosition();
    const {
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
    } = useApp();
    const navigate = useNavigate();

    const scrolled = y > 40;

    const handleLogoClick = (event) => {
        event.preventDefault();
        closeMobileMenu();

        if (window.location.pathname !== "/") {
            navigate("/");
            return;
        }

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.history.replaceState(null, "", "/");

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: reducedMotion ? "auto" : "smooth",
        });
    };

    return (
        <header
            className={[
                "nuvia-header",
                scrolled ? "nuvia-header--scrolled" : "",
                isMobileMenuOpen ? "nuvia-header--menu-open" : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="container nuvia-header__inner">
                <Link
                    to="/"
                    className="nuvia-header__logo"
                    aria-label="Cosmalac — return to home"
                    onClick={handleLogoClick}
                >
                    <span className="nuvia-header__logo-name">
                        COSMALAC
                    </span>
                    <span className="nuvia-header__logo-est">
                        EST. 2016
                    </span>
                </Link>

                <Navigation />

                <div className="nuvia-header__actions">
                    <Link
                        to="/wholesale"
                        className="nuvia-header__inquiry"
                        onClick={closeMobileMenu}
                    >
                        <span>Wholesale Inquiry</span>
                        <ArrowRight size={16} aria-hidden="true" />
                    </Link>

                    <button
                        type="button"
                        className="nuvia-header__mobile-toggle"
                        onClick={toggleMobileMenu}
                        aria-label={
                            isMobileMenuOpen
                                ? "Close navigation"
                                : "Open navigation"
                        }
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="cosmalac-mobile-menu"
                    >
                        {isMobileMenuOpen ? (
                            <X size={20} aria-hidden="true" />
                        ) : (
                            <Menu size={20} aria-hidden="true" />
                        )}
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;
