interface PasswordResetEmailProps {
  resetUrl: string
}

export default function PasswordResetEmail({ resetUrl }: PasswordResetEmailProps) {
  return (
    <div
      style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px", color: "#333" }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#d97706", marginBottom: "10px" }}>Reset Your Password</h1>
        <div style={{ height: "4px", width: "100px", background: "#d97706", margin: "0 auto" }}></div>
      </div>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>Hello,</p>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        You recently requested to reset your password for your Blissful Life account. Click the button below to reset
        it.
      </p>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        This password reset link is only valid for the next 60 minutes.
      </p>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <a
          href={resetUrl}
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
          Reset Your Password
        </a>
      </div>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        If you did not request a password reset, please ignore this email or contact support if you have concerns.
      </p>

      <p style={{ fontSize: "14px", lineHeight: "1.5", marginBottom: "20px", fontStyle: "italic" }}>
        If you're having trouble clicking the button, copy and paste the URL below into your web browser:
      </p>

      <p style={{ fontSize: "14px", lineHeight: "1.5", marginBottom: "30px", wordBreak: "break-all", color: "#666" }}>
        {resetUrl}
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

