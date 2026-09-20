import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/products"
                    element={<ProductsPage />}
                />
                <Route
                    path="/about"
                    element={<AboutPage />}
                />
            </Route>
        </Routes>
    );
};

export default App;