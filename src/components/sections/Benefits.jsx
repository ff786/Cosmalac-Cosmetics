import {
    ArrowRight,
    Check,
    Droplets,
    Eye,
    Leaf,
    Moon,
    Sparkles,
    Sun,
} from "lucide-react";

const benefitIcons = {
    "Acne Spots": Sparkles,
    Wrinkles: Leaf,
    "Black Spots": Droplets,
    "Dark Spots": Sun,
    "Dark Circles": Eye,
    "Under-Eye Darkness": Moon,
};

const crownBenefits = [
    "Acne Spots",
    "Wrinkles",
    "Black Spots",
    "Dark Spots",
    "Dark Circles",
    "Under-Eye Darkness",
];

const Benefits = () => {
    return (
        <section className="benefits section" id="services">
            <div className="container">
                <div className="benefits__header">
                    <div>
            <span className="eyebrow">
              The Crown Collection
            </span>

                        <h2>
                            Six concerns.
                            <br />
                            <em>One ritual.</em>
                        </h2>
                    </div>

                    <p>
                        Crown Whitening Beauty Cream is formulated
                        with a blend of advanced skincare ingredients
                        and botanical extracts for a beautifully
                        radiant-looking complexion.
                    </p>
                </div>

                <div className="benefits__feature">
                    <div className="benefits__image">
                        <img
                            src="/images/products/crown-whitening-beauty-cream.png"
                            alt="Crown Whitening Beauty Cream"
                            loading="lazy"
                        />

                        <div className="benefits__image-label">
                            <Sparkles size={15} />
                            <span>Cosmalac Crown</span>
                        </div>
                    </div>

                    <div className="benefits__content">
            <span className="eyebrow">
              Crown Whitening Beauty Cream
            </span>

                        <h3>
                            Your nightly moment
                            <br />
                            of <em>radiance.</em>
                        </h3>

                        <p>
                            A carefully developed beauty cream designed
                            to help improve the appearance of uneven
                            tone, blemishes, dark spots, fine lines and
                            under-eye darkness.
                        </p>

                        <div className="benefits__list">
                            {crownBenefits.map((benefit) => {
                                const Icon =
                                    benefitIcons[benefit] || Check;

                                return (
                                    <div
                                        className="benefits__item"
                                        key={benefit}
                                    >
                    <span className="benefits__item-icon">
                      <Icon size={16} />
                    </span>

                                        <span>{benefit}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <a
                            href="/products/crown-whitening-beauty-cream"
                            className="benefits__link"
                        >
                            <span>Explore Crown Beauty Cream</span>
                            <ArrowRight size={17} />
                        </a>
                    </div>
                </div>

                {/*
                <div className="benefits__secondary">
                    <div className="benefits__secondary-content">
            <span className="eyebrow">
              Queen Beauty Cream 8X
            </span>

                        <h3>
                            Night care,
                            <br />
                            elevated.
                        </h3>

                        <p>
                            A rich nighttime formulation featuring a
                            carefully selected combination of skincare
                            ingredients for a smooth, hydrated and
                            brighter-looking complexion.
                        </p>

                        <div className="benefits__ingredient-row">
                            <span>Alpha Arbutin</span>
                            <span>Kojic Acid</span>
                            <span>Vitamin E</span>
                        </div>

                        <a
                            href="/products/queen-beauty-cream-8x"
                            className="benefits__link"
                        >
                            <span>Discover Queen 8X</span>
                            <ArrowRight size={17} />
                        </a>
                    </div>

                    <div className="benefits__secondary-image">
                        <img
                            src="/images/products/queen-beauty-cream-8x.png"
                            alt="Queen Beauty Cream 8X"
                            loading="lazy"
                        />
                    </div>
                </div>
                 */}           </div>
        </section>
    );
};

export default Benefits;