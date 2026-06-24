import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, CATEGORY_META, CATEGORIES } from "../data/products";

const ITEMS_PER_PAGE = 10;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProductsPage({
  cart, addToCart, removeFromCart, inCart, addedId,
  category, setCategory, onQuoteOpen,
}) {
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = useMemo(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    return PRODUCTS.filter(p =>
      (category === "All" || p.category === category) &&
      (search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.therapeutic.toLowerCase().includes(search.toLowerCase()))
    );
  }, [category, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="products-page">
      {/* Header */}
      <motion.div className="products-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
        <div className="products-header-inner">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            Product Catalogue &nbsp;
            <motion.span
              key={filtered.length}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}>
              {filtered.length} products found
            </motion.span>
          </motion.h1>
          <motion.div className="products-filters"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}>
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or therapeutic category..."
                className="form-input search-input" />
            </div>
            <div className="category-filters">
              {CATEGORIES.map((c, i) => (
                <motion.button key={c} onClick={() => setCategory(c)}
                  className={`category-btn ${category === c ? "active" : ""}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.05, ease: "easeOut" }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.94 }}>
                  {c === "All"
                    ? `All (${PRODUCTS.length})`
                    : `${c.split(" ")[0]} (${PRODUCTS.filter(p => p.category === c).length})`}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="products-content">
        {/* Inquiry Basket Bar */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div className="card inquiry-bar"
              initial={{ opacity: 0, y: -15, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -15, scaleY: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}>
              <div className="inquiry-bar-info">
                <motion.div style={{ fontSize: 20 }}
                  animate={{ rotate: [0, -10, 10, -5, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}>
                  📋
                </motion.div>
                <div>
                  <div className="inquiry-bar-title">
                    Inquiry Basket — {cart.length} product{cart.length > 1 ? "s" : ""} selected
                  </div>
                  <div className="inquiry-bar-subtitle">
                    {cart.slice(0, 2).map(p => p.name.split(" ").slice(0, 3).join(" ")).join(" · ")}
                    {cart.length > 2 ? ` · +${cart.length - 2} more` : ""}
                  </div>
                </div>
              </div>
              <div className="inquiry-bar-actions">
                <motion.button onClick={() => setCartOpen(v => !v)}
                  className="btn btn-primary-outline btn-sm"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {cartOpen ? "Hide" : "View"} Basket
                </motion.button>
                <motion.button onClick={onQuoteOpen}
                  className="btn btn-primary btn-sm"
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0,87,184,0.3)" }}
                  whileTap={{ scale: 0.95 }}>
                  Request Quotation →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Panel */}
        <AnimatePresence>
          {cartOpen && cart.length > 0 && (
            <motion.div className="card cart-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <div className="cart-panel-title">Selected Products ({cart.length})</div>
              <div className="cart-grid">
                {cart.map((p, i) => (
                  <motion.div key={p.id} className="cart-item"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.3, delay: i * 0.03, ease: "easeOut" }}>
                    <div>
                      <div className="cart-item-name">
                        {p.name.length > 40 ? p.name.slice(0, 40) + "…" : p.name}
                      </div>
                      <div className="cart-item-meta">{p.category} · {p.therapeutic}</div>
                    </div>
                    <motion.button onClick={() => removeFromCart(p.id)}
                      className="cart-item-remove"
                      whileHover={{ scale: 1.3, color: "#B91C1C" }}
                      whileTap={{ scale: 0.9 }}>
                      ✕
                    </motion.button>
                  </motion.div>
                ))}
              </div>
              <div className="cart-actions">
                <motion.button onClick={() => removeFromCart("all")}
                  className="btn btn-danger-outline btn-sm"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Clear All
                </motion.button>
                <motion.button onClick={onQuoteOpen}
                  className="btn btn-primary btn-sm"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Request Quotation →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <motion.div className="no-results"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div className="icon"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              🔍
            </motion.div>
            <div className="title">No products found</div>
            <div className="subtitle">Try a different search or category</div>
          </motion.div>
        ) : (
          <>
            <div className="product-grid">
                {visible.map((p) => {
                  const meta = CATEGORY_META[p.category] || {};
                  const added = inCart(p.id);
                  const justAdded = addedId === p.id;
                  return (
                    <motion.div key={p.id} className="card product-card"
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                      whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(0,87,184,0.14)" }}>
                      <div className="product-strip" style={{ background: meta.color }} />
                      <div className="product-body">
                        <div className="product-badges">
                          <span className="badge" style={{ background: meta.bg, color: meta.color }}>
                            {meta.icon} {p.category}
                          </span>
                          <span className="badge" style={{ background: "#F1F5F9", color: "var(--muted)" }}>
                            {p.therapeutic}
                          </span>
                        </div>
                        <div className="product-name">{p.name}</div>
                        <div className="product-pack">
                          <span>📦</span> {p.pack}
                        </div>
                        <motion.button onClick={() => addToCart(p)}
                          className={`btn btn-sm product-btn ${added ? "added" : "not-added"}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.95 }}
                          animate={justAdded ? { scale: [1, 0.92, 1.05, 1] } : {}}
                          transition={{ duration: 0.35 }}>
                          {added ? "✓ Added to Inquiry" : "+ Add to Inquiry"}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
            </div>

            {/* Load More / Showing count */}
            <motion.div className="load-more-section"
              variants={fadeUp} initial="hidden" animate="visible"
              key={visibleCount}>
              <div className="load-more-count">
                Showing {visible.length} of {filtered.length} products
              </div>
              <AnimatePresence mode="wait">
                {hasMore ? (
                  <motion.button
                    key="load-more"
                    className="btn btn-primary load-more-btn"
                    onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                    whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(0,87,184,0.3)" }}
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                    Load More Products ↓
                  </motion.button>
                ) : filtered.length > ITEMS_PER_PAGE && (
                  <motion.div
                    key="end-msg"
                    className="load-more-done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}>
                    You've reached the end of the list
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
