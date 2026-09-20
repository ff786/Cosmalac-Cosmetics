import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Building2, Globe2, Package, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Wholesale from "../components/forms/Wholesale";

gsap.registerPlugin(ScrollTrigger);

const WholesalePage = () => {
    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const imageWrapRef = useRef(null);
    const contentRef = useRef(null);
    const statsRef = useRef(null);
    const glowRef = useRef(null);

    useLayoutEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const ctx = gsap.context(() => {
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) return;

            const mm = gsap.matchMedia();

            mm.add("(max-width: 767px)", () => {
                /*
                 * Mobile scroll motion — first pass.
                 * Layout stays untouched. We only animate existing layers:
                 * copy exits upward, portrait subtly zooms within its crop,
                 * and the stats settle downward.
                 */
                const mobileScroll = gsap.timeline({
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.75,
                        invalidateOnRefresh: true,
                    },
                });

                mobileScroll
                    // The soft diagonal image edge gradually opens to a full-frame
                    // portrait as the user scrolls through the hero.
                    .fromTo(
                        imageWrapRef.current,
                        {
                            "--mobile-fade-start": 38,
                            "--mobile-fade-end": 58,
                        },
                        {
                            "--mobile-fade-start": 100,
                            "--mobile-fade-end": 100,
                            duration: 0.72,
                            ease: "none",
                        },
                        0
                    )
                    // Copy stays readable at first, then slides behind the portrait
                    // before fading out.
                    .fromTo(
                        contentRef.current,
                        {
                            y: 0,
                            opacity: 1,
                        },
                        {
                            y: -150,
                            opacity: 0,
                            duration: 0.62,
                            ease: "none",
                        },
                        0.12
                    )
                    // The portrait expands from its diagonal crop toward a full-frame
                    // image as the user progresses through the hero.
                    .fromTo(
                        imageRef.current,
                        {
                            scale: 1,
                            x: 0,
                        },
                        {
                            scale: 1.24,
                            x: -8,
                            duration: 1,
                            ease: "none",
                        },
                        0
                    )
                    // Let the stats remain present longer, then fade out near the end.
                    .fromTo(
                        statsRef.current,
                        {
                            y: 0,
                            opacity: 1,
                        },
                        {
                            y: 38,
                            opacity: 0,
                            duration: 0.42,
                            ease: "none",
                        },
                        0.62
                    );

                return () => {
                    mobileScroll.scrollTrigger?.kill();
                };
            });

            mm.add("(min-width: 768px)", () => {
                gsap.set([contentRef.current, statsRef.current], {
                    opacity: 0,
                    y: 36,
                });
                gsap.set(imageWrapRef.current, {
                    opacity: 0,
                    x: 90,
                    scale: 1.08,
                });
                gsap.set(glowRef.current, {
                    opacity: 0,
                    scale: 0.8,
                });

                const intro = gsap.timeline({
                    defaults: { ease: "power3.out" },
                });

                intro
                    .to(imageWrapRef.current, {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1.2,
                    })
                    .to(
                        glowRef.current,
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 1.1,
                        },
                        "-=0.9"
                    )
                    .to(
                        contentRef.current,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.9,
                        },
                        "-=0.8"
                    )
                    .to(
                        statsRef.current,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.75,
                        },
                        "-=0.5"
                    );

                const scroll = gsap.timeline({
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        end: "+=80%",
                        scrub: 0.8,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                scroll
                    // Explicitly define the scroll-start state so the
                    // intro animation can never leave the text invisible
                    // when the user scrolls back to the top.
                    .fromTo(
                        contentRef.current,
                        {
                            y: 0,
                            opacity: 1,
                        },
                        {
                            y: -120,
                            opacity: 0,
                            duration: 0.82,
                            ease: "none",
                        },
                        0.18
                    )
                    .fromTo(
                        imageWrapRef.current,
                        {
                            x: 0,
                            y: 0,
                            scale: 1,
                        },
                        {
                            x: -58,
                            y: 28,
                            scale: 1.1,
                            duration: 1,
                            ease: "none",
                        },
                        0
                    )
                    .fromTo(
                        statsRef.current,
                        {
                            y: 0,
                            opacity: 1,
                        },
                        {
                            y: 38,
                            opacity: 0,
                            duration: 0.7,
                            ease: "none",
                        },
                        0.28
                    )
                    .fromTo(
                        imageRef.current,
                        {
                            scale: 1,
                            x: 0,
                        },
                        {
                            scale: 1.055,
                            x: -12,
                            duration: 1,
                            ease: "none",
                        },
                        0
                    );

                return () => {
                    scroll.scrollTrigger?.kill();
                };
            });

            return () => mm.revert();
        }, hero);

        return () => ctx.revert();
    }, []);

    return (
        <main className="wholesale-page">
            <section
                className="wholesale-page__hero wholesale-page__hero--editorial"
                ref={heroRef}
            >
                <div className="wholesale-page__hero-glow" ref={glowRef} aria-hidden="true" />
                <div className="wholesale-page__hero-orbit" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>

                <div className="wholesale-page__hero-image" ref={imageWrapRef} aria-hidden="true">
                    <img
                        ref={imageRef}
                        src="/images/wholesale/wholesale-hero-model.png"
                        alt=""
                        draggable="false"
                    />
                    <div className="wholesale-page__hero-image-wash" />
                </div>

                <div className="container wholesale-page__hero-container">
                    <div className="wholesale-page__hero-content" ref={contentRef}>
                        <span className="eyebrow">
                            <Sparkles size={13} />
                            Premium skincare from Dubai
                        </span>

                        <h1>
                            Grow with
                            <br />
                            <em>Cosmalac.</em>
                        </h1>

                        <p>
                            Wholesale, distribution and B2B opportunities
                            for partners looking to bring premium Dubai
                            skincare to their market.
                        </p>

                        <a
                            href="#wholesale-inquiry"
                            className="wholesale-page__hero-link"
                        >
                            Start an inquiry
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className="wholesale-page__hero-stats" ref={statsRef}>
                        <div>
                            <Building2 size={19} />
                            <span>Distributor partnerships</span>
                        </div>
                        <div>
                            <Package size={19} />
                            <span>Bulk & wholesale orders</span>
                        </div>
                        <div>
                            <Globe2 size={19} />
                            <span>International inquiries</span>
                        </div>
                    </div>

                </div>
            </section>

            <div id="wholesale-inquiry">
                <Wholesale />
            </div>
        </main>
    );
};

export default WholesalePage;
