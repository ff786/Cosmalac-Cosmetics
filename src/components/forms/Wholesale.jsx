import { useState } from "react";
import {
    ArrowRight,
    Building2,
    Check,
    Globe2,
    Package,
    Send,
} from "lucide-react";

import Input from "../common/Input";
import Button from "../common/Button";

import { validateWholesaleForm } from "../../utils/validation";

const initialForm = {
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    quantity: "",
    message: "",
};

const Wholesale = () => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors =
            validateWholesaleForm(form);

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        setSubmitted(true);
    };

    return (
        <section className="wholesale section" id="wholesale">
            <div className="container">
                <div className="wholesale__wrapper">
                    <div className="wholesale__intro">
            <span className="eyebrow eyebrow-light">
              Cosmalac Business
            </span>

                        <h2>
                            Wholesale &
                            <br />
                            <em>B2B Inquiries</em>
                        </h2>

                        <p>
                            Looking to bring Cosmalac to your market?
                            Connect with our team for wholesale,
                            distribution and bulk purchasing
                            opportunities.
                        </p>

                        <div className="wholesale__features">
                            <div>
                                <Building2 size={19} />
                                <span>
                  Distributor partnerships
                </span>
                            </div>

                            <div>
                                <Package size={19} />
                                <span>
                  Bulk & wholesale orders
                </span>
                            </div>

                            <div>
                                <Globe2 size={19} />
                                <span>
                  International inquiries
                </span>
                            </div>
                        </div>

                        <div className="wholesale__direct">
                            <span>Prefer to speak directly?</span>

                            <a href="mailto:hello.cosmalac@gmail.com">
                                hello.cosmalac@gmail.com
                                <ArrowRight size={15} />
                            </a>

                            <a href="tel:+94755697476">
                                +94 75 569 7476
                                <ArrowRight size={15} />
                            </a>
                        </div>
                    </div>

                    <div className="wholesale__form-card">
                        {submitted ? (
                            <div className="wholesale__success">
                                <div>
                                    <Check size={24} />
                                </div>

                                <span className="eyebrow">
                  Inquiry received
                </span>

                                <h3>
                                    Thank you for your interest in
                                    Cosmalac.
                                </h3>

                                <p>
                                    Our B2B team will review your inquiry
                                    and contact you with the next steps.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm(initialForm);
                                        setSubmitted(false);
                                    }}
                                >
                                    Submit another inquiry
                                </button>
                            </div>
                        ) : (
                            <form
                                className="wholesale__form"
                                onSubmit={handleSubmit}
                            >
                                <div className="wholesale__form-title">
                                    <h3>
                                        Let's build something
                                        <em> together.</em>
                                    </h3>

                                    <p>
                                        Tell us a little about your business
                                        and requirements.
                                    </p>
                                </div>

                                <div className="wholesale__form-grid">
                                    <Input
                                        label="Business Name"
                                        name="businessName"
                                        placeholder="Your company"
                                        value={form.businessName}
                                        onChange={handleChange}
                                        error={errors.businessName}
                                        required
                                    />

                                    <Input
                                        label="Contact Name"
                                        name="contactName"
                                        placeholder="Your name"
                                        value={form.contactName}
                                        onChange={handleChange}
                                        error={errors.contactName}
                                        required
                                    />

                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="business@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        required
                                    />

                                    <Input
                                        label="Phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+94 75..."
                                        value={form.phone}
                                        onChange={handleChange}
                                        error={errors.phone}
                                        required
                                    />

                                    <Input
                                        label="Country / Market"
                                        name="country"
                                        placeholder="Where are you based?"
                                        value={form.country}
                                        onChange={handleChange}
                                    />

                                    <Input
                                        label="Estimated Quantity"
                                        name="quantity"
                                        placeholder="e.g. 500 units"
                                        value={form.quantity}
                                        onChange={handleChange}
                                    />
                                </div>

                                <Input
                                    label="Tell us about your requirements"
                                    name="message"
                                    textarea
                                    rows={4}
                                    placeholder="Products, quantities, distribution plans..."
                                    value={form.message}
                                    onChange={handleChange}
                                />

                                <Button
                                    type="submit"
                                    size="large"
                                    icon={<Send size={16} />}
                                    fullWidth
                                >
                                    Send Wholesale Inquiry
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Wholesale;