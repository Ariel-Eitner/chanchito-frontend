"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import useLogin from "./useLogin";

// Definir el esquema de validación con Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    // .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

export default function LoginForm() {
  const { handleLogin } = useLogin();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleLogin(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
            Iniciar Sesión
          </h2>

          <div className="mb-6">
            <label
              className="block text-blue-600 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Ingresa tu correo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-blue-600 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="******************"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
            </button>
            <Link
              href="/auth/signup"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Crear una cuenta
            </Link>
          </div>

          <div className="text-center mt-4">
            <Link
              href="/auth/forgot-password"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
