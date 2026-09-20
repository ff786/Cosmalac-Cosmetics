import { ArrowRight, Sparkles } from "lucide-react";

import products from "../../data/products.json";

import ProductCard from "../products/ProductCard";

const Products = () => {
    const featuredProducts = products.filter(
        (product) => product.featured
    );

    return (
        <section
            className="products-section section"
            id="products"
        >
            <div className="container">
                <div className="products-section__header">
                    <div>
                        <div className="eyebrow">
                            <Sparkles size={13} />
                            Our Collection
                        </div>

                        <h2>
                            Beauty,
                            <br />
                            <em>refined.</em>
                        </h2>
                    </div>

                    <p>
                        Discover Cosmalac's signature skincare
                        collection, created for women who value
                        thoughtful beauty and visible radiance.
                    </p>
                </div>

                <div className="products-section__grid">
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            showQuickAdd={false}
                        />
                    ))}
                </div>

                <div className="products-section__footer">
                    <a
                        href="/products"
                        className="products-section__link"
                    >
                        <span>Discover the collection</span>
                        <span className="products-section__link-icon">
              <ArrowRight size={17} />
            </span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Products;