const getSessionStorage = () => {
    if (typeof window === "undefined") return null;

    try {
        return window.sessionStorage;
    } catch {
        return null;
    }
};

export const isLikelyBot = ({ honeypot, startedAt }) => {
    if (String(honeypot || "").trim() !== "") {
        return true;
    }

    return (
        typeof startedAt === "number" &&
        Date.now() - startedAt < 1200
    );
};

export const hasRecentSubmission = (key, cooldownMs = 5000) => {
    const storage = getSessionStorage();

    if (!storage) return false;

    const now = Date.now();
    const lastSubmission = Number(
        storage.getItem(`cosmalac:form:${key}`) || 0
    );

    if (now - lastSubmission < cooldownMs) {
        return true;
    }

    storage.setItem(
        `cosmalac:form:${key}`,
        String(now)
    );

    return false;
};
