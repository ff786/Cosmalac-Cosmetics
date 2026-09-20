import {
    ArrowRight,
    Award,
    Globe2,
    Leaf,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import Newsletter from "../components/forms/Newsletter";

const AboutPage = () => {
    return (
        <main className="about-page">
            {/* Hero */}

            <section className="about-page__hero">
                <div className="about-page__hero-image">
                    <img
                        src="/images/hero/cosmalac-hero.png"
                        alt="Cosmalac premium skincare"
                    />
                </div>

                <div className="about-page__hero-overlay" />

                <div className="container">
                    <div className="about-page__hero-content">
            <span className="eyebrow eyebrow-light">
              About Cosmalac
            </span>

                        <h1>
                            Beauty,
                            <br />
                            <em>made meaningful.</em>
                        </h1>

                        <p>
                            A Dubai-based skincare manufacturer
                            creating premium beauty products with
                            purpose, care and attention to detail.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story */}

            <section className="about-page__story section">
                <div className="container">
                    <div className="about-page__story-grid">
                        <div className="about-page__story-label">
              <span className="eyebrow">
                Our story
              </span>

                            <span className="about-page__number">
                01
              </span>
                        </div>

                        <div className="about-page__story-content">
                            <h2>
                                Professional skincare
                                <br />
                                <em>from Dubai.</em>
                            </h2>

                            <p>
                                Cosmalac Pvt Ltd is a professional
                                skincare manufacturer based in Dubai,
                                United Arab Emirates. We are focused on
                                developing beauty products that combine
                                carefully selected ingredients with
                                thoughtful formulation and professional
                                manufacturing.
                            </p>

                            <p>
                                Our goal is simple: create skincare
                                products that help women feel confident,
                                cared for and comfortable in their own
                                skin.
                            </p>

                            <a
                                href="/products"
                                className="about-page__link"
                            >
                                Explore our products
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}

            <section className="about-page__values section">
                <div className="container">
                    <div className="about-page__values-header">
            <span className="eyebrow">
              What guides us
            </span>

                        <h2>
                            Quality is in
                            <br />
                            <em>the details.</em>
                        </h2>
                    </div>

                    <div className="about-page__values-grid">
                        <article>
                            <div className="about-page__value-icon">
                                <Leaf size={22} />
                            </div>

                            <span>01</span>

                            <h3>
                                Thoughtful Ingredients
                            </h3>

                            <p>
                                We focus on carefully selected
                                ingredients that support purposeful
                                skincare formulations.
                            </p>
                        </article>

                        <article>
                            <div className="about-page__value-icon">
                                <ShieldCheck size={22} />
                            </div>

                            <span>02</span>

                            <h3>
                                Quality Focus
                            </h3>

                            <p>
                                Every product reflects our commitment
                                to consistency, presentation and
                                professional manufacturing.
                            </p>
                        </article>

                        <article>
                            <div className="about-page__value-icon">
                                <Globe2 size={22} />
                            </div>

                            <span>03</span>

                            <h3>
                                Global Ambition
                            </h3>

                            <p>
                                From Dubai, we connect with distributors
                                and beauty businesses across international
                                markets.
                            </p>
                        </article>

                        <article>
                            <div className="about-page__value-icon">
                                <Award size={22} />
                            </div>

                            <span>04</span>

                            <h3>
                                Professional Standards
                            </h3>

                            <p>
                                We continuously focus on building a
                                trusted and refined skincare brand.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Brand Statement */}

            <section className="about-page__statement">
                <div className="about-page__statement-decoration">
                    <Sparkles size={22} />
                </div>

                <div className="container">
                    <div className="about-page__statement-content">
            <span className="eyebrow">
              The Cosmalac philosophy
            </span>

                        <blockquote>
                            “When skincare is made with care,
                            confidence follows.”
                        </blockquote>

                        <p>
                            Premium beauty should feel considered,
                            trustworthy and effortless.
                        </p>
                    </div>
                </div>
            </section>

            {/* Manufacturing */}

            <section className="about-page__manufacturing section">
                <div className="container">
                    <div className="about-page__manufacturing-grid">
                        <div className="about-page__manufacturing-image">
                            <img
                                src="/images/products/queen-beauty-cream-8x.png"
                                alt="Cosmalac Queen Beauty Cream"
                                loading="lazy"
                            />
                        </div>

                        <div className="about-page__manufacturing-content">
              <span className="eyebrow">
                Made with intention
              </span>

                            <h2>
                                From formulation
                                <br />
                                <em>to confidence.</em>
                            </h2>

                            <p>
                                Cosmalac combines a premium visual
                                identity with a professional approach to
                                skincare manufacturing. Our products are
                                created to represent quality, care and
                                modern beauty.
                            </p>

                            <div className="about-page__manufacturing-points">
                                <div>
                                    <Sparkles size={17} />
                                    <span>
                    Carefully selected formulations
                  </span>
                                </div>

                                <div>
                                    <ShieldCheck size={17} />
                                    <span>
                    Quality-focused production
                  </span>
                                </div>

                                <div>
                                    <Globe2 size={17} />
                                    <span>
                    Dubai-based operations
                  </span>
                                </div>
                            </div>

                            <a
                                href="/#wholesale"
                                className="about-page__link"
                            >
                                Partner with Cosmalac
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Newsletter />
        </main>
    );
};

export default AboutPage;