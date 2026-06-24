const WEB3FORMS_KEY = "a506746d-685c-45eb-bd82-5124e1ea4ee8";

export async function sendEmail({ name, company, phone, email, country, message, subject, products }) {
  const body = {
    access_key: WEB3FORMS_KEY,
    subject: subject || "BIOCARE PHARMA - New Export Inquiry",
    from_name: "BIOCARE Export Inquiry",
    name,
    company,
    phone,
    email,
    country,
    message: message || "No message provided",
  };

  if (products && products.length > 0) {
    body.selected_products = products.map(p => p.name).join("\n");
    body.product_count = `${products.length} product(s)`;
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || "Failed to send email");
  }
  return data;
}
