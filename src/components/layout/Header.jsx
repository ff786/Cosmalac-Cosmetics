import {
    ArrowRight,
    Menu,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navigation from "./Navigation";
import useScrollPosition from "../../hooks/useScrollPosition";
import { useApp } from "../../context/AppContext";

const Header = () => {
    const { y } = useScrollPosition();

    const {
        toggleMobileMenu,
    } = useApp();

    const scrolled = y > 40;

    return (
        <header
            className={`nuvia-header ${
                scrolled ? "nuvia-header--scrolled" : ""
            }`}
        >
            <div className="container nuvia-header__inner">

                {/* COSMALAC LOGO */}
                <Link
                    to="/"
                    className="nuvia-header__logo"
                    aria-label="Cosmalac"
                >
                    <span className="nuvia-header__logo-name">
                        COSMALAC
                    </span>
                    <span className="nuvia-header__logo-est">
                        EST. 2016
                    </span>
                </Link>

                {/* NAVIGATION */}
                <Navigation />

                {/* RIGHT SIDE */}
                <div className="nuvia-header__actions">

                    <a
                        href="/#wholesale"
                        className="nuvia-header__inquiry"
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