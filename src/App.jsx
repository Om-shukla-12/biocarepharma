import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuoteModal from "./components/QuoteModal";
import WhatsAppButton from "./components/WhatsAppButton";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { sendEmail } from "./utils/sendEmail";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  const [cart, setCart] = useState([]);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [addedId, setAddedId] = useState(null);
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", country: "", message: "",
  });

  const navigate = useNavigate();

  const inCart = (id) => cart.some(p => p.id === id);
  const addToCart = (product) => {
    if (!inCart(product.id)) {
      setCart(prev => [...prev, product]);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1200);
    }
  };
  const removeFromCart = (id) => {
    if (id === "all") {
      setCart([]);
    } else {
      setCart(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    try {
      await sendEmail({
        ...form,
        subject: `New Enquiry from ${form.name} — ${form.company}`,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", company: "", phone: "", email: "", country: "", message: "" });
      }, 3000);
    } catch (err) {
      setSendError(err.message || "Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    try {
      await sendEmail({
        ...form,
        subject: `Quotation Request (${cart.length} products) — ${form.name}`,
        products: cart,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setQuoteOpen(false);
        setCart([]);
        setForm({ name: "", company: "", phone: "", email: "", country: "", message: "" });
      }, 3000);
    } catch (err) {
      setSendError(err.message || "Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleCartClick = () => {
    navigate("/products");
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <ScrollToTop />
      <Navbar cartCount={cart.length} onCartClick={handleCartClick} />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage onCategorySelect={handleCategorySelect} />} />
          <Route path="/products" element={
            <ProductsPage
              cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}
              inCart={inCart} addedId={addedId}
              category={category} setCategory={setCategory}
              onQuoteOpen={() => setQuoteOpen(true)}
            />
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={
            <ContactPage form={form} setForm={setForm}
              submitted={submitted} sending={sending} sendError={sendError}
              onSubmit={handleContactSubmit} />
          } />
        </Routes>
      </main>

      <Footer onCategorySelect={handleCategorySelect} />
      <QuoteModal
        open={quoteOpen} onClose={() => setQuoteOpen(false)}
        cart={cart} form={form} setForm={setForm}
        submitted={submitted} sending={sending} sendError={sendError}
        onSubmit={handleQuoteSubmit}
      />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
