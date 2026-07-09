import { Resend } from "resend";
import config from "../config/config.js";

let resend;

const sendEmail = ({ recipient, subject, html }) => {
  if (!config.resendEmailApiKey) {
    console.warn("RESEND_EMAIL_API_KEY is not set. Skipping email send.");
    return;
  }

  resend ??= new Resend(config.resendEmailApiKey);

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: recipient,
    subject,
    html,
  });
};

export default sendEmail;
