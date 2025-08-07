import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});


async function main(email,token) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const info = await transporter.sendMail({
    from: process.env.email,
    to: email,
    subject: "Reset Password",
    text: "Reset Password", // plain‑text body
    html: `<a href="${resetLink}">Reset Password</a>`, // HTML body
  });

  console.log("Message sent:", info.messageId);
};

export default main