import { motion } from "framer-motion";
import AnimatedCounter from "../components/AnimatedCounter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 35 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            About Biocare Pharma
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}>
            A dedicated pharmaceutical manufacturer delivering quality, innovation, and trust
            to healthcare partners across the globe.
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <motion.div
              variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--dark)" }}>Our Story</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
                Established with a visionary goal to revolutionize the healthcare landscape,
                Biocare Pharma has grown into a trusted pharmaceutical manufacturing facility
                situated in Ahmedabad, Gujarat, India.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
                Our state-of-the-art manufacturing facility is WHO-GMP certified and equipped
                to produce over 303 pharmaceutical products across 5 major categories —
                including our flagship Sterile Ophthalmic Ointment range.
              </p>
              <motion.div className="about-stats"
                variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                {[
                  { n: "303", s: "+", l: "Products" },
                  { n: "12", s: "+", l: "Countries Served" },
                  { n: "5", s: "", l: "Product Categories" },
                  { n: "7", s: "+", l: "Years Experience" },
                ].map((s, i) => (
                  <motion.div key={s.l} className="card about-stat" variants={fadeUp} custom={i}>
                    <div className="num"><AnimatedCounter target={s.n} suffix={s.s} /></div>
                    <div className="label">{s.l}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--dark)" }}>Vision &amp; Mission</h2>
              {[
                { title: "Our Vision", icon: "🎯", text: "To be a globally recognized pharmaceutical company known for quality, innovation, and integrity in every product we manufacture." },
                { title: "Our Mission", icon: "🚀", text: "To provide world-class pharmaceutical products that improve patient outcomes, while maintaining the highest standards of quality and regulatory compliance." },
                { title: "Our Values", icon: "💎", text: "Quality · Integrity · Innovation · Customer-First · Sustainability · Global Excellence" },
              ].map((v, i) => (
                <motion.div key={v.title} className="card vision-card"
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 4, boxShadow: "0 6px 20px rgba(0,87,184,0.1)", transition: { duration: 0.2 } }}>
                  <div className="vision-card-inner">
                    <span className="icon">{v.icon}</span>
                    <div>
                      <div className="title">{v.title}</div>
                      <div className="desc">{v.text}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Manufacturing */}
          <div style={{ marginTop: 60 }}>
            <motion.h2
              style={{ fontSize: 24, fontWeight: 800, color: "var(--dark)", marginBottom: 24 }}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              Manufacturing Capabilities
            </motion.h2>
            <motion.div className="mfg-grid"
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              {[
                { icon: "💊", title: "Solid Dosage Forms", items: ["Tablets – 141 products", "Capsules – 42 products", "Chewable, ODT, SR & DR forms"] },
                { icon: "🧴", title: "Liquid & Semi-Solid", items: ["Oral Liquids – 51 products", "External Preparations – 57 products", "Creams, Gels, Ointments"] },
                { icon: "👁️", title: "Sterile Ophthalmic", items: ["12 Sterile Eye Ointments", "Cleanroom manufacturing", "WHO-GMP compliant facility"] },
              ].map((m, i) => (
                <motion.div key={m.title} className="card mfg-card"
                  variants={fadeUp} custom={i}
                  whileHover={{ y: -6, boxShadow: "0 10px 28px rgba(0,87,184,0.1)", transition: { duration: 0.25 } }}>
                  <div className="icon">{m.icon}</div>
                  <div className="title">{m.title}</div>
                  {m.items.map(it => (
                    <div key={it} className="mfg-item">
                      <span className="check">✓</span> {it}
                    </div>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
