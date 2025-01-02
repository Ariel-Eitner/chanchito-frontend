"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import * as Yup from "yup";
import { useState } from "react";

const SignupForm = ({ handleSubmit }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("El primer nombre es obligatorio"),
    secondName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
      .required("Confirmar la contraseña es obligatorio"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        secondName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values); // Pasamos los valores a la función handleSubmit
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
          data-testid="signupform-form"
        >
          <h2
            className="text-4xl font-extrabold text-center mb-8 text-blue-700"
            data-testid="signupform-title"
          >
            Crear Cuenta
          </h2>

          {/* Campo Primer Nombre */}
          <div className="mb-6" data-testid="signupform-firstname-field">
            <label
              className="block text-blue-600 text-sm font-semibold mb-2"
              htmlFor="firstName"
              data-testid="signupform-firstname-label"
            >
              Primer Nombre
            </label>
            <Field
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Ingresa tu primer nombre"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
              data-testid="signupform-firstname-input"
            />
            <ErrorMessage
              name="firstName"
              component="p"
              className="text-red-500 text-sm mt-1"
              data-testid="signupform-firstname-error"
            />
          </div>

          {/* Campo Segundo Nombre */}
          <div className="mb-6" data-testid="signupform-secondname-field">
            <label
              className="block text-blue-600 text-sm font-semibold mb-2"
              htmlFor="secondName"
              data-testid="signupform-secondname-label"
            >
              Segundo Nombre (Opcional)
            </label>
            <Field
              id="secondName"
              name="secondName"
              type="text"
              placeholder="Ingresa tu segundo nombre"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
              data-testid="signupform-secondname-input"
            />
            <ErrorMessage
              name="secondName"
              component="p"
              className="text-red-500 text-sm mt-1"
              data-testid="signupform-secondname-error"
            />
          </div>

          {/* Campo Apellido */}
          <div className="mb-6" data-testid="signupform-lastname-field">
            <label
              className="block text-blue-600 text-sm font-semibold mb-2"
              htmlFor="lastName"
              data-testid="signupform-lastname-label"
            >
              Apellido (Opcional)
            </label>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Ingresa tu apellido"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
              data-testid="signupform-lastname-input"
            />
            <ErrorMessage
              name="lastName"
              component="p"
              className="text-red-500 text-sm mt-1"
              data-testid="signupform-lastname-error"
            />
          </div>

          {/* Campo Correo Electrónico */}
          <div className="mb-6" data-testid="signupform-email-field">
            <label
              className="block text-blue-600 text-sm font-semibold mb-2"
              htmlFor="email"
              data-testid="signupform-email-label"
            >
              Correo Electrónico
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Ingresa tu correo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
              data-testid="signupform-email-input"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm mt-1"
              data-testid="signupform-email-error"
            />
          </div>

          {/* Campo Contraseña */}
          <div
            className="mb-6 relative"
            data-testid="signupform-password-field"
          >
            <label
              className="block text-blue-600 text-sm font-semibold mb-2"
              htmlFor="password"
              data-testid="signupform-password-label"
            >
              Contraseña
            </label>
            <Field
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="******************"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500 pr-10"
              data-testid="signupform-password-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-7 flex items-center px-3"
              data-testid="signupform-password-toggle"
            >
              {showPassword ? (
                <FaEyeSlash className="text-black" />
              ) : (
                <FaEye className="text-black" />
              )}
            </button>
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm mt-1"
              data-testid="signupform-password-error"
            />
          </div>

          {/* Campo Confirmar Contraseña */}
          <div
            className="mb-6 relative"
            data-testid="signupform-confirmpassword-field"
          >
            <label
              className="block text-blue-600 text-sm font-semibold mb-2"
              htmlFor="confirmPassword"
              data-testid="signupform-confirmpassword-label"
            >
              Confirmar Contraseña
            </label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="******************"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500 pr-10"
              data-testid="signupform-confirmpassword-input"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 top-7 flex items-center px-3"
              data-testid="signupform-confirmpassword-toggle"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-black" />
              ) : (
                <FaEye className="text-black" />
              )}
            </button>
            <ErrorMessage
              name="confirmPassword"
              component="p"
              className="text-red-500 text-sm mt-1"
              data-testid="signupform-confirmpassword-error"
            />
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center justify-between">
            <button
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
              data-testid="signupform-submit-button"
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
            <Link
              href="/auth/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              data-testid="signupform-login-link"
            >
              Iniciar Sesión
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
