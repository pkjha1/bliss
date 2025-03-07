interface WelcomeEmailProps {
  name: string
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <div
      style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px", color: "#333" }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#d97706", marginBottom: "10px" }}>Welcome to Blissful Life!</h1>
        <div style={{ height: "4px", width: "100px", background: "#d97706", margin: "0 auto" }}></div>
      </div>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>Dear {name},</p>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        Thank you for joining our spiritual community. We're excited to have you on this journey of self-discovery and
        inner peace.
      </p>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        With Blissful Life, you now have access to:
      </p>

      <ul style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px", paddingLeft: "20px" }}>
        <li>Sacred texts and teachings from Sanatan Dharma</li>
        <li>Guided meditations and spiritual practices</li>
        <li>Information about holy places and temples</li>
        <li>Wisdom stories and audiobooks</li>
      </ul>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "30px" }}>
        We encourage you to explore our resources and begin your journey toward spiritual fulfillment.
      </p>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <a
          href="https://blissfullife.org/dashboard"
          style={{
            background: "#d97706",
            color: "white",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          Explore Your Dashboard
        </a>
      </div>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        If you have any questions, feel free to reach out to our support team at support@blissfullife.org.
      </p>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        Warm regards,
        <br />
        The Blissful Life Team
      </p>

      <div
        style={{
          borderTop: "1px solid #eee",
          paddingTop: "20px",
          fontSize: "12px",
          color: "#666",
          textAlign: "center",
        }}
      >
        <p>© 2023 Blissful Life. All rights reserved.</p>
        <p>
          <a href="https://blissfullife.org/privacy" style={{ color: "#d97706", textDecoration: "none" }}>
            Privacy Policy
          </a>{" "}
          |
          <a
            href="https://blissfullife.org/terms"
            style={{ color: "#d97706", textDecoration: "none", marginLeft: "10px" }}
          >
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  )
}

