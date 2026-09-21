import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { translations } from "./translations";

const LANGUAGE_STORAGE_KEY = "cosmalac-language";
const DEFAULT_LANGUAGE = "en";

const LanguageContext = createContext(null);

const getInitialLanguage = () => {
    if (typeof window === "undefined") {
        return DEFAULT_LANGUAGE;
    }

    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    return stored === "ar" || stored === "en"
        ? stored
        : DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(getInitialLanguage);

    useEffect(() => {
        const isArabic = language === "ar";

        document.documentElement.lang = language;
        document.documentElement.dir = isArabic ? "rtl" : "ltr";
        document.documentElement.classList.toggle(
            "lang-ar",
            isArabic
        );

        window.localStorage.setItem(
            LANGUAGE_STORAGE_KEY,
            language
        );
    }, [language]);

    const changeLanguage = useCallback((nextLanguage) => {
        if (
            nextLanguage !== "en" &&
            nextLanguage !== "ar"
        ) {
            return;
        }

        setLanguage(nextLanguage);
    }, []);

    const value = useMemo(
        () => ({
            language,
            changeLanguage,
            t: translations[language],
        }),
        [language, changeLanguage]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );
    }

    return context;
};