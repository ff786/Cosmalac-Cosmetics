/* =========================================================
   Cosmalac — VALIDATION
   ========================================================= */

export const isRequired = (value) => {
    return value !== undefined && value !== null && String(value).trim() !== "";
};

export const isValidEmail = (email) => {
    if (!email) {
        return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone) => {
    if (!phone) {
        return false;
    }

    return /^[+]?[0-9\s\-()]{7,20}$/.test(phone);
};

export const minLength = (value, length) => {
    return String(value || "").trim().length >= length;
};

export const maxLength = (value, length) => {
    return String(value || "").trim().length <= length;
};

export const validateEmail = (email) => {
    if (!isRequired(email)) {
        return "Email address is required.";
    }

    if (!isValidEmail(email)) {
        return "Please enter a valid email address.";
    }

    return "";
};

export const validateContactForm = (form) => {
    const errors = {};

    if (!isRequired(form.name)) {
        errors.name = "Name is required.";
    }

    if (!isRequired(form.email)) {
        errors.email = "Email address is required.";
    } else if (!isValidEmail(form.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (form.phone && !isValidPhone(form.phone)) {
        errors.phone = "Please enter a valid phone number.";
    }

    if (!isRequired(form.message)) {
        errors.message = "Message is required.";
    } else if (!minLength(form.message, 10)) {
        errors.message = "Please provide a little more detail.";
    }

    return errors;
};

export const validateNewsletter = (email) => {
    return validateEmail(email);
};

export const validateWholesaleForm = (form) => {
    const errors = {};

    if (!isRequired(form.businessName)) {
        errors.businessName = "Business name is required.";
    }

    if (!isRequired(form.contactName)) {
        errors.contactName = "Contact name is required.";
    }

    if (!isRequired(form.email)) {
        errors.email = "Email address is required.";
    } else if (!isValidEmail(form.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!isRequired(form.phone)) {
        errors.phone = "Phone number is required.";
    } else if (!isValidPhone(form.phone)) {
        errors.phone = "Please enter a valid phone number.";
    }

    return errors;
};

export const hasErrors = (errors) => {
    return Object.keys(errors).length > 0;
};