import { text } from "express";
import Mailgen from "mailgen";

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

export { emailVerificationMailgenContent, forgotPasswordMailgenContent };
