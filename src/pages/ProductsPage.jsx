import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search, Sparkles } from "lucide-react";

import products from "../data/products.json";

import ProductCard from "../components/products/ProductCard";
import ProductDetail from "../components/products/ProductDetail";
import Button from "../components/common/Button";

const ProductsPage = () => {
    const [selectedProduct, setSelectedProduct] =
        useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) {
            return products;
        }

        return products.filter((product) => {
            return (
                product.name.toLowerCase().includes(query) ||
                product.description
                    .toLowerCase()
                    .includes(query) ||
                product.ingredients.some((ingredient) =>
                    ingredient.toLowerCase().includes(query)
                )
            );
        });
    }, [searchTerm]);

    if (selectedProduct) {
        return (
            <main className="products-page">
                <section className="products-page__detail section">
                    <div className="container">
                        <button
                            type="button"
                            className="products-page__back"
                            onClick={() => setSelectedProduct(null)}
                        >
                            <ArrowLeft size={16} />
                            Back to collection
                        </button>

                        <ProductDetail product={selectedProduct} />
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="products-page">
            <section className="products-page__hero">
                <div className="products-page__hero-glow" />

                <div className="container">
                    <div className="products-page__hero-content">
            <span className="eyebrow">
              <Sparkles size={13} />
              The Cosmalac Collection
            </span>

                        <h1>
                            Skincare with
                            <br />
                            <em>purpose.</em>
                        </h1>

                        <p>
                            Discover our signature beauty creams,
                            thoughtfully developed in Dubai with
                            carefully selected skincare ingredients.
                        </p>
                    </div>
                </div>
            </section>

            <section className="products-page__collection section">
                <div className="container">
                    <div className="products-page__toolbar">
                        <div>
              <span className="products-page__count">
                {filteredProducts.length}{" "}
                  {filteredProducts.length === 1
                      ? "Product"
                      : "Products"}
              </span>

                            <h2>
                                Our signature formulas
                            </h2>
                        </div>

                        <div className="products-page__search">
                            <Search size={17} />

                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                placeholder="Search our collection"
                                aria-label="Search products"
                            />
                        </div>
                    </div>

                    <div className="products-page__grid">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="products-page__item"
                            >
                                <ProductCard
                                    product={product}
                                    showQuickAdd={false}
                                    onProductClick={() =>
                                        setSelectedProduct(product)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    {!filteredProducts.length && (
                        <div className="products-page__empty">
                            <Sparkles size={26} />

                            <h3>
                                Nothing found
                            </h3>

                            <p>
                                Try searching for another product or
                                ingredient.
                            </p>

                            <Button
                                onClick={() => setSearchTerm("")}
                            >
                                View All Products
                            </Button>
                        </div>
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
                                Interested in
                                <br />
                                <em>Cosmalac?</em>
                            </h2>

                            <p>
                                Speak with our team about wholesale,
                                distribution and B2B opportunities.
                            </p>
                        </div>

                        <a
                            href="/#wholesale"
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