import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const imageFrameRef = useRef(null);
    const floatingCardRef = useRef(null);
    const heroBackgroundRef = useRef(null);
    const heroModelRef = useRef(null);
    const heroMobileBackgroundRef = useRef(null);
    const heroMobileModelRef = useRef(null);
    const heroPlusRef = useRef(null);
    const heroMinusRef = useRef(null);
    const scrollCueRef = useRef(null);


    useLayoutEffect(() => {
        const heroElement = heroRef.current;

        if (!heroElement) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            /*
             * DESKTOP
             */
            mm.add("(min-width: 768px)", () => {
                /*
                 * Desktop composite starts from the exact resting
                 * alignment of the generated background + transparent model.
                 */
                gsap.set(heroBackgroundRef.current, {
                    scale: 1,
                    x: 0,
                    y: 0,
                });

                gsap.set(heroModelRef.current, {
                    scale: 1,
                    x: 0,
                    y: 0,
                });

                /*
                 * DESKTOP MICRO-INTERACTION
                 * A restrained pointer parallax adds depth without touching
                 * the scroll-controlled model animation.
                 */
                const backgroundX = gsap.quickTo(
                    heroBackgroundRef.current,
                    "x",
                    { duration: 0.8, ease: "power3.out" }
                );
                const backgroundY = gsap.quickTo(
                    heroBackgroundRef.current,
                    "y",
                    { duration: 0.8, ease: "power3.out" }
                );
                const plusX = heroPlusRef.current
                    ? gsap.quickTo(heroPlusRef.current, "x", {
                        duration: 0.9,
                        ease: "power3.out",
                    })
                    : null;
                const plusY = heroPlusRef.current
                    ? gsap.quickTo(heroPlusRef.current, "y", {
                        duration: 0.9,
                        ease: "power3.out",
                    })
                    : null;
                const minusX = heroMinusRef.current
                    ? gsap.quickTo(heroMinusRef.current, "x", {
                        duration: 1.05,
                        ease: "power3.out",
                    })
                    : null;
                const minusY = heroMinusRef.current
                    ? gsap.quickTo(heroMinusRef.current, "y", {
                        duration: 1.05,
                        ease: "power3.out",
                    })
                    : null;

                const handlePointerMove = (event) => {
                    const rect = heroElement.getBoundingClientRect();
                    const x = (event.clientX - rect.left) / rect.width - 0.5;
                    const y = (event.clientY - rect.top) / rect.height - 0.5;

                    backgroundX(x * 10);
                    backgroundY(y * 8);
                    plusX?.(x * 16);
                    plusY?.(y * 12);
                    minusX?.(x * -12);
                    minusY?.(y * -10);
                };

                const resetPointer = () => {
                    backgroundX(0);
                    backgroundY(0);
                    plusX?.(0);
                    plusY?.(0);
                    minusX?.(0);
                    minusY?.(0);
                };

                heroElement.addEventListener(
                    "pointermove",
                    handlePointerMove,
                    { passive: true }
                );
                heroElement.addEventListener(
                    "pointerleave",
                    resetPointer,
                    { passive: true }
                );

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroElement,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.28,
                        invalidateOnRefresh: true,
                    },
                });

                /*
                 * PHASE 1
                 * Text gently rises and begins fading.
                 */
                tl.to(
                    contentRef.current,
                    {
                        y: -80,
                        opacity: 0.55,
                        duration: 0.35,
                        ease: "none",
                    },
                    0
                );

                /*
                 * PHASE 2
                 * The model separates from the environment and begins
                 * expanding. The background remains visually stable.
                 */
                tl.to(
                    heroModelRef.current,
                    {
                        x: "-2vw",
                        scale: 1.12,
                        duration: 0.48,
                        ease: "none",
                    },
                    0.15
                );

                tl.to(
                    heroBackgroundRef.current,
                    {
                        scale: 1.025,
                        duration: 0.48,
                        ease: "none",
                    },
                    0.15
                );

                /*
                 * PHASE 3
                 * The model becomes the dominant visual while the
                 * background softly enlarges behind it.
                 */
                tl.to(
                    heroModelRef.current,
                    {
                        x: "-5vw",
                        y: "-1vh",
                        scale: 1.5,
                        duration: 0.42,
                        ease: "none",
                    },
                    0.55
                );

                tl.to(
                    heroBackgroundRef.current,
                    {
                        scale: 1.065,
                        duration: 0.42,
                        ease: "none",
                    },
                    0.55
                );

                /*
                 * Text disappears underneath.
                 */
                tl.to(
                    contentRef.current,
                    {
                        opacity: 0,
                        y: -150,
                        duration: 0.3,
                        ease: "none",
                    },
                    0.65
                );

                /*
                 * Floating card follows image.
                 */
                if (floatingCardRef.current) {
                    tl.to(
                        floatingCardRef.current,
                        {
                            x: "-8vw",
                            scale: 1.05,
                            opacity: 0,
                            duration: 0.45,
                            ease: "none",
                        },
                        0.35
                    );
                }

                /*
                 * Scroll cue follows the same timeline so it naturally
                 * disappears as the hero starts transforming.
                 */
                if (scrollCueRef.current) {
                    tl.to(
                        scrollCueRef.current,
                        {
                            opacity: 0,
                            y: 14,
                            duration: 0.2,
                            ease: "none",
                        },
                        0.08
                    );
                }

                return () => {
                    heroElement.removeEventListener(
                        "pointermove",
                        handlePointerMove
                    );
                    heroElement.removeEventListener(
                        "pointerleave",
                        resetPointer
                    );
                    tl.kill();
                };
            });

            /*
             * MOBILE
             *
             * This is the important part.
             */
            mm.add("(max-width: 767px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroElement,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                /*
                 * INITIAL
                 *
                 * Mobile now uses the same layered composition as desktop:
                 * generated environment + transparent model. The old single
                 * photograph remains in the DOM only as a fallback and is
                 * hidden by CSS.
                 */
                gsap.set(
                    [
                        heroMobileBackgroundRef.current,
                        heroMobileModelRef.current,
                    ],
                    {
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1,
                    }
                );

                gsap.set(imageFrameRef.current, {
                    xPercent: 0,
                    scale: 1,
                });

                /*
                 * PHASE 1
                 *
                 * Text stays readable.
                 *
                 * Image starts entering toward the left.
                 */
                tl.to(
                    heroMobileBackgroundRef.current,
                    {
                        scale: 1.035,
                        y: "-1vh",
                        duration: 0.32,
                        ease: "none",
                    },
                    0
                );

                tl.to(
                    heroMobileModelRef.current,
                    {
                        x: "-2vw",
                        y: "-1vh",
                        scale: 1.06,
                        duration: 0.32,
                        ease: "none",
                    },
                    0
                );

                /*
                 * PHASE 2
                 *
                 * Image crosses over the text.
                 */
                tl.to(
                    heroMobileBackgroundRef.current,
                    {
                        scale: 1.09,
                        y: "-2vh",
                        duration: 0.34,
                        ease: "none",
                    },
                    0.25
                );

                tl.to(
                    heroMobileModelRef.current,
                    {
                        x: "-5vw",
                        y: "-2vh",
                        scale: 1.16,
                        duration: 0.34,
                        ease: "none",
                    },
                    0.25
                );

                /*
                 * Text begins disappearing.
                 */
                tl.to(
                    contentRef.current,
                    {
                        y: -45,
                        opacity: 0.42,
                        duration: 0.25,
                        ease: "none",
                    },
                    0.3
                );

                /*
                 * PHASE 3
                 *
                 * Image becomes dominant.
                 */
                tl.to(
                    heroMobileBackgroundRef.current,
                    {
                        scale: 1.16,
                        y: "-3vh",
                        duration: 0.35,
                        ease: "none",
                    },
                    0.55
                );

                tl.to(
                    heroMobileModelRef.current,
                    {
                        x: "-8vw",
                        y: "-3vh",
                        scale: 1.34,
                        duration: 0.35,
                        ease: "none",
                    },
                    0.55
                );

                /*
                 * Text is now completely hidden
                 * BEHIND the image.
                 */
                tl.to(
                    contentRef.current,
                    {
                        opacity: 0,
                        y: -95,
                        duration: 0.2,
                        ease: "none",
                    },
                    0.65
                );

                /*
                 * Floating card disappears into the image.
                 */
                if (floatingCardRef.current) {
                    tl.to(
                        floatingCardRef.current,
                        {
                            opacity: 0,
                            scale: 0.9,
                            duration: 0.2,
                        },
                        0.6
                    );
                }

            