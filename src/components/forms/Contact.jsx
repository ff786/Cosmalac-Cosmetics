import { useEffect, useRef, useState } from "react";
import {
    Check,
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react";

import Input from "../common/Input";
import Button from "../common/Button";

import { validateContactForm } from "../../utils/validation";
import {
    hasRecentSubmission,
    isLikelyBot,
} from "../../utils/formSecurity";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    message: "",
};

const Contact = () => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [honeypot, setHoneypot] = useState("");
    const startedAtRef = useRef(null);

    useEffect(() => {
        startedAtRef.current = Date.now();
    }, []);

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
            validateContactForm(form);

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        if (
            isLikelyBot({
                honeypot,
                startedAt: startedAtRef.current,
            }) ||
            hasRecentSubmission("contact")
        ) {
            return;
        }

        const whatsappMessage = [
            "Hello Cosmalac, I would like to get in touch.",
            "",
            `Name: ${form.name.trim()}`,
            `Email: ${form.email.trim()}`,
            form.phone.trim()
                ? `Phone: ${form.phone.trim()}`
                : "Phone: Not provided",
            "",
            "Message:",
            form.message.trim(),
        ].join("\n");

        const whatsappUrl =
            `https://wa.me/94755697476?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );

        setSubmitted(true);
    };

    return (
        <section className="contact section">
            <div className="container">
                <div className="contact__grid">
                    <div className="contact__content">
            <span className="eyebrow">
              Let's connect
            </span>

                        <h1>
                            We'd love to
                            <br />
                            <em>hear from you.</em>
                        </h1>

                        <p>
                            Whether you have a product question,
                            partnership opportunity or simply want to
                            learn more about Cosmalac, our team is here
                            to help.
                        </p>

                        <div className="contact__details">
                            <a href="mailto:hello.cosmalac@gmail.com">
                <span className="contact__detail-icon">
                  <Mail size={17} />
                </span>

                                <span>
                  <small>Email</small>
                  hello.cosmalac@gmail.com
                </span>
                            </a>

                            <a href="tel:+94755697476">
                <span className="contact__detail-icon">
                  <Phone size={17} />
                </span>

                                <span>
                  <small>Phone</small>
                  +94 75 569 7476
                </span>
                            </a>

                            <div>
                <span className="contact__detail-icon">
                  <MapPin size={17} />
                </span>

                                <span>
                  <small>Location</small>
                  Dubai, United Arab Emirates
                </span>
                            </div>
                        </div>
                    </div>

                    <div className="contact__form-wrapper">
                        {submitted ? (
                            <div className="contact__success">
                                <div className="contact__success-icon">
                                    <Check size={25} />
                                </div>

                                <span className="eyebrow">
                  Message received
                </span>

                                <h2>
                                    Thank you for
                                    <br />
                                    reaching out.
                                </h2>

                                <p>
                                    Your message has been prepared for
                                    WhatsApp. Complete the conversation there
                                    and our team will get back to you.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm(initialForm);
                                        setSubmitted(false);
                                    }}
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form
                                className="contact__form"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    name="website"
                                    value={honeypot}
                                    onChange={(event) => setHoneypot(event.target.value)}
                                    tabIndex="-1"
                                    autoComplete="off"
                                    aria-hidden="true"
                                    className="form-honeypot"
                                />

                                <div className="contact__form-heading">
                  <span className="eyebrow">
                    Contact Cosmalac
                  </span>

                                    <h2>How can we help?</h2>
                                </div>

                                <div className="contact__form-row">
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        placeholder="Your name"
                                        value={form.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                        required
                                    />

                                    <Input
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        required
                                    />
                                </div>

                                <Input
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    placeholder="+94 75..."
                                    value={form.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                />

                                <Input
                                    label="Message"
                                    name="message"
                                    textarea
                                    placeholder="Tell us how we can help..."
                                    value={form.message}
                                    onChange={handleChange}
                                    error={errors.message}
                                    required
                                />

                                <Button
                                    type="submit"
                                    size="large"
                                    icon={<Send size={16} />}
                                    fullWidth
                                >
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;