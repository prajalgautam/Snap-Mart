import { Resend } from "resend";
import config from "../config/config.js";

const sendEmail = ({ recipient, subject, html }) => {
  if (!config.resendEmailApiKey) {
    console.log("Resend API key not configured. Skipping email.");
    return;
  }

  try {
    const resend = new Resend(config.resendEmailApiKey);
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipient,
      subject,
      html,
    });
  } catch (error) {
    console.log("Failed to send email:", error.message);
  }
};

export default sendEmail;
