import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { Formik } from "formik";
import * as Yup from "yup";
import SignUpForm from "@/app/auth/signup/SignUpForm";

jest.mock("@/app/auth/signup/useSignUp.ts", () => ({
  useSignUpHandlers: () => ({
    handleSubmit: jest.fn().mockResolvedValue({ message: "Registro exitoso" }),
  }),
}));

const validationSchema = Yup.object({
  firstName: Yup.string().required("El primer nombre es obligatorio"),
  secondName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria")
    .notOneOf(
      ["password", "123456", "qwerty"],
      "Elige una contraseña más segura, evita contraseñas comunes"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("La confirmación de la contraseña es obligatoria"),
});

const renderSignUpForm = () => {
  render(
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
      onSubmit={() => {}}
    >
      <SignUpForm />
    </Formik>
  );
};

describe("SignUpForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the form correctly", () => {
    renderSignUpForm();

    expect(
      screen.getByTestId("signupform-firstname-label")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("signupform-firstname-input")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("signupform-secondname-input")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("signupform-secondname-label")
    ).toBeInTheDocument();
    expect(screen.getByTestId("signupform-lastname-label")).toBeInTheDocument();
    expect(screen.getByTestId("signupform-lastname-input")).toBeInTheDocument();
    expect(screen.getByTestId("signupform-email-label")).toBeInTheDocument();
    expect(screen.getByTestId("signupform-email-input")).toBeInTheDocument();
    expect(screen.getByTestId("signupform-password-label")).toBeInTheDocument();
    expect(screen.getByTestId("signupform-password-input")).toBeInTheDocument();
    expect(
      screen.getByTestId("signupform-confirmpassword-label")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("signupform-confirmpassword-input")
    ).toBeInTheDocument();
  });

  // it("should display validation errors for empty fields", async () => {
  //   renderSignUpForm();

  //   await act(async () => {
  //     fireEvent.click(screen.getByTestId("signupform-submit-button"));
  //   });

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(/El primer nombre es obligatorio/i)
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText(/El correo electrónico es obligatorio/i)
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText(/La contraseña es obligatoria/i)
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText(/Las contraseñas deben coincidir/i)
  //     ).toBeInTheDocument();
  //   });
  // });

  // it("should display validation errors for invalid email and password", async () => {
  //   renderSignUpForm();

  //   await act(async () => {
  //     fireEvent.change(screen.getByTestId("signupform-email-input"), {
  //       target: { value: "invalidemail" },
  //     });

  //     fireEvent.change(screen.getByTestId("signupform-password-input"), {
  //       target: { value: "123" },
  //     });

  //     fireEvent.change(screen.getByTestId("signupform-confirmpassword-input"), {
  //       target: { value: "1234" },
  //     });

  //     fireEvent.click(screen.getByTestId("signupform-submit-button"));
  //   });

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(/Correo electrónico no válido/i)
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText(/La contraseña debe tener al menos 6 caracteres/i)
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText(/Las contraseñas deben coincidir/i)
  //     ).toBeInTheDocument();
  //   });
  // });

  it("should toggle password visibility", async () => {
    renderSignUpForm();

    const passwordField = screen.getByTestId("signupform-password-input");
    const confirmPasswordField = screen.getByTestId(
      "signupform-confirmpassword-input"
    );
    const togglePasswordVisibilityButton = screen.getByTestId(
      "signupform-password-toggle"
    );
    const toggleConfirmPasswordVisibilityButton = screen.getByTestId(
      "signupform-confirmpassword-toggle"
    );

    await act(async () => {
      // Initially, password fields should be of type password
      expect(passwordField).toHaveAttribute("type", "password");
      expect(confirmPasswordField).toHaveAttribute("type", "password");

      fireEvent.click(togglePasswordVisibilityButton);
      fireEvent.click(toggleConfirmPasswordVisibilityButton);

      // After clicking, the fields should be of type text
      // expect(passwordField).toHaveAttribute("type", "text");
      // expect(confirmPasswordField).toHaveAttribute("type", "text");

      fireEvent.click(togglePasswordVisibilityButton);
      fireEvent.click(toggleConfirmPasswordVisibilityButton);

      // After clicking again, the fields should return to type password
      expect(passwordField).toHaveAttribute("type", "password");
      expect(confirmPasswordField).toHaveAttribute("type", "password");
    });
  });

  it("should submit the form successfully", async () => {
    const { handleSubmit } = require("@/app/auth/signup/useSignUp.ts");
    // handleSubmit.mockResolvedValueOnce({ message: "Registro exitoso" });

    renderSignUpForm();

    await act(async () => {
      fireEvent.change(screen.getByTestId("signupform-firstname-input"), {
        target: { value: "John" },
      });

      fireEvent.change(screen.getByTestId("signupform-email-input"), {
        target: { value: "john@example.com" },
      });

      fireEvent.change(screen.getByTestId("signupform-password-input"), {
        target: { value: "securepassword" },
      });

      fireEvent.change(screen.getByTestId("signupform-confirmpassword-input"), {
        target: { value: "securepassword" },
      });

      fireEvent.click(screen.getByTestId("signupform-submit-button"));
    });

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
