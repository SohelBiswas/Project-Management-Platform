import { text } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenertor = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://task-manager.com",
      logo: "task-manager.com",
    },
  });

  const mailTextual = mailGenertor.generatePlaintext(options.MailgenContent);
  const mailHTML = mailGenertor.generate(options.MailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAL_SMTP_HOST,
    port: process.env.MAILTRAL_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAL_SMTP_USERNAMe,
      pass: process.env.MAILTRAL_SMTP_PASSWORD,
    },
  });

  const mail = {
    from: "mail.taskmanager.com",
    to: options.email,
    subject: options.subject,
    text: mailTextual,
    html: mailHTML,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed. Make sure you have provided the Mailtrap creds in the .env file",
    );
    console.error("Error:", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to the Application!",
      action: {
        instruction:
          "To verify your email, please click on the button/URL below",
        button: {
          color: "#1ac9d9ff",
          text: "Confirm your account",
          link: verificationUrl,
        },
      },
      outro: "If you need any help, please revert back to the email",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password",
      action: {
        instruction:
          "To reset your password, please click on the button/URL below",
        button: {
          color: "#ddba20ff",
          text: "Reset Password ",
          link: passwordResetUrl,
        },
      },
      outro: "If you need any help, please revert back to the email",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendMail,
};
