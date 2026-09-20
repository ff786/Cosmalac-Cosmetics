import { useEffect, useState } from "react";

const COOKIE_NAME = "cosmalac_cookie_consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

const readConsent = () => {
    const cookie = document.cookie
        .split("; ")
        .find((entry) => entry.startsWith(COOKIE_NAME + "="));

    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

const writeConsent = (value) => {
    const secure =
        window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie =
        COOKIE_NAME +
        "=" +
        encodeURIComponent(value) +
        "; Max-Age=" +
        ONE_YEAR +
        "; Path=/; SameSite=Lax" +
        secure;
};

const CookieConsent = () => {
    const [consent, setConsent] = useState(null);

    useEffect(() => {
        setConsent(readConsent());
    }, []);

    if (consent) {
        return null;
    }

    const handleChoice = (value) => {
        writeConsent(value);
        setConsent(value);
    };

    return (
        <aside
            className="cookie-consent"
            aria-label="Cookie and privacy notice"
        >
            <div className="cookie-consent__content">
                <span className="cookie-consent__eyebrow">
                    Privacy & cookies
                </span>

                <p>
                    Cosmalac uses essential browser storage for site
                    functionality and your privacy preference. Optional
                    analytics or advertising cookies are not enabled on the
                    current website.
                </p>
            </div>

            <div className="cookie-consent__actions">
                <a href="/privacy">
                    Privacy Policy
                </a>

                <button
                    type="button"
                    className="cookie-consent__secondary"
                    onClick={() => handleChoice("essential")}
                >
                    Continue with essentials
                </button>

                <button
                    type="button"
                    className="cookie-consent__primary"
                    onClick={() => handleChoice("accepted")}
                >
                    Accept
                </button>
            </div>
        </aside>
    );
};

export default CookieConsent;
