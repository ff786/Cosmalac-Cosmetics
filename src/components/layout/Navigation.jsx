import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

import {
    NAVIGATION_ITEMS,
} from "../../utils/constants";

import { useApp } from "../../context/AppContext";

const Navigation = () => {
    const {
        isMobileMenuOpen,
        closeMobileMenu,
    } = useApp();

    const getLinkClass = ({ isActive }) =>
        [
            "nuvia-nav__link",
            isActive ? "nuvia-nav__link--active" : "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <>
            <nav className="nuvia-nav nuvia-nav--desktop">
                {NAVIGATION_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={getLinkClass}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div
                className={[
                    "nuvia-mobile-menu",
                    isMobileMenuOpen
                        ? "nuvia-mobile-menu--open"
                        : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <div className="nuvia-mobile-menu__header">
          <span className="nuvia-mobile-menu__brand">
            Nuvia Care
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

                <nav className="nuvia-mobile-menu__nav">
                    {NAVIGATION_ITEMS.map((item, index) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({
                                            isActive,
                                        }) =>
                                [
                                    "nuvia-mobile-menu__link",
                                    isActive
                                        ? "nuvia-mobile-menu__link--active"
                                        : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")
                            }
                            onClick={closeMobileMenu}
                        >
              <span>
                0{index + 1}
              </span>

                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="nuvia-mobile-menu__footer">
                    <p>
                        Thoughtful skincare.
                        <br />
                        Naturally better.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Navigation;