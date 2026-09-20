import { Link } from "react-router-dom";

const TermsPage = () => (
    <main className="legal-page">
        <section className="legal-page__hero">
            <div className="container legal-page__container">
                <span className="eyebrow">Cosmalac</span>
                <h1>Terms & <em>Conditions.</em></h1>
                <p>
                    The terms that apply when you access and use the Cosmalac
                    website.
                </p>
                <small>Last updated: September 21, 2026</small>
            </div>
        </section>

        <section className="legal-page__body section">
            <div className="container legal-page__content">
                <article>
                    <h2>1. Website use</h2>
                    <p>
                        This website is provided for information about Cosmalac,
                        its skincare products, partnerships and business
                        inquiries. By using the website, you agree to use it
                        lawfully and respectfully.
                    </p>
                </article>

                <article>
                    <h2>2. Product information</h2>
                    <p>
                        Product descriptions, ingredients, images and other
                        information are provided for general information and
                        may be updated without notice. Product information is
                        not medical advice and does not replace advice from a
                        qualified healthcare professional.
                    </p>
                </article>

                <article>
                    <h2>3. Business inquiries</h2>
                    <p>
                        Submission of a wholesale, partnership or contact
                        inquiry does not create a contract or guarantee that
                        Cosmalac will accept an order, appoint a distributor or
                        enter into a business relationship.
                    </p>
                </article>

                <article>
                    <h2>4. Intellectual property</h2>
                    <p>
                        Unless otherwise stated, the Cosmalac name, branding,
                        text, graphics, imagery and website design are owned by
                        or licensed to Cosmalac. You may not reproduce,
                        distribute or commercially exploit website materials
                        without permission.
                    </p>
                </article>

                <article>
                    <h2>5. Third-party links</h2>
                    <p>
                        The website may link to third-party services such as
                        WhatsApp or social platforms. Those services operate
                        independently and are governed by their own terms and
                        policies.
                    </p>
                </article>

                <article>
                    <h2>6. Availability and accuracy</h2>
                    <p>
                        We aim to keep the website accurate and available, but
                        do not promise that every page, service or piece of
                        information will always be complete, current or
                        uninterrupted.
                    </p>
                </article>

                <article>
                    <h2>7. Limitation</h2>
                    <p>
                        To the extent permitted by applicable law, Cosmalac is
                        not responsible for losses arising solely from reliance
                        on website information, interruptions outside our
                        reasonable control, or third-party services.
                    </p>
                </article>

                <article>
                    <h2>8. Changes to these terms</h2>
                    <p>
                        We may update these terms as the website, services or
                        legal requirements change. The latest version will be
                        posted on this page with an updated date.
                    </p>
                </article>

                <article>
                    <h2>9. Contact</h2>
                    <p>
                        Questions about these Terms can be sent to
                        hello.cosmalac@gmail.com or +94 75 569 7476.
                    </p>
                </article>

                <div className="legal-page__actions">
                    <Link to="/privacy">Read Privacy Policy</Link>
                    <Link to="/contact">Contact Cosmalac</Link>
                </div>
            </div>
        </section>
    </main>
);

export default TermsPage;
