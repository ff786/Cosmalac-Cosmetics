import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Building2, Globe2, Package, Sparkles, Mouse } from "lucide-react";
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
    const scrollCueRef = useRef(null);

    useLayoutEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const ctx = gsap.context(() => {
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) return;

            const mm = gsap.matchMedia();

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
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                scroll
                    .to(
                        contentRef.current,
                        {
                            y: -80,
                            opacity: 0.35,
                            duration: 0.65,
                        },
                        0
                    )
                    .to(
                        imageWrapRef.current,
                        {
                            x: -70,
                            y: 35,
                            scale: 1.12,
                            duration: 0.9,
                        },
                        0
                    )
                    .to(
                        statsRef.current,
                        {
                            y: 45,
                            opacity: 0,
                            duration: 0.55,
                        },
                        0.2
                    )
                    .to(
                        imageRef.current,
                        {
                            scale: 1.06,
                            x: -20,
                            duration: 1,
                        },
                        0
                    );

                return () => {
                    scroll.scrollTrigger?.kill();
                };
            });

            mm.add("(max-width: 767px)", () => {
                gsap.set([contentRef.current, statsRef.current], {
                    opacity: 0,
                    y: 28,
                });
                gsap.set(imageWrapRef.current, {
                    opacity: 0,
                    y: 55,
                    scale: 1.04,
                });

                const intro = gsap.timeline({
                    defaults: { ease: "power3.out" },
                });

                intro
                    .to(imageWrapRef.current, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.9,
                    })
                    .to(
                        contentRef.current,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.75,
                        },
                        "-=0.55"
                    )
                    .to(
                        statsRef.current,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                        },
                        "-=0.35"
                    );

                const scroll = gsap.timeline({
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        end: "+=70%",
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                scroll
                    .to(
                        contentRef.current,
                        {
                            y: -70,
                            opacity: 0,
                            duration: 0.48,
                        },
                        0
                    )
                    .to(
                        statsRef.current,
                        {
                            y: -35,
                            opacity: 0,
                            duration: 0.42,
                        },
                        0.1
                    )
                    .to(
                        imageWrapRef.current,
                        {
                            y: -35,
                            scale: 1.08,
                            duration: 0.85,
                        },
                        0
                    )
                    .to(
                        imageRef.current,
                        {
                            scale: 1.12,
                            y: -12,
                            duration: 0.85,
                        },
                        0
                    );

                return () => {
                    scroll.scrollTrigger?.kill();
                };
            });

            gsap.to(scrollCueRef.current, {
                y: 8,
                opacity: 0.55,
                duration: 1.1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
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

                    <div className="wholesale-page__hero-scroll" ref={scrollCueRef}>
                        <Mouse size={15} />
                        <span>Scroll to explore</span>
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
