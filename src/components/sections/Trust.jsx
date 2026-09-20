import { useLayoutEffect, useRef } from "react";
import {
    Award,
    FlaskConical,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
    {
        number: "01",
        icon: FlaskConical,
        title: "Premium Ingredients",
        text: "Thoughtfully selected ingredients for refined skincare formulations.",
    },
    {
        number: "02",
        icon: ShieldCheck,
        title: "Professional Manufacturing",
        text: "Produced with a strong focus on consistency, quality and care.",
    },
    {
        number: "03",
        icon: Award,
        title: "Dubai Based",
        text: "Cosmalac Pvt Ltd is based in Dubai, United Arab Emirates.",
    },
];

const Trust = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return undefined;
        }

        const ctx = gsap.context(() => {
            const intro = section.querySelector(".trust__intro");
            const items = gsap.utils.toArray(".trust__item");
            const statement = section.querySelector(".trust__statement");

            gsap.fromTo(
                intro,
                {
                    y: 60,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: intro,
                        start: "top 82%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                items,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.14,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section.querySelector(".trust__grid"),
                        start: "top 82%",
                        once: true,
                    },
                }
            );

            if (statement) {
                gsap.fromTo(
                    statement,
                    {
                        y: 25,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: statement,
                            start: "top 92%",
                            once: true,
                        },
                    }
                );
            }
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="trust section"
            id="about"
        >
            <div className="container">

                {/* Intro */}
                <div className="trust__intro">

                    <div className="trust__eyebrow">
                        <span className="trust__eyebrow-line" />
                        <Sparkles size={14} />
                        <span>Quality you can feel</span>
                    </div>

                    <h2>
                        Crafted with
                        <em> care.</em>
                        <br />
                        Made for confidence.
                    </h2>

                    <p>
                        Cosmalac brings together carefully selected
                        ingredients, professional manufacturing and
                        thoughtful skincare solutions designed for
                        modern beauty.
                    </p>
                </div>

                {/* Trust Items */}
                <div className="trust__grid">
                    {trustItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <article
                                className="trust__item"
                                key={item.title}
                            >
                                <div className="trust__item-top">
                                    <span className="trust__number">
                                        {item.number}
                                    </span>

                                    <div className="trust__icon">
                                        <Icon
                                            size={23}
                                            strokeWidth={1.4}
                                        />
                                    </div>
                                </div>

                                <div className="trust__item-content">
                                    <h3>{item.title}</h3>

                                    <p>{item.text}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Brand Statement
                <div className="trust__statement">

                    <div className="trust__statement-icon">
                        <Gem size={18} strokeWidth={1.5} />
                    </div>

                    <div className="trust__statement-content">
                        <span className="trust__statement-label">
                            COSMALAC
                        </span>

                        <span className="trust__statement-text">
                            Premium skincare manufacturing from
                            Dubai, UAE
                        </span>
                    </div>

                    <div className="trust__line" />
                </div>
                {/* End Brand Statement */}

            </div>
        </section>
    );
};

export default Trust;