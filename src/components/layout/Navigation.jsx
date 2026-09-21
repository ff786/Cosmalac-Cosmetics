import { useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { NAVIGATION_ITEMS } from "../../utils/constants";
import { useApp } from "../../hooks/useApp";
import useLanguage from "../../hooks/useLanguage";

const Navigation = () => {
    const {
        isMobileMenuOpen,
        closeMobileMenu,
    } = useApp();
    const navigate = useNavigate();
    const location = useLocation();
    const closeButtonRef = useRef(null);
    const { t } = useLanguage();

    const navigationLabels = [
        t.nav.products,
        t.nav.about,
        t.nav.services,
        t.nav.contact,
    ];

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        requestAnimationFrame(() => {
            closeButtonRef.current?.focus();
        });
    }, [isMobileMenuOpen]);

    const closeMenu = () => {
        const activeElement = document.activeElement;

        if (activeElement instanceof HTMLElement) {
            activeElement.blur();
        }

        closeMobileMenu();

        requestAnimationFrame(() => {
            document.querySelector(".nuvia-header__mobile-toggle")?.focus();
        });
    };

    const getHeaderOffset = () => {
        const header = document.querySelector(".nuvia-header");
        return (header?.offsetHeight || 72) + 12;
    };

    const scrollToHashSection = (hash) => {
        const target = document.querySelector(hash);

        if (!target) return false;

        const offset = getHeaderOffset();
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: Math.max(
                0,
                target.getBoundingClientRect().top +
                    window.scrollY -
                    offset
            ),
            left: 0,
            behavior: reducedMotion ? "auto" : "smooth",
        });

        return true;
    };

    const handleNavigation = (event, item) => {
        if (!item.path?.includes("#")) {
            closeMenu();
            return;
        }

        event.preventDefault();

        const [pathname, hashFragment] = item.path.split("#");
        const targetPath = pathname || "/";
        const hash = hashFragment ? `#${hashFragment}` : "";

        closeMenu();

        if (location.pathname !== targetPath) {
            navigate(`${targetPath}${hash}`);
            return;
        }

        if (hash) {
            requestAnimationFrame(() => scrollToHashSection(hash));
        }
    };

    const desktopNavigation = (
        <nav
            className="nuvia-nav nuvia-nav--desktop"
            aria-label={t.nav.primaryLabel || "Primary navigation"}
        >
            {NAVIGATION_ITEMS.map((item, index) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        [
                            "nuvia-nav__link",
                            isActive ? "nuvia-nav__link--active" : "",
                        ]
                            .filter(Boolean)
                            .join(" ")
                    }
                    onClick={(event) => handleNavigation(event, item)}
                >
                    {navigationLabels[index] || item.label}
                </NavLink>
            ))}
        </nav>
    );

    const mobileMenu = (
        <div
            id="cosmalac-mobile-menu"
            className={[
                "nuvia-mobile-menu",
                isMobileMenuOpen
                    ? "nuvia-mobile-menu--open"
                    : "",
            ]
                .filter(Boolean)
                .join(" ")}
            inert={isMobileMenuOpen ? undefined : true}
        >
            <div className="nuvia-mobile-menu__header">
                <NavLink
                    to="/"
                    className="nuvia-mobile-menu__brand"
                    onClick={closeMobileMenu}
                >
                    COSMALAC
                    <small>EST. 2016</small>
                </NavLink>

                <button
                    ref={closeButtonRef}
                    type="button"
                    className="nuvia-mobile-menu__close"
                    onClick={closeMobileMenu}
                    aria-label={t.header.closeNavigation}
                >
                    <X size={21} aria-hidden="true" />
                </button>
            </div>

            <nav
                className="nuvia-mobile-menu__nav"
                aria-label={t.nav.primaryLabel || "Mobile navigation"}
            >
                {NAVIGATION_ITEMS.map((item, index) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
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
                            handleNavigation(event, item)
                        }
                    >
                        <span>
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <strong>
                            {navigationLabels[index] || item.label}
                        </strong>
                    </NavLink>
                ))}
            </nav>

            <div className="nuvia-mobile-menu__footer">
                <span>{t.footer?.location || "Cosmalac · Dubai"}</span>
                <p>
                    {t.mobile.footer
                        .split("\n")
                        .map((line, index) => (
                            <span key={line}>
                                {index > 0 && <br />}
                                {line}
                            </span>
                        ))}
                </p>
            </div>
        </div>
    );

    return (
        <>
            {desktopNavigation}
            {typeof document !== "undefined"
                ? createPortal(mobileMenu, document.body)
                : null}
        </>
    );
};

export default Navigation;
