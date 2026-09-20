import { useEffect } from "react";

const scrollToHash = () => {
    const hash = window.location.hash;

    if (!hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    const target = document.querySelector(hash);

    if (!target) return;

    const headerOffset = window.innerWidth <= 767 ? 72 : 88;
    const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

    window.scrollTo({
        top,
        behavior: "smooth",
    });
};

const ScrollManager = () => {
    useEffect(() => {
        const handleRouteReady = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(scrollToHash);
            });
        };

        window.addEventListener("popstate", handleRouteReady);
        window.addEventListener("hashchange", handleRouteReady);

        handleRouteReady();

        return () => {
            window.removeEventListener("popstate", handleRouteReady);
            window.removeEventListener("hashchange", handleRouteReady);
        };
    }, []);

    return null;
};

export default ScrollManager;
