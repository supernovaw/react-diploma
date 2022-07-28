import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import About from "./pages/About";
import Cart from "./pages/Cart";
import Catalog from "./pages/Catalog";
import Contacts from "./pages/Contacts";
import Main from "./pages/Main";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/index.html" end element={<Navigate to="/" />} />
    <Route path="/" end element={<Main />} />

    <Route path="/about.html" end element={<About />} />
    <Route path="/contacts.html" end element={<Contacts />} />
    <Route path="/catalog.html" end element={<Catalog />} />
    <Route path="/cart.html" end element={<Cart />} />
    <Route path="/catalog/:id.html" end element={<Product />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <Header />
    <AppRoutes />
    <Footer />
  </BrowserRouter>
);

export default App;
