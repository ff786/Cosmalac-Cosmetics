import { ArrowRight, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Navigation from "./Navigation";
import useScrollPosition from "../../hooks/useScrollPosition";
import { useApp } from "../../context/AppContext";

const Header = () => {
    const { y } = useScrollPosition();
    const { toggleMobileMenu, closeMobileMenu } = useApp();
    const navigate = useNavigate();

    const scrolled = y > 40;

    const handleLogoClick = (event) => {
        event.preventDefault();
        closeMobileMenu();

        if (window.location.pathname !== "/") {
            navigate("/");
            return;
        }

        window.history.replaceState(null, "", "/");
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleWholesaleClick = (event) => {
        event.preventDefault();
        closeMobileMenu();

        const target = document.querySelector("#wholesale");

        if (!target) return;

        const headerOffset = window.innerWidth <= 767 ? 72 : 88;
        const top =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerOffset;

        window.history.replaceState(null, "", "/#wholesale");

        window.scrollTo({
            top,
            behavior: "smooth",
        });
    };

    return (
        <header
            className={`nuvia-header ${scrolled ? "nuvia-header--scrolled" : ""}`}
        >
            <div className="container nuvia-header__inner">
                <Link
                    to="/"
                    className="nuvia-header__logo"
                    aria-label="Cosmalac — return to top"
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
                    <a
                        href="/#wholesale"
                        className="nuvia-header__inquiry"
                        onClick={handleWholesaleClick}
                    >
                        <span>Wholesale Inquiry</span>
                        <ArrowRight size={16} />
                    </a>

                    <button
                        type="button"
                        className="nuvia-header__mobile-toggle"
                        onClick={toggleMobileMenu}
                        aria-label="Open navigation"
                    >
                        <Menu size={21} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;