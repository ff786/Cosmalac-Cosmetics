import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown, HelpCircle, Mail, MessageCircle, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FAQ_ITEMS } from "../utils/constants";

gsap.registerPlugin(ScrollTrigger);

const FAQPage = () => {
    const pageRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) return;

            gsap.from(".faq-page__hero-content > *", {
                y: 35,
                opacity: 0,
                stagger: 0.09,
                duration: 0.75,
                ease: "power3.out",
            });

            gsap.from(".faq-page__hero-card", {
                y: 50,
                opacity: 0,
                scale: 0.96,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.2,
            });

            gsap.from(".faq-page__item", {
                y: 35,
                opacity: 0,
                stagger: 0.08,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".faq-page__list",
                    start: "top 82%",
                    once: true,
                },
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="faq-page" ref={pageRef}>
            <section className="faq-page__hero">
                <div className="faq-page__hero-orbit" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>

                <div className="container faq-page__hero-layout">
                    <div className="faq-page__hero-content">
                        <span className="eyebrow">
                            <Sparkles size={13} />
                            Cosmalac · FAQ
                        </span>

                        <h1>
                            Questions,
                            <br />
                            <em>answered.</em>
                        </h1>

                        <p>
                            Everything you need to know about Cosmalac,
                            our skincare formulas and getting in touch with
                            our team.
                        </p>

                        <a href="#faq-list" className="faq-page__hero-link">
                            Explore FAQs
                            <ChevronDown size={16} />
                        </a>
                    </div>

                    <div className="contact-page__hero-card faq-page__hero-card">
                        <div className="contact-page__hero-card-glow" />
                        <span className="contact-page__hero-card-label">
                            COSMALAC · DUBAI
                        </span>
                        <div className="contact-page__hero-card-mark">
                            <img
                                src="/images/logo/cosmalac-logo.png"
                                alt="Cosmalac"
                            />
                        </div>
                        <p>Premium skincare. Thoughtfully connected.</p>
                    </div>
                </div>
            </section>

            <section className="faq-page__content section" id="faq-list">
                <div className="container">
                    <div className="faq-page__heading">
                        <div>
                            <span className="faq-page__eyebrow">
                                Frequently asked
                            </span>
                            <h2>
                                Everything,
                                <br />
                                <em>in one place.</em>
                            </h2>
                        </div>

                        <p>
                            Can't find what you're looking for? Our team is
                            always happy to help.
                        </p>
                    </div>

                    <div className="faq-page__list">
                        {FAQ_ITEMS.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <article
                                    className={
                                        isOpen
                                            ? "faq-page__item is-open"
                                            : "faq-page__item"
                                    }
                                    key={item.question}
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() =>
                                            setOpenIndex(
                                                isOpen ? null : index
                                            )
                                        }
                                    >
                                        <span className="faq-page__number">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="faq-page__question">
                                            {item.question}
                                        </span>

                                        <span className="faq-page__toggle">
                                            <ChevronDown size={18} />
                                        </span>
                                    </button>

                                    <div
                                        className="faq-page__answer-wrap"
                                        style={{
                                            gridTemplateRows: isOpen
                                                ? "1fr"
                                                : "0fr",
                                        }}
                                    >
                                        <div className="faq-page__answer">
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="faq-page__contact">
                <div className="container">
                    <div className="faq-page__contact-inner">
                        <div>
                            <span className="eyebrow eyebrow-light">
                                Still have a question?
                            </span>
                            <h2>
                                We're here
                                <br />
                                <em>to help.</em>
                            </h2>
                        </div>

                        <div className="faq-page__contact-actions">
                            <a href="/contact">
                                <MessageCircle size={16} />
                                Contact Us
                            </a>
                            <a href="mailto:hello.cosmalac@gmail.com">
                                <Mail size={16} />
                                Email Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default FAQPage;
