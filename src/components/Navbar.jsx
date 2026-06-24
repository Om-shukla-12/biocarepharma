import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ cartCount, onCartClick }) {
  const [mobileNav, setMobileNav] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname === "/" ? "/home" : location.pathname;

  const links = [
    { to: "/", label: "Home", match: ["/", "/home"] },
    { to: "/products", label: "Products", match: ["/products"] },
    { to: "/about", label: "About", match: ["/about"] },
    { to: "/contact", label: "Contact", match: ["/contact"] },
  ];

  const isActive = (match) => match.some(m => currentPage === m || location.pathname === m);

  return (
    <motion.nav className="navbar"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={() => setMobileNav(false)}>
          <div className="navbar-logo-icon">B</div>
          <div className="navbar-logo-text">
            <h1>Biocare Pharma</h1>
            <span>TRUSTED PHARMACEUTICAL PARTNER</span>
          </div>
        </Link>

        <div className="navbar-links">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`navbar-link ${isActive(l.match) ? "active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions desktop">
          <a href="tel:+919998108820" className="btn btn-primary-outline btn-sm">
            📞 +91 9998108820
          </a>
          <motion.button onClick={onCartClick}
            className="btn btn-primary btn-sm" style={{ position: "relative" }}
            whileTap={{ scale: 0.95 }}>
            📋 Inquiry
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span className="navbar-cart-badge"
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <button className={`hamburger ${mobileNav ? "open" : ""}`}
          onClick={() => setMobileNav(v => !v)}
          aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {mobileNav && (
          <motion.div className="mobile-menu open"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}>
            {links.map((l, i) => (
              <motion.div key={l.to}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}>
                <Link to={l.to}
                  className={`navbar-link ${isActive(l.match) ? "active" : ""}`}
                  onClick={() => setMobileNav(false)}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <div className="navbar-actions">
              <a href="tel:+919998108820" className="btn btn-primary-outline btn-sm"
                onClick={() => setMobileNav(false)}>
                📞 +91 9998108820
              </a>
              <button onClick={() => { onCartClick(); setMobileNav(false); }}
                className="btn btn-primary btn-sm" style={{ position: "relative" }}>
                📋 Inquiry Basket
                {cartCount > 0 && <span className="navbar-cart-badge">{cartCount}</span>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
