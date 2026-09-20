import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import WhatsAppChatButton from "../common/WhatsAppChatButton";

const Layout = () => {
    return (
        <div className="nuvia-app">
            <Header />

            <main className="nuvia-main">
                <Outlet />
            </main>

            <Footer />

            <WhatsAppChatButton />
        </div>
    );
};

export default Layout;