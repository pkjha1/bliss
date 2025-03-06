interface DonationConfirmationEmailProps {
  name: string
  amount: number
  cause: string
  isRecurring: boolean
}

export default function DonationConfirmationEmail({
  name,
  amount,
  cause,
  isRecurring,
}: DonationConfirmationEmailProps) {
  // Format amount to Indian Rupees
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)

  return (
    <div
      style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px", color: "#333" }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#d97706", marginBottom: "10px" }}>Thank You for Your Donation!</h1>
        <div style={{ height: "4px", width: "100px", background: "#d97706", margin: "0 auto" }}></div>
      </div>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>Dear {name},</p>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        Thank you for your generous {isRecurring ? "recurring " : ""}donation of <strong>{formattedAmount}</strong> to
        support {cause}.
      </p>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        Your contribution helps us continue our mission of spreading spiritual wisdom and supporting our community.
      </p>

      {isRecurring && (
        <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
          Your donation will be processed monthly. You can manage your recurring donation at any time through your
          account dashboard.
        </p>
      )}

      <div
        style={{
          background: "#f9f5eb",
          border: "1px solid #e9d8a6",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ color: "#d97706", marginTop: "0", fontSize: "18px" }}>Donation Details:</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "8px 0", borderBottom: "1px solid #e9d8a6" }}>Amount:</td>
              <td
                style={{ padding: "8px 0", borderBottom: "1px solid #e9d8a6", textAlign: "right", fontWeight: "bold" }}
              >
                {formattedAmount}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", borderBottom: "1px solid #e9d8a6" }}>Cause:</td>
              <td style={{ padding: "8px 0", borderBottom: "1px solid #e9d8a6", textAlign: "right" }}>{cause}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", borderBottom: "1px solid #e9d8a6" }}>Type:</td>
              <td style={{ padding: "8px 0", borderBottom: "1px solid #e9d8a6", textAlign: "right" }}>
                {isRecurring ? "Recurring (Monthly)" : "One-time"}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0" }}>Date:</td>
              <td style={{ padding: "8px 0", textAlign: "right" }}>{new Date().toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        For tax purposes, please save this email as a receipt of your donation.
      </p>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        If you have any questions about your donation, please contact us at donations@blissfullife.org.
      </p>

      <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
        With gratitude,
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

