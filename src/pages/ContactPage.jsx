import { motion } from "framer-motion";

const fadeLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 35 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactPage({ form, setForm, submitted, sending, sendError, onSubmit }) {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}>
            Get in touch with our sales team for product enquiries and quotations.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <motion.div
              variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--dark)", marginBottom: 24 }}>
                Get In Touch
              </h2>
              {[
                { icon: "📍", title: "Address", info: "Plot no. PF/23, Near Acme Pharma,\nOpp. Teva Pharma, Sanand,\nAhmedabad – 382110, Gujarat, India." },
                { icon: "📞", title: "Phone", info: "+91 9998108820" },
                { icon: "✉️", title: "Email", info: "biocareformulation@gmail.com" },
                { icon: "⏰", title: "Business Hours", info: "Mon – Sat: 9:00 AM – 6:00 PM IST" },
              ].map((c, i) => (
                <motion.div key={c.title} className="contact-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="contact-icon">{c.icon}</div>
                  <div>
                    <div className="contact-title">{c.title}</div>
                    <div className="contact-info">{c.info}</div>
                  </div>
                </motion.div>
              ))}
              <motion.div className="contact-buttons"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <a href="https://wa.me/919998108820?text=Hi+Biocare+Pharma,+I+want+to+enquire+about+your+products"
                  target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-sm">
                  💬 WhatsApp
                </a>
                <a href="tel:+919998108820" className="btn btn-primary-outline btn-sm">
                  📞 Call Us
                </a>
              </motion.div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div className="card contact-form"
              variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <h2>Send an Enquiry</h2>
              <form onSubmit={onSubmit}>
                {[
                  { f: "name", l: "Full Name *", t: "text", ph: "Your full name" },
                  { f: "company", l: "Company Name *", t: "text", ph: "Your company / organization" },
                  { f: "phone", l: "Phone Number *", t: "tel", ph: "+91 XXXXX XXXXX" },
                  { f: "email", l: "Email Address *", t: "email", ph: "your@email.com" },
                  { f: "country", l: "Country *", t: "text", ph: "e.g. India, Nigeria, Kenya..." },
                ].map(i => (
                  <div key={i.f} className="form-group">
                    <label className="form-label">{i.l}</label>
                    <input required type={i.t} value={form[i.f]} placeholder={i.ph}
                      disabled={sending}
                      onChange={e => setForm(prev => ({ ...prev, [i.f]: e.target.value }))}
                      className="form-input" />
                  </div>
                ))}
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea rows={3} value={form.message}
                    placeholder="Describe your requirements, product names, quantities..."
                    disabled={sending}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    className="form-input form-textarea" />
                </div>
                <motion.button type="submit" className="btn btn-primary btn-lg btn-full"
                  disabled={sending}
                  style={{ opacity: sending ? 0.7 : 1 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(0,87,184,0.25)" }}
                  whileTap={{ scale: 0.97 }}>
                  {sending ? "Sending..." : "Send Enquiry →"}
                </motion.button>
                {submitted && (
                  <motion.div className="success-msg"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}>
                    ✅ Enquiry sent! Our team will contact you within 24 hours.
                  </motion.div>
                )}
                {sendError && (
                  <motion.div className="error-msg"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}>
                    ❌ {sendError}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
