import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Building2, Globe2, Package, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Wholesale from "../components/forms/Wholesale";

const WholesalePage = () => {
    const pageRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) return;

            gsap.from(".wholesale-page__hero-content > *", {
                y: 34,
                opacity: 0,
                stagger: 0.1,
                duration: 0.75,
                ease: "power3.out",
            });

            gsap.from(".wholesale-page__hero-visual", {
                y: 40,
                opacity: 0,
                scale: 0.97,
                duration: 1,
                ease: "power3.out",
                delay: 0.2,
            });

            gsap.from(".wholesale-page__hero-stat", {
                y: 24,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
                delay: 0.35,
            });

            gsap.to(".wholesale-page__hero-orbit", {
                rotate: 360,
                duration: 28,
                repeat: -1,
                ease: "none",
            });

            gsap.utils.toArray(".wholesale__wrapper").forEach((section) => {
                gsap.from(section, {
                    y: 45,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 82%",
                        once: true,
                    },
                });
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="wholesale-page" ref={pageRef}>
            <section className="wholesale-page__hero">
                <div className="wholesale-page__hero-orbit" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>

                <div className="container">
                    <div className="wholesale-page__hero-content">
                        <span className="eyebrow">
                            <Sparkles size={13} />
                            Cosmalac Business
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

                    <div className="wholesale-page__hero-visual" aria-hidden="true">
                        <div className="wholesale-page__hero-visual-glow" />
                        <div className="wholesale-page__hero-visual-ring wholesale-page__hero-visual-ring--outer" />
                        <div className="wholesale-page__hero-visual-ring wholesale-page__hero-visual-ring--inner" />
                        <div className="wholesale-page__hero-visual-card">
                            <span>GLOBAL PARTNERSHIPS</span>
                            <strong>Cosmalac</strong>
                            <small>Dubai · UAE</small>
                        </div>
                        <div className="wholesale-page__hero-orbit">
                            <i />
                            <i />
                            <i />
                        </div>
                    </div>

                    <div className="wholesale-page__hero-stats">
                        <div className="wholesale-page__hero-stat">
                            <Building2 size={19} />
                            <span>Distributor partnerships</span>
                        </div>
                        <div className="wholesale-page__hero-stat">
                            <Package size={19} />
                            <span>Bulk & wholesale orders</span>
                        </div>
                        <div className="wholesale-page__hero-stat">
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
