// src/pages/Contact.jsx
import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate form submission
    console.log({ name, email, message });
    setSubmitted(true);

    // Clear form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-page" style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Contact Us</h2>

      {submitted && <p style={{ color: "green" }}>Thank you for contacting us! We'll get back to you soon.</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <button type="submit" style={{ padding: "0.75rem", borderRadius: "5px", backgroundColor: "#e74c3c", color: "white", border: "none", cursor: "pointer" }}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
