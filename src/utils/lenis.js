import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

const raf = (time) => {
    if (lenis) {
        lenis.raf(time * 1000);
    }
};

export const initLenis = () => {
    if (lenis) return lenis;

    lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        orientation: "vertical",
        gestureOrientation: "vertical",
        infinite: false,
        overscroll: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return lenis;
};

export const destroyLenis = () => {
    if (!lenis) return;

    gsap.ticker.remove(raf);
    lenis.destroy();

    lenis = null;
};

export default lenis;