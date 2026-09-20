import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Search, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import products from "../data/products.json";
import Button from "../components/common/Button";

gsap.registerPlugin(ScrollTrigger);

const filters = [
    { id: "all", label: "All Products" },
    { id: "crown", label: "Crown Collection" },
    // { id: "night", label: "Night Care" },
];

const ProductsPage = () => {
    const pageRef = useRef(null);
    const gridRef = useRef(null);
    const spotlightRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [activeProductId, setActiveProductId] = useState(null);
    const [showIngredients, setShowIngredients] = useState(false);

    const activeProduct = useMemo(
        () => products.find((product) => product.id === activeProductId) || null,
        [activeProductId]
    );

    const filteredProducts = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        // Queen Beauty Cream is temporarily hidden site-wide.
        const availableProducts = products.filter(
            (product) => product.id !== "queen-beauty-cream-8x"
        );

        return availableProducts.filter((product) => {
            const matchesSearch =
                !query ||
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.ingredients.some((ingredient) =>
                    ingredient.toLowerCase().includes(query)
                );

            const matchesFilter =
                activeFilter === "all" ||
                (activeFilter === "crown" &&
                    product.id === "crown-whitening-beauty-cream");

            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, activeFilter]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const intro = gsap.timeline();

            intro
                .from(".products-page__hero-orbit", {
                    scale: 0.7,
                    rotate: -20,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out",
                })
                .from(
                    ".products-page__hero-content > *",
                    {
                        y: 35,
                        opacity: 0,
                        stagger: 0.09,
                        duration: 0.7,
                        ease: "power3.out",
                    },
                    "-=0.75"
                );

            gsap.utils.toArray(".products-page__item").forEach((item, index) => {
                gsap.from(item, {
                    y: 60,
                    opacity: 0,
                    scale: 0.96,
                    duration: 0.8,
                    delay: index * 0.06,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 88%",
                        once: true,
                    },
                });
            });

            gsap.to(".products-page__hero-product", {
                y: -18,
                rotate: 2,
                duration: 3.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".products-page__hero-orbit", {
                rotate: 360,
                duration: 24,
                repeat: -1,
                ease: "none",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        if (!gridRef.current) return;

        gsap.fromTo(
            gridRef.current,
            { opacity: 0.45 },
            {
                opacity: 1,
                duration: 0.35,
                ease: "power2.out",
            }
        );
    }, [filteredProducts]);

    useLayoutEffect(() => {
        if (!activeProduct || !spotlightRef.current) return;

        gsap.fromTo(
            spotlightRef.current,
            {
                opacity: 0,
                y: 35,
                scale: 0.985,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
            }
        );

        requestAnimationFrame(() => {
            spotlightRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        });
    }, [activeProduct]);

    const handleProductSelect = (product) => {
        setActiveProductId((current) =>
            current === product.id ? null : product.id
        );
        setShowIngredients(false);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setActiveFilter("all");
    };

    return (
        <main className="products-page" ref={pageRef}>
            <section className="products-page__hero">
                <div className="products-page__hero-orbit" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>

                <div className="products-page__hero-glow" />

                <div className="container products-page__hero-layout">
                    <div className="products-page__hero-content">
                        <span className="eyebrow">
                            <Sparkles size={13} />
                            The Cosmalac Collection
                        </span>

                        <h1>
                            Discover
                            <br />
                            <em>Cosmalac.</em>
                        </h1>

                        <p>
                            One signature formula. A premium skincare
                            collection from Dubai.
                        </p>

                        <a
                            href="#collection"
                            className="products-page__hero-link"
                        >
                            Explore collection
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className="products-page__hero-product" aria-hidden="true">
                        <div className="products-page__hero-product-glow" />

                        <img
                            src="/images/products/crown-whitening-beauty-cream.png"
                            alt=""
                        />

                        <span className="products-page__hero-product-label">
                            CROWN
                        </span>
                    </div>
                </div>
            </section>

            <section
                className="products-page__collection section"
                id="collection"
            >
                <div className="container">
                    <div className="products-page__toolbar">
                        <div className="products-page__heading">
                            <span className="products-page__count">
                                {filteredProducts.length}{" "}
                                {filteredProducts.length === 1
                                    ? "Formula"
                                    : "Formulas"}
                            </span>

                            <h2>
                                Signature
                                <br />
                                <em>formulas.</em>
                            </h2>
                        </div>

                        <div className="products-page__controls">
                            <div className="products-page__filters" role="tablist">
                                {filters.map((filter) => (
                                    <button
                                        key={filter.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={activeFilter === filter.id}
                                        className={
                                            activeFilter === filter.id
                                                ? "is-active"
                                                : ""
                                        }
                                        onClick={() => setActiveFilter(filter.id)}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>

                            <label className="products-page__search">
                                <Search size={16} />
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    placeholder="Search ingredients or formulas"
                                    aria-label="Search products and ingredients"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="products-page__grid" ref={gridRef}>
                        {filteredProducts.map((product, index) => {
                            const isActive = activeProductId === product.id;

                            return (
                                <article
                                    key={product.id}
                                    className={
                                        "products-page__item" +
                                        (isActive
                                            ? " products-page__item--active"
                                            : "")
                                    }
                                    style={{ "--card-index": index }}
                                    onClick={() => handleProductSelect(product)}
                                >
                                    <div className="products-page__card">
                                        <div className="products-page__card-media">
                                            <span className="products-page__card-number">
                                                0{index + 1}
                                            </span>

                                            <span className="products-page__card-badge">
                                                {product.badge}
                                            </span>

                                            <div className="products-page__card-glow" />

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                            />

                                            <span className="products-page__card-action">
                                                {isActive ? "Close" : "Explore"}
                                                <ArrowRight size={14} />
                                            </span>
                                        </div>

                                        <div className="products-page__card-content">
                                            <div>
                                                <span className="products-page__card-kicker">
                                                    {product.size}
                                                </span>

                                                <h3>{product.name}</h3>
                                            </div>

                                            <ChevronDown
                                                className={
                                                    isActive
                                                        ? "products-page__card-chevron is-open"
                                                        : "products-page__card-chevron"
                                                }
                                                size={19}
                                            />
                                        </div>

                                        <div className="products-page__card-benefits">
                                            {product.benefits.slice(0, 3).map((benefit) => (
                                                <span key={benefit.title}>
                                                    <Check size={12} />
                                                    {benefit.title}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {!filteredProducts.length && (
                        <div className="products-page__empty">
                            <Sparkles size={26} />
                            <h3>Nothing found</h3>
                            <p>Try another product name or ingredient.</p>
                            <Button onClick={clearFilters}>
                                View All Products
                            </Button>
                        </div>
                    )}

                    {activeProduct && (
                        <section
                            className="products-page__spotlight"
                            ref={spotlightRef}
                        >
                            <div className="products-page__spotlight-media">
                                <div className="products-page__spotlight-glow" />
                                <img
                                    src={activeProduct.image}
                                    alt={activeProduct.name}
                                />
                                <span>{activeProduct.badge}</span>
                            </div>

                            <div className="products-page__spotlight-content">
                                <span className="products-page__spotlight-kicker">
                                    Selected formula
                                </span>

                                <h2>{activeProduct.name}</h2>

                                <p className="products-page__spotlight-size">
                                    {activeProduct.size}
                                </p>

                                <div className="products-page__benefit-list">
                                    {activeProduct.benefits.map((benefit) => (
                                        <span key={benefit.title}>
                                            <Check size={13} />
                                            {benefit.title}
                                        </span>
                                    ))}
                                </div>

                                <div className="products-page__ingredients">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowIngredients((value) => !value)
                                        }
                                    >
                                        <span>
                                            {activeProduct.ingredients.length} selected
                                            ingredients
                                        </span>
                                        <ChevronDown
                                            className={
                                                showIngredients ? "is-open" : ""
                                            }
                                            size={18}
                                        />
                                    </button>

                                    <div
                                        className={
                                            showIngredients
                                                ? "products-page__ingredients-list is-open"
                                                : "products-page__ingredients-list"
                                        }
                                    >
                                        {activeProduct.ingredients.map((ingredient) => (
                                            <span key={ingredient}>{ingredient}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="products-page__spotlight-actions">
                                    <a href="/wholesale">
                                        Wholesale Inquiry
                                        <ArrowRight size={16} />
                                    </a>

                                    <button
                                        type="button"
                                        onClick={() => setActiveProductId(null)}
                                    >
                                        Back to collection
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </section>

            <section className="products-page__b2b">
                <div className="container">
                    <div className="products-page__b2b-inner">
                        <div>
                            <span className="eyebrow eyebrow-light">
                                For distributors & bulk buyers
                            </span>

                            <h2>
                                Bring
                                <br />
                                <em>Cosmalac</em> to your market.
                            </h2>

                            <p>
                                Wholesale and distribution opportunities are
                                available for qualified partners.
                            </p>
                        </div>

                        <a
                            href="/wholesale"
                            className="products-page__b2b-button"
                        >
                            Wholesale Inquiry
                            <ArrowRight size={17} />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductsPage;
