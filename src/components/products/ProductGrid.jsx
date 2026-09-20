import ProductCard from "./ProductCard";

const ProductGrid = ({
                         products = [],
                         columns = 4,
                         emptyMessage = "No products found.",
                     }) => {
    if (!products.length) {
        return (
            <div className="product-grid__empty">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div
            className={[
                "product-grid",
                `product-grid--${columns}`,
            ].join(" ")}
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductGrid;