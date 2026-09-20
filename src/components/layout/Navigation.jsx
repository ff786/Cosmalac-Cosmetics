import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { NAVIGATION_ITEMS } from "../../utils/constants";
import { useApp } from "../../context/AppContext";

const Navigation = () => {
    const { isMobileMenuOpen, closeMobileMenu } = useApp();
    const navigate = useNavigate();
    const location = useLocation();

    const getHeaderOffset = () => {
        const header = document.querySelector(".nuvia-header");
        const headerHeight = header?.offsetHeight || 0;
        return Math.max(headerHeight + 12, 72);
    };

    const scrollToHashSection = (hash) => {
        const target = document.querySelector(hash);

        if (!target) return false;

        const offset = getHeaderOffset();
        const top =
            target.getBoundingClientRect().top +
            window.scrollY -
            offset;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: Math.max(0, top),
            left: 0,
            behavior: reducedMotion ? "auto" : "smooth",
        });

        return true;
    };

    const handleNavClick = (event, path) => {
        if (!path.includes("#")) {
            closeMobileMenu();
            return;
        }

        event.preventDefault();
        closeMobileMenu();

        const [pathname, hashFragment] = path.split("#");
        const hash = hashFragment ? `#${hashFragment}` : "";
        const targetPath = pathname || "/";

        if (location.pathname !== targetPath) {
            navigate(`${targetPath}${hash}`);
            return;
        }

        if (hash) {
            scrollToHashSection(hash);
        }
    };

    const handleMobileNavigation = (event, item) => {
        if (item.hash) {
            event.preventDefault();
            closeMobileMenu();

            const targetPath = item.path?.split("#")[0] || "/";
            const hash = `#${item.hash.replace(/^#/, "")}`;

            if (location.pathname !== targetPath) {
                navigate(`${targetPath}${hash}`);
                return;
            }

            scrollToHashSection(hash);
            return;
        }

        closeMobileMenu();
    };

    const getLinkClass = ({ isActive }) =>
        [
            "nuvia-nav__link",
            isActive ? "nuvia-nav__link--active" : "",
        ]
            .filter(Boolean)
            .join(" ");

    const mobileMenu = (
        <div
            id="cosmalac-mobile-menu"
            className={[
                "nuvia-mobile-menu",
                isMobileMenuOpen ? "nuvia-mobile-menu--open" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            aria-hidden={!isMobileMenuOpen}
        >
            <div className="nuvia-mobile-menu__header">
                <span className="nuvia-mobile-menu__brand">
                    Cosmalac
                </span>

                <button
                    type="button"
                    className="nuvia-mobile-menu__close"
                    onClick={closeMobileMenu}
                    aria-label="Close navigation"
                >
                    <X size={22} />
                </button>
            </div>

            <nav
                className="nuvia-mobile-menu__nav"
                aria-label="Mobile navigation"
            >
                {NAVIGATION_ITEMS.map((item, index) => (
                    <NavLink
                        key={item.label}
                        to={item.hash ? `/${item.hash}` : item.path}
                        className={({ isActive }) =>
                            [
                                "nuvia-mobile-menu__link",
                                isActive
                                    ? "nuvia-mobile-menu__link--active"
                                    : "",
                            ]
                                .filter(Boolean)
                                .join(" ")
                        }
                        onClick={(event) =>
                            handleMobileNavigation(event, item)
                        }
                    >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="nuvia-mobile-menu__footer">
                <p>
                    Premium skincare.
                    <br />
                    Made in Dubai.
                </p>
            </div>
        </div>
    );

    return (
        <>
            <nav
                className="nuvia-nav nuvia-nav--desktop"
                aria-label="Primary navigation"
            >
                {NAVIGATION_ITEMS.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.hash ? `/${item.hash}` : item.path}
                        className={getLinkClass}
                        onClick={(event) =>
                            handleNavClick(event, item.path)
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {createPortal(mobileMenu, document.body)}
        </>
    );
};

export default Navigation;
