import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, Minus, Plus, ShieldCheck } from "lucide-react";

import { useCart } from "../../context/CartContext";
import ThreeProductViewer from "./ThreeProductViewer";

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = ({ product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const detailRef = useRef(null);
    const imageInnerRef = useRef(null);
    const visualRef = useRef(null);
    const contentRef = useRef(null);
    const orbitRef = useRef(null);
    const shadowRef = useRef(null);
    const progressRef = useRef(null);

    useLayoutEffect(() => {
        const detail = detailRef.current;
        if (!detail) return;

        const ctx = gsap.context(() => {
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) return;

            const float = gsap.to(visualRef.current, {
                y: -14,
                rotationZ: 1.2,
                duration: 4.6,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });

            const shadow = gsap.to(shadowRef.current, {
                scaleX: 0.72,
                opacity: 0.4,
                duration: 4.6,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });

            gsap.to(orbitRef.current, {
                rotation: 360,
                duration: 28,
                ease: "none",
                repeat: -1,
            });

            const entrance = gsap.timeline({
                scrollTrigger: {
                    trigger: detail,
                    start: "top 78%",
                    end: "bottom 28%",
                    scrub: 1.1,
                    invalidateOnRefresh: true,
                },
            });

            entrance
                .fromTo(
                    imageInnerRef.current,
                    { y: 80, scale: 0.9, opacity: 0 },
                    { y: 0, scale: 1, opacity: 1, duration: 1 },
                    0
                )
                .fromTo(
                    contentRef.current,
                    { y: 55, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    0.12
                )
                .fromTo(
                    orbitRef.current,
                    { scale: 0.7, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8 },
                    0
                )
                .to(
                    visualRef.current,
                    {
                        y: -55,
                        rotateY: 16,
                        rotateX: -4,
                        rotateZ: -4,
                        scale: 1.05,
                        duration: 1.2,
                        ease: "none",
                    },
                    0.8
                )
                .to(
                    visualRef.current,
                    {
                        y: -10,
                        rotateY: -13,
                        rotateX: 3,
                        rotateZ: 3,
                        scale: 1.01,
                        duration: 1.1,
                        ease: "none",
                    },
                    2
                )
                .to(
                    visualRef.current,
                    {
                        y: 0,
                        rotateY: 0,
                        rotateX: 0,
                        rotateZ: 0,
                        scale: 1,
                        duration: 1,
                    },
                    3.1
                );

            ScrollTrigger.create({
                trigger: detail,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    if (progressRef.current) {
                        progressRef.current.style.setProperty(
                            "--product-progress",
                            self.progress
                        );
                    }

                    window.dispatchEvent(
                        new CustomEvent("cosmalac:product-scroll", {
                            detail: { progress: self.progress },
                        })
                    );
                },
            });

            return () => {
                float.kill();
                shadow.kill();
            };
        }, detail);

        return () => ctx.revert();
    }, []);

    if (!product) return null;

    const benefits = (product.benefits || []).map((benefit) =>
        typeof benefit === "string" ? benefit : benefit.title
    );

    const selectedIngredients = (product.ingredients || []).slice(0, 9);

    const decreaseQuantity = () =>
        setQuantity((current) => Math.max(1, current - 1));

    const increaseQuantity = () =>
        setQuantity((current) => current + 1);

    const handleWholesale = () => {
        window.location.href = "/#wholesale";
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <section
            className="product-detail product-detail--scrollytelling"
            ref={detailRef}
        >
            <div className="product-detail__progress" ref={progressRef}>
                <span>01</span>
                <i />
                <span className="is-active">02</span>
                <i />
                <span>03</span>
                <i />
                <span>04</span>
            </div>

            <div className="product-detail__image">
                <div
                    className="product-detail__image-inner"
                    ref={imageInnerRef}
                >
                    <div className="product-detail__ambient-glow" />

                    <div
                        className="product-detail__orbit"
                        ref={orbitRef}
                        aria-hidden="true"
                    >
                        <span />
                        <span />
                        <span />
                    </div>

                    <div
                        className="product-detail__particles"
                        aria-hidden="true"
                    >
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>

                    <div
                        className="product-detail__air-shadow"
                        ref={shadowRef}
                        aria-hidden="true"
                    />

                    <div
                        className="product-detail__product-visual"
                        ref={visualRef}
                    >
                        <ThreeProductViewer product={product} />
                    </div>

                    <div className="product-detail__interaction">
                        <span className="product-detail__interaction-degree">
                            360°
                        </span>
                        <span>Drag to rotate</span>
                    </div>

                    <span className="product-detail__scroll-cue">
                        Scroll to explore ↓
                    </span>

                    <span className="product-detail__microcopy">
                        Pure care<br />Radiant you
                    </span>
                </div>
            </div>

            <div
                className="product-detail__content"
                ref={contentRef}
            >
                <span className="product-detail__category">
                    {product.badge || "Face Care"}
                </span>

                <h1>
                    {product.name
                        .replace(" Beauty Cream", "")
                        .replace(" 8X Whitening Night Cream", "")}
                    <em>
                        {product.name.includes("Queen")
                            ? "Beauty Night Cream"
                            : "Beauty Cream"}
                    </em>
                </h1>

                <span className="product-detail__size">
                    {product.size || "20G / 0.7 OZ"}
                </span>

                <p className="product-detail__description">
                    {product.description}
                </p>

                <div className="product-detail__info-block">
                    <h3>Key Benefits</h3>
                    <div className="product-detail__benefit-pills">
                        {benefits.map((benefit) => (
                            <span key={benefit}>
                                <Check size={12} />
                                {benefit}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="product-detail__info-block">
                    <h3>Selected Ingredients</h3>
                    <div className="product-detail__ingredient-line">
                        {selectedIngredients.map((ingredient, index) => (
                            <span key={ingredient}>
                                {ingredient}
                                {index < selectedIngredients.length - 1 && (
                                    <b>•</b>
                                )}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="product-detail__actions">
                    <button
                        type="button"
                        className="product-detail__wholesale"
                        onClick={handleWholesale}
                    >
                        Wholesale Inquiry
                        <span>
                            <ArrowRight size={18} />
                        </span>
                    </button>

                    <button
                        type="button"
                        className="product-detail__purchase-toggle"
                        onClick={handleAddToCart}
                        aria-label="Add one product to bag"
                    >
                        +
                    </button>
                </div>

                <div className="product-detail__assurance">
                    <ShieldCheck size={17} />
                    <span>Professionally manufactured in Dubai</span>
                </div>

                <div className="product-detail__hidden-quantity" aria-hidden="true">
                    <button type="button" onClick={decreaseQuantity}>
                        <Minus size={12} />
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={increaseQuantity}>
                        <Plus size={12} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
