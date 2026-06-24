import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORY_META } from "../data/products";
import AnimatedCounter from "../components/AnimatedCounter";

const MotionLink = motion.create(Link);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage({ onCategorySelect }) {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <motion.div className="hero-badge"
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}>
              🏭 &nbsp; WHO-GMP Certified Manufacturer
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
              Your Trusted<br />
              <span>Pharmaceutical</span><br />
              Partner
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}>
              Biocare Pharma manufactures 303+ high-quality pharmaceutical products
              across 5 categories — serving global distributors, hospitals &amp; healthcare partners.
            </motion.p>
            <motion.div className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}>
              <Link to="/products" className="btn btn-white btn-lg">Browse Products →</Link>
              <Link to="/contact" className="btn btn-ghost btn-lg">Request Quote</Link>
            </motion.div>
          </div>
          <motion.div className="hero-stats"
            variants={staggerContainer}
            initial="hidden" animate="visible">
            {[
              { n: "303", s: "+", l: "Products" },
              { n: "5", s: "", l: "Product Categories" },
              { n: "GMP", s: "", l: "WHO Certified" },
            ].map((s, i) => (
              <motion.div key={s.l} className="stat-card"
                variants={fadeIn} custom={i}
                whileHover={{ y: -6, background: "rgba(255,255,255,0.22)", transition: { duration: 0.25 } }}>
                <div className="num">
                  <AnimatedCounter target={s.n} suffix={s.s} />
                </div>
                <div className="label">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="categories-section">
        <div className="container">
          <motion.div className="section-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <h2 className="section-title">Product Categories</h2>
            <p className="section-subtitle">Browse our complete pharmaceutical portfolio</p>
          </motion.div>
        </div>
        <motion.div className="categories-grid container"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
          {Object.entries(CATEGORY_META).map(([cat, meta], i) => (
            <MotionLink key={cat} to="/products"
              className="card card-hover category-card"
              style={{ borderTopColor: meta.color }}
              onClick={() => onCategorySelect(cat)}
              variants={fadeUp} custom={i}
              whileHover={{ y: -8, boxShadow: "0 12px 32px rgba(0,87,184,0.14)" }}>
              <div className="icon">{meta.icon}</div>
              <div className="name">{cat}</div>
              <div className="desc">{meta.desc}</div>
            </MotionLink>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <motion.div className="section-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <h2 className="section-title">Why Choose Biocare?</h2>
          </motion.div>
          <motion.div className="features-grid"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
            {[
              { icon: "🏆", title: "WHO-GMP Certified", desc: "Our facility meets international GMP standards, ensuring every product is manufactured under strict quality protocols." },
              { icon: "🌍", title: "Global Exports", desc: "Trusted by partners across Africa, Asia, and South America. We understand international regulatory requirements." },
              { icon: "🔬", title: "In-house R&D", desc: "Dedicated research & development team continuously developing new formulations and improving existing ones." },
              { icon: "📦", title: "Flexible Packaging", desc: "Custom packaging options — Alu-Alu, Blister, bottles, tubes — tailored to your market requirements." },
              { icon: "⚡", title: "Fast Turnaround", desc: "Efficient manufacturing processes ensure timely delivery without compromising on quality or compliance." },
              { icon: "🤝", title: "Dedicated Support", desc: "Our sales team provides end-to-end support from quotation to shipment and beyond." },
            ].map((w, i) => (
              <motion.div key={w.title} className="card feature-card"
                variants={fadeUp} custom={i}
                whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(0,87,184,0.12)" }}>
                <div className="icon">{w.icon}</div>
                <div className="title">{w.title}</div>
                <div className="desc">{w.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <h2>Ready to Partner with Biocare?</h2>
          <p>Select products, build your inquiry list, and request a quotation in minutes.</p>
          <div className="cta-buttons">
            <Link to="/products" className="btn btn-white btn-lg">Browse Products →</Link>
            <a href="https://wa.me/919998108820?text=Hi+Biocare,+I+want+to+inquiry+about+your+products"
              target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-lg">
              💬 WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>

      {/* Clients */}
      <section className="clients-section">
        <div className="container">
          <motion.div className="clients-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            TRUSTED BY LEADING PHARMA COMPANIES
          </motion.div>
          <motion.div className="marquee-wrapper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}>
            <div className="marquee-content">
              {[
                "Cadila", "Troikaa", "IPCA Labs", "JB Chemicals", 
                "Krishna Pharma", "Makers Labs", "Zydus Lifesciences", "Sun Pharma",
                "Cadila", "Troikaa", "IPCA Labs", "JB Chemicals", 
                "Krishna Pharma", "Makers Labs", "Zydus Lifesciences", "Sun Pharma"
              ].map((name, i) => (
                <div key={`${name}-${i}`} className="client-name-card">
                  {name}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
