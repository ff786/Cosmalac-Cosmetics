import {
    ArrowUpRight,
    Mail,
    MapPin,
} from "lucide-react";

import { NAVIGATION_ITEMS, SOCIAL_LINKS } from "../../utils/constants";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="nuvia-footer">
            <div className="nuvia-footer__container">
                <div className="nuvia-footer__glass">
                    <div className="nuvia-footer__main">
                        <div className="nuvia-footer__brand">
                            <a href="/" className="nuvia-footer__logo">
                                COSMALAC
                            </a>

                            <p className="nuvia-footer__tagline">
                                Thoughtful skincare for naturally
                                <br />
                                radiant skin.
                            </p>

                            <a
                                href="mailto:hello.cosmalac@gmail.com"
                                className="nuvia-footer__email"
                            >
                                <Mail size={16} />
                                hello.cosmalac@gmail.com
                            </a>
                        </div>

                        <div className="nuvia-footer__column">
                            <h3>Explore</h3>

                            <nav>
                                {NAVIGATION_ITEMS.map((item) => (
                                    <a key={item.path} href={item.path}>
                                        {item.label}
                                        <ArrowUpRight size={13} />
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="nuvia-footer__column">
                            <h3>Visit Us</h3>

                            <div className="nuvia-footer__location">
                                <MapPin size={16} />

                                <p>
                                    25 Rose Avenue
                                    <br />
                                    Colombo
                                    <br />
                                    Sri Lanka
                                </p>
                            </div>
                        </div>

                        <div className="nuvia-footer__column">
                            <h3>Follow Along</h3>

                            <div className="nuvia-footer__socials">
                                <a
                                    href={SOCIAL_LINKS.instagram}
                                    aria-label="Instagram"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="18"
                                        height="18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="18"
                                            height="18"
                                            rx="5"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />

                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="4"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />

                                        <circle
                                            cx="17.5"
                                            cy="6.5"
                                            r="1"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </a>

                                <a
                                    href={SOCIAL_LINKS.facebook}
                                    aria-label="Facebook"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="18"
                                        height="18"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path d="M14.2 8.1V6.7c0-.7.5-1.1 1.2-1.1h1.6V3h-2.5c-2.7 0-4.2 1.6-4.2 4.1v1h-2.7v2.9h2.7V21h3.3v-9.9h2.8l.4-2.9h-3.2v-.1h.6Z" />
                                    </svg>
                                </a>
                            </div>

                            <p className="nuvia-footer__social-text">
                                Beauty, rituals & everyday glow.
                            </p>
                        </div>
                    </div>

                    <div className="nuvia-footer__bottom">
                        <p>
                            © {currentYear} Cosmalac. All rights reserved.
                        </p>

                        <div className="nuvia-footer__legal">
                            <a href="/privacy">Privacy</a>
                            <a href="/terms">Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;