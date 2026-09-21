import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Navigation from "./Navigation";
import useScrollPosition from "../../hooks/useScrollPosition";
import { useApp } from "../../hooks/useApp";
import useLanguage from "../../hooks/useLanguage";

const Header = () => {
    const { y } = useScrollPosition();
    const {
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
    } = useApp();
    const navigate = useNavigate();
    const { language, changeLanguage, t } = useLanguage();

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
                    aria-label={t.header.homeAria}
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
                    <div className="nuvia-language-switcher">
                        <button
                            type="button"
                            className="nuvia-language-switcher__trigger"
                            aria-label={t.header.languageLabel}
                            aria-haspopup="listbox"
                        >
                            <span aria-hidden="true">
                                {language === "en" ? "🇬🇧" : "🇦🇪"}
                            </span>
                            <span>
                                {language === "en" ? "EN" : "ع"}
                            </span>
                            <span
                                className="nuvia-language-switcher__chevron"
                                aria-hidden="true"
                            >
                                ▾
                            </span>
                        </button>

                        <div
                            className="nuvia-language-switcher__menu"
                            role="listbox"
                            aria-label={t.header.languageLabel}
                        >
                            <button
                                type="button"
                                role="option"
                                aria-selected={language === "en"}
                                className="nuvia-language-switcher__option"
                                onClick={() => changeLanguage("en")}
                            >
                                <span aria-hidden="true">🇬🇧</span>
                                <span>EN</span>
                            </button>

                            <button
                                type="button"
                                role="option"
                                aria-selected={language === "ar"}
                                className="nuvia-language-switcher__option"
                                onClick={() => changeLanguage("ar")}
                            >
                                <span aria-hidden="true">🇦🇪</span>
                                <span>ع</span>
                            </button>
                        </div>
                    </div>

                    <Link
                        to="/wholesale"
                        className="nuvia-header__inquiry"
                        onClick={closeMobileMenu}
                    >
                        <span>{t.header.wholesale}</span>
                        <ArrowRight size={16} aria-hidden="true" />
                    </Link>

                    <button
                        type="button"
                        className="nuvia-header__mobile-toggle"
                        onClick={toggleMobileMenu}
                        aria-label={
                            isMobileMenuOpen
                                ? t.header.closeNavigation
                                : t.header.openNavigation
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
