import { Heart, Plus, Star } from "lucide-react";

import { useCart } from "../../hooks/useCart";
import { useApp } from "../../context/AppContext";

import { formatPrice } from "../../utils/helpers";

const ProductCard = ({
                         product,
                         showQuickAdd = true,
                         onProductClick,
                     }) => {
    const { addToCart } = useCart();
    const { openProduct } = useApp();

    if (!product) {
        return null;
    }

    const handleProductClick = () => {
        if (onProductClick) {
            onProductClick(product);
            return;
        }

        openProduct(product);
    };

    const handleAddToCart = (event) => {
        event.stopPropagation();
        addToCart(product, 1);
    };

    return (
        <article
            className="product-card"
            onClick={handleProductClick}
        >
            <div className="product-card__image-wrapper">
                {product.badge && (
                    <span className="product-card__badge">
            {product.badge}
          </span>
                )}

                <button
                    type="button"
                    className="product-card__wishlist"
                    aria-label={`Add ${product.name} to wishlist`}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <Heart size={17} />
                </button>

                <div className="product-card__image">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                    />
                </div>

                {showQuickAdd && product.inStock && (
                    <button
                        type="button"
                        className="product-card__quick-add"
                        onClick={handleAddToCart}
                    >
                        <span>Add to bag</span>
                        <Plus size={16} />
                    </button>
                )}
            </div>

            <div className="product-card__content">
                <div className="product-card__rating">
          <span className="product-card__stars">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={12}
                    fill={
                        star <= Math.round(product.rating)
                            ? "currentColor"
                            : "none"
                    }
                />
            ))}
          </span>

                    <span>
            {product.rating} ({product.reviewCount})
          </span>
                </div>

                <h3 className="product-card__title">
                    {product.name}
                </h3>

                <p className="product-card__description">
                    {product.shortDescription}
                </p>

                <div className="product-card__footer">
          <span className="product-card__price">
            {formatPrice(
                product.price,
                product.currency
            )}
          </span>

                    <span className="product-card__size">
            {product.size}
          </span>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;