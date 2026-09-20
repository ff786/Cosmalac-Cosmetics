import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: "crown",
        category: "FACE CARE",
        name: "Crown Whitening",
        accent: "Beauty Cream",
        size: "20g / 0.7 oz",
        image: "/images/products/face_care.png",
        description:
            "A carefully formulated beauty cream designed to support a brighter, more even-looking complexion while caring for the appearance of common skin concerns.",
        benefits: [
            "Acne Spots",
            "Wrinkles",
            "Black Spots",
            "Dark Spots",
            "Dark Circles",
            "Under-Eye Darkness",
        ],
        ingredients: [
            "Alpha Arbutin",
            "Kojic Acid",
            "Licorice",
            "Vitamin C",
            "Vitamin A",
            "Vitamin E",
            "Vitamin B3",
            "Aloe Vera",
            "Avocado Oil",
        ],
    },
    /*
    {
        id: "queen",
        category: "NIGHT CARE",
        name: "Queen Beauty Cream",
        accent: "8X Whitening Night Cream",
        size: "Night Care Formula",
        image: "/images/products/face_care.png",
        description:
            "A dedicated night cream formulated with whitening and skin-conditioning ingredients for an overnight skincare routine.",
        benefits: [
            "Night-time Care",
            "Whitening Formula",
            "Skin Conditioning",
            "Moisture Support",
        ],
        ingredients: [
            "Arbutin",
            "Kojic Acid Dipalmitate",
            "Avobenzone",
            "Allantoin",
            "Vitamin E",
            "BHT",
            "Octyl Methoxy Cinnamate",
        ],
    },
    */
];

const Products = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return undefined;
        }

        const ctx = gsap.context(() => {
            const header = section.querySelector(
                ".products-section__header"
            );

            const cards = gsap.utils.toArray(
                ".products-showcase__item"
            );

            const footer = section.querySelector(
                ".products-section__footer"
            );

            gsap.fromTo(
                header,
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
                        trigger: header,
                        start: "top 82%",
                        once: true,
                    },
                }
            );

            cards.forEach((card, index) => {
                const media = card.querySelector(
                    ".products-showcase__media"
                );

                const content = card.querySelector(
                    ".products-showcase__content"
                );

                const direction =
                    index % 2 === 0 ? -50 : 50;

                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 80,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.1,
                        delay: index * 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 82%",
                            once: true,
                        },
                    }
                );

                gsap.fromTo(
                    media,
                    {
                        x: direction,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1.2,
                        delay: 0.1 + index * 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 82%",
                            once: true,
                        },
                    }
                );

                gsap.fromTo(
                    content,
                    {
                        x: direction * -0.65,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        delay: 0.18 + index * 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 82%",
                            once: true,
                        },
                    }
                );
            });

            if (footer) {
                gsap.fromTo(
                    footer,
                    {
                        y: 35,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: footer,
                            start: "top 90%",
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
            className="products-section"
            id="products"
        >
            <div className="container">
                {/* Section Header */}
                <div className="products-section__header">
                    <div>
                        <div className="section-eyebrow">
                            <span className="section-eyebrow__line" />
                            <span>Our Collection</span>
                        </div>

                        <h2>
                            Carefully crafted for
                            <em> radiant skin.</em>
                        </h2>
                    </div>

                    <p>
                        Discover Cosmalac's signature skincare
                        formulas, professionally developed in Dubai
                        with carefully selected ingredients and a
                        commitment to quality.
                    </p>
                </div>

                {/* Products */}
                <div className="products-showcase">
                    {products.map((product, index) => {
                        const reversed = index % 2 !== 0;

                        return (
                            <article
                                key={product.id}
                                className={`products-showcase__item ${
                                    reversed
                                        ? "products-showcase__item--reverse"
                                        : ""
                                }`}
                            >
                                {/* Product Image */}
                                <div className="products-showcase__media">

                                    <div className="products-showcase__glow" />

                                    <div className="products-showcase__image-wrap">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="products-showcase__image"
                                            loading={
                                                index === 0
                                                    ? "eager"
                                                    : "lazy"
                                            }
                                        />
                                    </div>

                                    <div className="products-showcase__media-label">
                                        <Sparkles size={14} />
                                        <span>
                                            COSMALAC FORMULA
                                        </span>
                                    </div>
                                </div>

                                {/* Product Information */}
                                <div className="products-showcase__content">
                                    <span className="products-showcase__category">
                                        {product.category}
                                    </span>

                                    <div className="products-showcase__title-row">
                                        <div>
                                            <h3>
                                                {product.name}
                                            </h3>

                                            <p className="products-showcase__accent">
                                                {product.accent}
                                            </p>
                                        </div>

                                        <span className="products-showcase__size">
                                            {product.size}
                                        </span>
                                    </div>

                                    <p className="products-showcase__description">
                                        {product.description}
                                    </p>

                                    {/* Benefits */}
                                    <div className="products-showcase__block">
                                        <span className="products-showcase__label">
                                            Key Benefits
                                        </span>

                                        <div className="products-showcase__benefits">
                                            {product.benefits.map(
                                                (benefit) => (
                                                    <span
                                                        key={
                                                            benefit
                                                        }
                                                    >
                                                        {benefit}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Ingredients */}
                                    <div className="products-showcase__block">
                                        <span className="products-showcase__label">
                                            Selected Ingredients
                                        </span>

                                        <div className="products-showcase__ingredients">
                                            {product.ingredients.map(
                                                (ingredient) => (
                                                    <span
                                                        key={
                                                            ingredient
                                                        }
                                                    >
                                                        {
                                                            ingredient
                                                        }
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <Link
                                        to="/#wholesale"
                                        className="products-showcase__cta"
                                    >
                                        <span>
                                            Wholesale Inquiry
                                        </span>

                                        <span className="products-showcase__cta-icon">
                                            <ArrowRight
                                                size={16}
                                            />
                                        </span>
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Footer CTA */}
                <div className="products-section__footer">
                    <p>
                        Interested in distributing Cosmalac
                        products?
                    </p>

                    <Link
                        to="/#wholesale"
                        className="products-section__link"
                    >
                        <span>
                            Talk to our wholesale team
                        </span>

                        <span className="products-section__link-icon">
                            <ArrowRight size={17} />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Products;