import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Contact from "../components/forms/Contact";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
    const pageRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) return;

            gsap.from(".contact-page__hero-orbit", {
                scale: 0.72,
                rotate: -25,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
            });

            gsap.from(".contact-page__hero-content > *", {
                y: 42,
                opacity: 0,
                stagger: 0.1,
                duration: 0.75,
                ease: "power3.out",
                delay: 0.15,
            });

            gsap.from(".contact-page__hero-card", {
                y: 55,
                opacity: 0,
                scale: 0.96,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.35,
            });

            gsap.utils.toArray(".contact-page__principle").forEach((item, index) => {
                gsap.from(item, {
                    y: 35,
                    opacity: 0,
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 88%",
                        once: true,
                    },
                });
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="contact-page" ref={pageRef}>
            <section className="contact-page__hero">
                <div className="contact-page__hero-orbit" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>

                <div className="container contact-page__hero-layout">
                    <div className="contact-page__hero-content">
                        <span className="eyebrow">
                            <Sparkles size={13} />
                            Let's connect
                        </span>

                        <h1>
                            We'd love to
                            <br />
                            <em>hear from you.</em>
                        </h1>

                        <p>
                            Questions about Cosmalac, our formulas, partnerships
                            or your market? Send us a message and our team will
                            get back to you.
                        </p>

                        <a
                            href="#contact-form"
                            className="contact-page__hero-link"
                        >
                            Send a message
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className="contact-page__hero-card">
                        <div className="contact-page__hero-card-glow" />
                        <span className="contact-page__hero-card-label">
                            COSMALAC · DUBAI
                        </span>
                        <div className="contact-page__hero-card-mark">
                            <span>C</span>
                        </div>
                        <p>Premium skincare. Thoughtfully connected.</p>
                    </div>
                </div>
            </section>

            <section className="contact-page__principles section">
                <div className="container">
                    <div className="contact-page__principles-grid">
                        <div className="contact-page__principle">
                            <span><Mail size={18} /></span>
                            <small>Email</small>
                            <a href="mailto:hello.cosmalac@gmail.com">
                                hello.cosmalac@gmail.com
                            </a>
                        </div>

                        <div className="contact-page__principle">
                            <span><Phone size={18} /></span>
                            <small>Phone</small>
                            <a href="tel:+971559915823">
                                +971 55 991 5823
                            </a>
                        </div>

                        <div className="contact-page__principle">
                            <span><MapPin size={18} /></span>
                            <small>Based in</small>
                            <p>Dubai, United Arab Emirates</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact-form" className="contact-page__form-section">
                <div className="container">
                    <Contact />
                </div>
            </section>
        </main>
    );
};

export default ContactPage;
