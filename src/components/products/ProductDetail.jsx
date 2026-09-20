import { useState } from "react";

import {
    Check,
    Minus,
    Plus,
    ShieldCheck,
    ShoppingBag,
    Star,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

import { formatPrice } from "../../utils/helpers";

const ProductDetail = ({ product }) => {
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return null;
    }

    const decreaseQuantity = () => {
        setQuantity((current) =>
            Math.max(1, current - 1)
        );
    };

    const increaseQuantity = () => {
        setQuantity((current) => current + 1);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <section className="product-detail">
            <div className="product-detail__image">
                <div className="product-detail__image-inner">
                    <img
                        src={product.image}
                        alt={product.name}
                    />
                </div>
            </div>

            <div className="product-detail__content">
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
                    {formatPrice(
                        product.price,
                        product.currency
                    )}
                </div>

                <p className="product-detail__description">
                    {product.description}
                </p>

                <div className="product-detail__meta">
                    <span>{product.size}</span>

                    <span>For {product.skinTypes.join(", ")} skin</span>
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