import { useState } from "react";

export const useForgotPasswordHandlers = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Requesting password reset for:", email);
    setSubmitted(true);
  };

  return {
    email,
    setEmail,
    submitted,
    handleForgotPassword,
  };
};
