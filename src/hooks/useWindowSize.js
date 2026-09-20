import { useEffect, useState } from "react";

const getWindowSize = () => {
    if (typeof window === "undefined") {
        return {
            width: 0,
            height: 0,
        };
    }

    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getWindowSize());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;