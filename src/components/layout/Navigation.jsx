import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { NAVIGATION_ITEMS } from "../../utils/constants";
import { useApp } from "../../context/AppContext";

const Navigation = () => {
    const { isMobileMenuOpen, closeMobileMenu } = useApp();
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToTarget = (hash) => {
        if (!hash) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const target = document.querySelector(hash);

        if (target) {
            const headerOffset = window.innerWidth <= 767 ? 72 : 88;
            const top =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;

            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }
    };

    const handleNavigation = (event, item) => {
        if (!item.hash) return;

        event.preventDefault();
        closeMobileMenu();

        if (location.pathname !== "/") {
            navigate(`/${item.hash}`);
            return;
        }

        window.history.replaceState(null, "", item.hash);
        scrollToTarget(item.hash);
    };

    const getLinkClass = ({ isActive }) =>
        [
            "nuvia-nav__link",
            isActive ? "nuvia-nav__link--active" : "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <>
            <nav className="nuvia-nav nuvia-nav--desktop" aria-label="Primary navigation">
                {NAVIGATION_ITEMS.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.hash ? `/${item.hash}` : item.path}
                        className={getLinkClass}
                        onClick={(event) => handleNavigation(event, item)}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div
                className={[
                    "nuvia-mobile-menu",
                    isMobileMenuOpen ? "nuvia-mobile-menu--open" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
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

                <nav className="nuvia-mobile-menu__nav" aria-label="Mobile navigation">
                    {NAVIGATION_ITEMS.map((item, index) => (
                        <NavLink
                            key={item.label}
                            to={item.hash ? `/${item.hash}` : item.path}
                            className={({ isActive }) =>
                                [
                                    "nuvia-mobile-menu__link",
                                    isActive ? "nuvia-mobile-menu__link--active" : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")
                            }
                            onClick={(event) => handleNavigation(event, item)}
                        >
                            <span>0{index + 1}</span>
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
        </>
    );
};

export default Navigation;