import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

import Input from "../common/Input";

import { validateNewsletter } from "../../utils/validation";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationError =
            validateNewsletter(email);

        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        setSubmitted(true);
    };

    return (
        <section className="newsletter">
            <div className="container">
                <div className="newsletter__inner">
                    <div className="newsletter__icon">
                        <Mail size={20} />
                    </div>

                    <div className="newsletter__content">
            <span className="eyebrow">
              Stay in the know
            </span>

                        <h2>
                            Beauty notes,
                            <em> from us.</em>
                        </h2>

                        <p>
                            Join our community for skincare insights,
                            product updates and Cosmalac news.
                        </p>
                    </div>

                    {submitted ? (
                        <div className="newsletter__success">
                            <Check size={18} />
                            <span>
                You're on the list. Thank you.
              </span>
                        </div>
                    ) : (
                        <form
                            className="newsletter__form"
                            onSubmit={handleSubmit}
                        >
                            <Input
                                name="newsletter-email"
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                error={error}
                            />

                            <button
                                type="submit"
                                className="newsletter__submit"
                                aria-label="Subscribe"
                            >
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Newsletter;