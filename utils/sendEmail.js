import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: "nitzualexandru@gmail.com", // Adresa de email verificată din SendGrid
    subject: "Hello from ContactsApp!",
    text: "and easy to do anywhere, even with Node.js",
    html: "Hello from <strong>ContactsApp</strong>",
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent succesfully`);
  } catch (error) {
    if (error?.response) {
      console.error(error.response.body);
    } else {
      console.error(error);
    }
  }
};
