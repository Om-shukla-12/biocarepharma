import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORY_META } from "../data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Footer({ onCategorySelect }) {
  return (
    <footer className="footer">
      {/* Top CTA strip */}
      <div className="footer-cta">
        <motion.div className="footer-cta-inner container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <div className="footer-cta-text">
            <h3>Start Your Pharma Partnership Today</h3>
            <p>Get a custom quotation for your product requirements within 24 hours.</p>
          </div>
          <div className="footer-cta-actions">
            <Link to="/products" className="btn btn-white btn-sm">Browse Products</Link>
            <a href="https://wa.me/919998108820?text=Hi+Biocare+Pharma,+I+want+to+enquire+about+your+products"
              target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm"
              style={{ border: "1px solid rgba(255,255,255,0.3)" }}>
              💬 WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <motion.div className="footer-grid container"
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

          {/* Brand column */}
          <motion.div className="footer-brand" variants={fadeUp}>
            <div className="footer-logo">
              <div className="footer-logo-icon">B</div>
              <div>
                <h3>Biocare Pharma</h3>
                <span>Trusted Pharmaceutical Partner</span>
              </div>
            </div>
            <p>
              WHO-GMP certified pharmaceutical manufacturer based in Ahmedabad, Gujarat.
              Delivering 303+ quality healthcare products across 5 categories to partners in 12+ countries.
            </p>
            <div className="footer-certifications">
              <div className="footer-cert-badge">🏭 WHO-GMP</div>
              <div className="footer-cert-badge">✅ ISO Certified</div>
              <div className="footer-cert-badge">🇮🇳 Made in India</div>
            </div>

            {/* Social Links */}
            <div className="footer-socials">
              <a href="https://wa.me/919998108820" target="_blank" rel="noreferrer"
                className="footer-social-link" aria-label="WhatsApp" title="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a href="mailto:biocareformulation@gmail.com" className="footer-social-link" aria-label="Email" title="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
              <a href="tel:+919998108820" className="footer-social-link" aria-label="Phone" title="Phone">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
              <a href="https://maps.google.com/?q=Sanand+Ahmedabad+Gujarat+382110" target="_blank" rel="noreferrer"
                className="footer-social-link" aria-label="Location" title="Location">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </a>
            </div>
          </motion.div>

          {/* Inquiry column */}
          <motion.div variants={fadeUp} custom={1} className="footer-inquiry">
            <Link to="/contact" className="btn btn-accent btn-lg">
              Send Enquiry →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div>© 2026 Biocare Pharma. All Rights Reserved.</div>
          <div className="footer-bottom-links">
            <span>Privacy Policy</span>
            <span className="footer-dot">·</span>
            <span>Terms of Service</span>
            <span className="footer-dot">·</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
