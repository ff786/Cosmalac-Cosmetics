import { ArrowRight, Building2, Globe2, Package, Sparkles } from "lucide-react";
import Wholesale from "../components/forms/Wholesale";

const WholesalePage = () => {
    return (
        <main className="wholesale-page">
            <section className="wholesale-page__hero">
                <div className="wholesale-page__hero-orbit" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>

                <div className="container">
                    <div className="wholesale-page__hero-content">
                        <span className="eyebrow">
                            <Sparkles size={13} />
                            Cosmalac Business
                        </span>

                        <h1>
                            Grow with
                            <br />
                            <em>Cosmalac.</em>
                        </h1>

                        <p>
                            Wholesale, distribution and B2B opportunities
                            for partners looking to bring premium Dubai
                            skincare to their market.
                        </p>

                        <a
                            href="#wholesale-inquiry"
                            className="wholesale-page__hero-link"
                        >
                            Start an inquiry
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className="wholesale-page__hero-stats">
                        <div>
                            <Building2 size={19} />
                            <span>Distributor partnerships</span>
                        </div>
                        <div>
                            <Package size={19} />
                            <span>Bulk & wholesale orders</span>
                        </div>
                        <div>
                            <Globe2 size={19} />
                            <span>International inquiries</span>
                        </div>
                    </div>
                </div>
            </section>

            <div id="wholesale-inquiry">
                <Wholesale />
            </div>
        </main>
    );
};

export default WholesalePage;
