import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        error.forEach((errMsg: string) => {
          toast.error(errMsg);
        });
        return;
      }

      const data = await res.json();
      toast.success(data.message);
      const token = data.token;
      document.cookie = `accessToken=${token}; path=/; samesite=strict`;
      router.push("/home");
    } catch (error) {
      toast.error(
        "An error occurred. Please check your email and password and try again."
      );
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
}
