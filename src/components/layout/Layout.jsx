import { Outlet } from "react-router-dom";

import Header from "./Header";
import BackToTopButton from "../common/BackToTopButton";
import Footer from "./Footer";
import WhatsAppChatButton from "../common/WhatsAppChatButton";
import CookieConsent from "../common/CookieConsent";
import SEO from "../common/SEO";

const Layout = () => {
    return (
        <div className="nuvia-app">
            <SEO />
            <Header />

            <main className="nuvia-main">
                <Outlet />
            </main>

            <Footer />

            <BackToTopButton />
            <WhatsAppChatButton />
            <CookieConsent />
        </div>
    );
};

export default Layout;