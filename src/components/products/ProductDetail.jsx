import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    Check,
    Minus,
    Plus,
    ShieldCheck,
    ShoppingBag,
    Star,
} from "lucide-react";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = ({ product }) => {
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);

    const detailRef = useRef(null);
    const imageInnerRef = useRef(null);
    const visualRef = useRef(null);
    const productArtRef = useRef(null);
    const contentRef = useRef(null);
    const orbitRef = useRef(null);

    const dragState = useRef({
        active: false,
        startX: 0,
        rotation: 0,
    });

    useLayoutEffect(() => {
        const detail = detailRef.current;

        if (!detail) return;

        const ctx = gsap.context(() => {
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) {
                gsap.set(
                    [
                        imageInnerRef.current,
                        visualRef.current,
                        contentRef.current,
                        orbitRef.current,
                    ],
                    {
                        clearProps: "all",
                    }
                );

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: detail,
                    start: "top 82%",
                    end: "bottom 22%",
                    scrub: 1.1,
                    invalidateOnRefresh: true,
                },
            });

            timeline
                .fromTo(
                    imageInnerRef.current,
                    {
                        y: 90,
                        scale: 0.88,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        scale: 1,
                        opacity: 1,
                        ease: "power3.out",
                        duration: 1,
                    },
                    0
                )
                .fromTo(
                    visualRef.current,
                    {
                        rotateY: -18,
                        rotateZ: -5,
                        scale: 0.9,
                    },
                    {
                        rotateY: 0,
                        rotateZ: 0,
                        scale: 1,
                        ease: "power2.out",
                        duration: 1.1,
                    },
                    0
                )
                .fromTo(
                    orbitRef.current,
                    {
                        opacity: 0,
                        scale: 0.72,
                        rotate: -35,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        ease: "power3.out",
                        duration: 1,
                    },
                    0.08
                )
                .fromTo(
                    contentRef.current,
                    {
                        y: 55,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "power3.out",
                        duration: 0.8,
                    },
                    0.12
                )
                .to(
                    visualRef.current,
                    {
                        rotateY: 10,
                        rotateZ: 2.5,
                        y: -8,
                        ease: "none",
                        duration: 0.75,
                    },
                    0.95
                )
                .to(
                    visualRef.current,
                    {
                        rotateY: 0,
                        rotateZ: 0,
                        y: 0,
                        ease: "power2.out",
                        duration: 0.75,
                    },
                    1.7
                )
                .to(
                    orbitRef.current,
                    {
                        rotate: 25,
                        scale: 1.05,
                        ease: "none",
                        duration: 1.5,
                    },
                    0.7
                );
        }, detail);

        return () => ctx.revert();
    }, []);

    const handlePointerDown = (event) => {
        if (!productArtRef.current) return;

        event.currentTarget.setPointerCapture?.(event.pointerId);

        dragState.current = {
            active: true,
            startX: event.clientX,
            rotation: dragState.current.rotation,
        };
    };

    const handlePointerMove = (event) => {
        const state = dragState.current;

        if (!state.active || !productArtRef.current) return;

        const delta = event.clientX - state.startX;
        const nextRotation = Math.max(
            -18,
            Math.min(18, state.rotation + delta * 0.12)
        );

        productArtRef.current.style.setProperty(
            "--product-drag-rotation",
            `${nextRotation}deg`
        );
    };

    const handlePointerUp = () => {
        if (!productArtRef.current) return;

        const value =
            productArtRef.current.style.getPropertyValue(
                "--product-drag-rotation"
            );

        dragState.current.active = false;
        dragState.current.rotation =
            Number.parseFloat(value) || 0;
    };

    if (!product) {
        return null;
    }

    const decreaseQuantity = () => {
        setQuantity((current) => Math.max(1, current - 1));
    };

    const increaseQuantity = () => {
        setQuantity((current) => current + 1);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <section
            className="product-detail product-detail--scrollytelling"
            ref={detailRef}
        >
            <div className="product-detail__image">
                <div
                    className="product-detail__image-inner"
                    ref={imageInnerRef}
                >
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
                        className="product-detail__product-visual"
                        ref={visualRef}
                    >
                        <div
                            className="product-detail__product-art"
                            ref={productArtRef}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                            role="img"
                            aria-label={`${product.name} — drag to rotate`}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                draggable="false"
                            />
                        </div>
                    </div>

                    <span className="product-detail__rotate-hint">
                        Drag to rotate
                    </span>
                </div>
            </div>

            <div
                className="product-detail__content"
                ref={contentRef}
            >
                {product.badge && (
                    <span className="eyebrow">
                        {product.badge}
                    </span>
                )}

                <h1>{product.name}</h1>

                <div className="product-detail__rating">
                    <span className="product-detail__stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={14}
                                fill="currentColor"
                            />
                        ))}
                    </span>

                    <span>
                        {product.rating} · {product.reviewCount} reviews
                    </span>
                </div>

                <div className="product-detail__price">
                    {formatPrice(product.price, product.currency)}
                </div>

                <p className="product-detail__description">
                    {product.description}
                </p>

                <div className="product-detail__meta">
                    <span>{product.size}</span>

                    <span>
                        For {product.skinTypes.join(", ")} skin
                    </span>
                </div>

                <div className="product-detail__benefits">
                    <h3>Why you'll love it</h3>

                    <ul>
                        {product.benefits.map((benefit) => (
                            <li key={benefit}>
                                <Check size={15} />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="product-detail__purchase">
                    <div className="product-detail__quantity">
                        <button
                            type="button"
                            onClick={decreaseQuantity}
                            aria-label="Decrease quantity"
                        >
                            <Minus size={15} />
                        </button>

                        <span>{quantity}</span>

                        <button
                            type="button"
                            onClick={increaseQuantity}
                            aria-label="Increase quantity"
                        >
                            <Plus size={15} />
                        </button>
                    </div>

                    <button
                        type="button"
                        className="product-detail__add"
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                    >
                        <ShoppingBag size={18} />

                        {product.inStock
                            ? "Add to Bag"
                            : "Out of Stock"}
                    </button>
                </div>

                <div className="product-detail__assurance">
                    <ShieldCheck size={20} />

                    <div>
                        <strong>Thoughtful skincare</strong>

                        <span>
                            Carefully selected formulas designed
                            with your skin in mind.
                        </span>
                    </div>
                </div>

                <div className="product-detail__ingredients">
                    <h3>Key Ingredients</h3>

                    <div>
                        {product.ingredients.map((ingredient) => (
                            <span key={ingredient}>
                                {ingredient}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;