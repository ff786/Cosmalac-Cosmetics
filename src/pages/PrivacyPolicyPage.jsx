import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => (
    <main className="legal-page">
        <section className="legal-page__hero">
            <div className="container legal-page__container">
                <span className="eyebrow">Cosmalac</span>
                <h1>Privacy <em>Policy.</em></h1>
                <p>
                    How Cosmalac handles information provided through this
                    website and the browser storage used for essential
                    functionality.
                </p>
                <small>Last updated: September 21, 2026</small>
            </div>
        </section>

        <section className="legal-page__body section">
            <div className="container legal-page__content">
                <article>
                    <h2>1. About this policy</h2>
                    <p>
                        This Privacy Policy explains how Cosmalac Pvt Ltd
                        ("Cosmalac", "we", "us" or "our") handles information
                        when you use this website.
                    </p>
                </article>

                <article>
                    <h2>2. Information you provide</h2>
                    <p>
                        You may choose to provide your name, email address,
                        phone number and message details through our contact
                        or wholesale inquiry forms. The current website uses
                        WhatsApp to help you continue those conversations.
                    </p>
                </article>

                <article>
                    <h2>3. How information is used</h2>
                    <p>
                        Information you provide is used to respond to your
                        inquiry, discuss products or partnerships, and provide
                        customer or business support related to your request.
                    </p>
                </article>

                <article>
                    <h2>4. WhatsApp and external services</h2>
                    <p>
                        When you choose to continue an inquiry through
                        WhatsApp, the conversation is handled by WhatsApp and
                        is subject to its own privacy practices and terms.
                        External services can process information according to
                        their own policies.
                    </p>
                </article>

                <article>
                    <h2>5. Browser storage and cookies</h2>
                    <p>
                        This website may use browser storage for essential
                        functionality, such as retaining product or interface
                        preferences. A small cookie records your cookie/privacy
                        preference so the consent banner does not repeatedly
                        appear. The current site does not intentionally enable
                        advertising or analytics cookies.
                    </p>
                </article>

                <article>
                    <h2>6. Data sharing and retention</h2>
                    <p>
                        We do not sell personal information. Information may be
                        shared with service providers when necessary to operate
                        the website or respond to a request, or when required
                        by law. Retention depends on the purpose of the
                        interaction and any applicable legal requirements.
                    </p>
                </article>

                <article>
                    <h2>7. Security</h2>
                    <p>
                        We use reasonable technical and organizational
                        measures appropriate to this website to reduce the
                        risk of unauthorized access, misuse or loss. No
                        internet transmission or storage method can be
                        guaranteed to be completely secure.
                    </p>
                </article>

                <article>
                    <h2>8. Your choices</h2>
                    <p>
                        You can avoid submitting information through the forms
                        and can contact us directly with privacy questions or
                        requests.
                    </p>
                </article>

                <article>
                    <h2>9. Contact</h2>
                    <p>
                        For privacy questions, contact
                        hello.cosmalac@gmail.com or call +94 75 569 7476.
                    </p>
                </article>

                <div className="legal-page__actions">
                    <Link to="/terms">Read Terms & Conditions</Link>
                    <Link to="/contact">Contact Cosmalac</Link>
                </div>
            </div>
        </section>
    </main>
);

export default PrivacyPolicyPage;
