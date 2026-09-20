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


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            /*
             * DESKTOP
             */
            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.35,
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
                 * Image starts moving left and growing.
                 */
                tl.to(
                    imageFrameRef.current,
                    {
                        x: "-18vw",
                        scale: 1.18,
                        duration: 0.45,
                        ease: "none",
                    },
                    0.15
                );

                /*
                 * PHASE 3
                 * Image covers the text.
                 */
                tl.to(
                    imageFrameRef.current,
                    {
                        x: "-30vw",
                        scale: 1.38,
                        duration: 0.4,
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
                            x: "-22vw",
                            scale: 1.05,
                            opacity: 0,
                            duration: 0.45,
                            ease: "none",
                        },
                        0.35
                    );
                }

                return () => {
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
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                /*
                 * INITIAL
                 *
                 * Image starts toward the RIGHT/BOTTOM.
                 */
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
                    imageFrameRef.current,
                    {
                        x: "-8vw",
                        scale: 1,
                        duration: 0.25,
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
                    imageFrameRef.current,
                    {
                        x: "-22vw",
                        scale: 1.04,
                        duration: 0.3,
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
                    imageFrameRef.current,
                    {
                        x: "-34vw",
                        scale: 1.08,
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

                return () => {
                    tl.kill();
                };
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="hero"
            id="home"
        >
            <div className="hero__background" />

            <div className="hero__decor hero__decor--plus">
                <Sparkles size={30} />
            </div>

            <div className="hero__decor hero__decor--minus">
                <span
                    style={{
                        fontSize: "2rem",
                        fontFamily: "serif",
                    }}
                >
                    −
                </span>
            </div>

            <div className="container hero__container">
                <div
                    ref={contentRef}
                    className="hero__content"
                >

                    <div className="hero__eyebrow">
                        <span className="hero__eyebrow-line" />
                        <span>PREMIUM SKINCARE FROM DUBAI</span>
                    </div>

                    <h1 className="hero__title">
                        <span className="hero__title-main">
                            Premium
                        </span>
                        <span className="hero__title-main">
                            Whitening
                        </span>

                        <span className="hero__title-script">
                            Care
                        </span>
                    </h1>
                    <p className="hero__description">
                        Discover professionally crafted skincare
                        designed to help reveal brighter, clearer,
                        beautifully radiant-looking skin.
                    </p>

                    <div className="hero__actions">

                        <Link
                            to="/products"
                            className="nuvia-button nuvia-button--primary nuvia-button--large"
                        >
                            <span>Explore Our Products</span>
                            <ArrowRight size={17} />
                        </Link>

                        <Link
                            to="/wholesale"
                            className="hero__secondary-link"
                        >
                            Wholesale Inquiry
                            <ArrowRight size={15} />
                        </Link>

                    </div>

                    <div className="hero__note">
                        <span className="hero__note-line" />
                        <span>Cosmalac Pvt Ltd · Dubai, UAE</span>
                    </div>

                </div>

                <div className="hero__visual">
                    <div
                        ref={imageFrameRef}
                        className="hero__image-frame"
                    >
                        <img
                            src="/images/hero/cosmalac-hero.png"
                            alt="Cosmalac premium skincare"
                            fetchPriority="high"
                        />
                    </div>

                    <div ref={floatingCardRef}
                         className="hero__floating-card">

                        <div className="hero__floating-card-icon">
                            <Sparkles size={17} />
                        </div>

                        <div>
                            <strong>
                                Crafted with Care
                            </strong>

                            <span>
                                Premium skincare solutions
                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;