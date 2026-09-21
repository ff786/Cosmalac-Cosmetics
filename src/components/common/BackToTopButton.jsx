import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const updateReducedMotion = () => {
            setPrefersReducedMotion(mediaQuery.matches);
        };

        const updateVisibility = () => {
            setIsVisible(window.scrollY > 420);
        };

        updateReducedMotion();
        updateVisibility();

        mediaQuery.addEventListener("change", updateReducedMotion);
        window.addEventListener("scroll", updateVisibility, {
            passive: true,
        });

        return () => {
            mediaQuery.removeEventListener("change", updateReducedMotion);
            window.removeEventListener("scroll", updateVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    };

    return (
        <button
            type="button"
            className={`back-to-top ${isVisible ? "back-to-top--visible" : ""}`}
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
        >
            <ArrowUp
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
            />
        </button>
    );
};

export default BackToTopButton;