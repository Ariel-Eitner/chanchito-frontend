import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface FormData {
  firstName: string;
  secondName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useSignUpHandlers = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          secondName: formData.secondName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const messages = Array.isArray(errorData.message)
          ? errorData.message
          : [errorData.message];

        messages.forEach((msg: string) => {
          console.error("Error:", msg);
          toast.error(msg);
        });

        return;
      }

      const data = await response.json();
      toast.success(data.message);

      document.cookie = `accessToken=${data.token}; path=/; samesite=strict`;

      router.push("/home");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un problema al conectarse al servidor");
    }
  };

  return {
    handleSubmit,
  };
};
