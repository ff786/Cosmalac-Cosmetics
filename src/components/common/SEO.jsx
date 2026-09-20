import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.cosmalac.com";

const PAGE_META = {
    "/": {
        title: "Cosmalac | Premium Skincare from Dubai",
        description:
            "Discover Cosmalac premium skincare from Dubai, crafted with carefully selected ingredients and a professional approach to beauty.",
    },
    "/products": {
        title: "Cosmalac Products | Crown Whitening Beauty Cream",
        description:
            "Explore the Cosmalac skincare collection and discover the Crown Whitening Beauty Cream.",
    },
    "/about": {
        title: "About Cosmalac | Premium Skincare from Dubai",
        description:
            "Learn about Cosmalac Pvt Ltd, a Dubai-based skincare brand focused on purposeful formulations and professional manufacturing.",
    },
    "/wholesale": {
        title: "Wholesale & B2B | Cosmalac Skincare",
        description:
            "Connect with Cosmalac for wholesale, distribution and B2B skincare opportunities from Dubai.",
    },
    "/ContactUs": {
        title: "Contact Cosmalac | Skincare & B2B",
        description:
            "Contact Cosmalac for skincare questions, partnerships, product information and business inquiries.",
    },
    "/contact": {
        title: "Contact Cosmalac | Skincare & B2B",
        description:
            "Contact Cosmalac for skincare questions, partnerships, product information and business inquiries.",
    },
    "/privacy": {
        title: "Privacy Policy | Cosmalac",
        description:
            "Read the Cosmalac Privacy Policy and learn how website information and browser preferences are handled.",
    },
    "/terms": {
        title: "Terms & Conditions | Cosmalac",
        description:
            "Read the Terms & Conditions governing use of the Cosmalac website.",
    },
};

const upsertMeta = (selector, attributes, content) => {
    let element = document.head.querySelector(selector);

    if (!element) {
        element = document.createElement("meta");

        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });

        document.head.appendChild(element);
    }

    element.setAttribute("content", content);
};

const upsertLink = (rel, href) => {
    let element = document.head.querySelector('link[rel="' + rel + '"]');

    if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
    }

    element.setAttribute("href", href);
};

const SEO = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const meta = PAGE_META[pathname] || PAGE_META["/"];

        document.title = meta.title;

        upsertMeta(
            'meta[name="description"]',
            { name: "description" },
            meta.description
        );

        upsertMeta(
            'meta[name="robots"]',
            { name: "robots" },
            "index,follow,max-image-preview:large"
        );

        upsertMeta(
            'meta[property="og:type"]',
            { property: "og:type" },
            "website"
        );

        upsertMeta(
            'meta[property="og:site_name"]',
            { property: "og:site_name" },
            "Cosmalac"
        );

        upsertMeta(
            'meta[property="og:title"]',
            { property: "og:title" },
            meta.title
        );

        upsertMeta(
            'meta[property="og:description"]',
            { property: "og:description" },
            meta.description
        );

        upsertMeta(
            'meta[name="twitter:card"]',
            { name: "twitter:card" },
            "summary_large_image"
        );

        upsertMeta(
            'meta[name="twitter:title"]',
            { name: "twitter:title" },
            meta.title
        );

        upsertMeta(
            'meta[name="twitter:description"]',
            { name: "twitter:description" },
            meta.description
        );

        const canonicalPath =
            pathname === "/" ? "" : pathname.replace(/\/$/, "");

        upsertLink(
            "canonical",
            SITE_URL + canonicalPath
        );
    }, [pathname]);

    return null;
};

export default SEO;
