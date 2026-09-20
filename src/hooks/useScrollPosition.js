import { useEffect, useState } from "react";

const useScrollPosition = () => {
    const [y, setY] = useState(0);

    useEffect(() => {
        let ticking = false;

        const updateScrollPosition = () => {
            setY(window.scrollY);
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        updateScrollPosition();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return { y };
};

export default useScrollPosition;