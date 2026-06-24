import { CATEGORY_META } from "../data/products";

export default function QuoteModal({ open, onClose, cart, form, setForm, submitted, sending, sendError, onSubmit }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Request Quotation</h2>
            <p>Fill in your details and we'll respond within 24 hours</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {cart.length > 0 && (
            <div>
              <div className="modal-products-label">SELECTED PRODUCTS ({cart.length})</div>
              <div className="modal-products-list">
                {cart.map(p => (
                  <div key={p.id} className="modal-product-item">
                    <span className="check">✓</span>
                    <span className="name">{p.name}</span>
                    <span className="badge" style={{
                      background: CATEGORY_META[p.category]?.bg,
                      color: CATEGORY_META[p.category]?.color,
                      fontSize: 10,
                    }}>
                      {p.category.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {submitted ? (
            <div className="modal-success">
              <div className="icon">✅</div>
              <h3>Quotation Request Sent!</h3>
              <p>Thank you! Our team will review your request<br />and contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="form-grid">
                {[
                  { f: "name", l: "Full Name *", t: "text", ph: "Your name" },
                  { f: "company", l: "Company *", t: "text", ph: "Company name" },
                  { f: "phone", l: "Phone *", t: "tel", ph: "+91 ..." },
                  { f: "email", l: "Email *", t: "email", ph: "your@email.com" },
                  { f: "country", l: "Country *", t: "text", ph: "Your country" },
                ].map(i => (
                  <div key={i.f} className={i.f === "country" ? "full-width" : ""}>
                    <label className="form-label">{i.l}</label>
                    <input required type={i.t} value={form[i.f]} placeholder={i.ph}
                      disabled={sending}
                      onChange={e => setForm(prev => ({ ...prev, [i.f]: e.target.value }))}
                      className="form-input" />
                  </div>
                ))}
                <div className="full-width">
                  <label className="form-label">Message / Requirements</label>
                  <textarea rows={3} value={form.message}
                    placeholder="Bulk quantity needs, specific requirements, MOQ questions..."
                    disabled={sending}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    className="form-input form-textarea" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-full"
                disabled={sending}
                style={{ marginTop: 16, opacity: sending ? 0.7 : 1 }}>
                {sending ? "Sending..." : "Submit Quotation Request →"}
              </button>
              {sendError && (
                <div className="error-msg">
                  ❌ {sendError}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
