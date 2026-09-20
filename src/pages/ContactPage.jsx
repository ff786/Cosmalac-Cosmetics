import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Contact from "../components/forms/Contact";
import { FAQ_ITEMS } from "../utils/constants";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
    const pageRef = useRef(null);
    const [openFaq, setOpenFaq] = useState(0);

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
                        <img
                            className="contact-page__hero-logo"
                            src="/images/logo/cosmalac-logo.png"
                            alt="Cosmalac"
                        />
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

            <section className="contact-page__faq section" id="faq">
                <div className="container">
                    <div className="contact-page__faq-heading">
                        <div>
                            <span className="contact-page__faq-eyebrow">
                                Frequently asked
                            </span>
                            <h2>
                                Questions,
                                <br />
                                <em>answered.</em>
                            </h2>
                        </div>
                        <p>
                            Find quick answers about Cosmalac, our formulas
                            and how to choose the right products.
                        </p>
                    </div>

                    <div className="contact-page__faq-list">
                        {FAQ_ITEMS.map((item, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <article
                                    className={
                                        isOpen
                                            ? "contact-page__faq-item is-open"
                                            : "contact-page__faq-item"
                                    }
                                    key={item.question}
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() =>
                                            setOpenFaq(isOpen ? null : index)
                                        }
                                    >
                                        <span className="contact-page__faq-number">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="contact-page__faq-question">
                                            {item.question}
                                        </span>
                                        <span className="contact-page__faq-toggle">
                                            <ChevronDown size={18} />
                                        </span>
                                    </button>

                                    <div
                                        className="contact-page__faq-answer-wrap"
                                        style={{
                                            gridTemplateRows: isOpen
                                                ? "1fr"
                                                : "0fr",
                                        }}
                                    >
                                        <div className="contact-page__faq-answer">
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
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
