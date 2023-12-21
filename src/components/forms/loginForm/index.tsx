import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useState } from "react";
import { loginProps } from "../../../interfaces/authInterfaces";
import loginSchema from "../../../schemas/userSchemas/loginSchema";
import { useNavigate } from "react-router-dom";
import { UseLogin } from "../../hooks/useAuth";
import { AxiosError } from "axios";
import { ProblemDetails } from "../../../interfaces/httpInterfaces";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../context/useAuthContext";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [zodErrors, setZodErros] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { loginUser } = UseLogin();

  const { login } = useAuthContext();

  const ValidateOnSubmit = (
    values: loginProps,
    setErrors: (errors: Record<string, string>) => void
  ) => {
    setZodErros({});
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((error) => {
        errors[error.path[0]] = error.message;

        setZodErros(errors);
        setErrors(errors);
      });
      return false;
    }
    return true;
  };

  const { handleSubmit, handleChange, setErrors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: loginProps) => {
      const isValid = ValidateOnSubmit(values, setErrors);
      if (!isValid) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await loginUser(values);
        console.log("api response: ", response);

        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status == 204
        ) {
          if (response.data.jwToken) {
            await login({
              userId: response.data.userId,
              userName: response.data.userName,
              email: response.data.email,
              jwToken: response.data.jwToken,
              jwtExpires: response.data.jwtExpires,
              sessionDuration: response.data.sessionDuration,
            });
            navigate("/");
          } else {
            toast.error("Error has occurred, try again");
          } 
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        const problemDetails = axiosError.response?.data as ProblemDetails;
        const { title, errors, detail } = problemDetails || {};
        toast.error(
          `${title ? `: ${title}` : 'Server connection error'} ${detail ? `: ${detail}` : ''} ${errors ? ` - ${JSON.stringify(errors)}` : ''}`
        );
        
      } finally {
        setIsLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div
      className="block border-gray border-gray-200 
       my-10 mx-auto px-4 w-full md:w-2/3 lg:w-1/2 xl:w-2/6 shadow-lg rounded-lg 
    "
    >
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col w-full h-full p-6 "
      >
        <div className="mb-4 ">
          <label
            htmlFor="email"
            className="block text-center sm:text-left lg:text-left text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
            focus:border-blue-500 focus:shadow-outline transition duration-150"
          />
          {zodErrors.email && (
            <div className="text-red-600">{zodErrors.email}</div>
          )}
        </div>
        <div className="mb-4 ">
          <label
            htmlFor="password"
            className="block text-center sm:text-left lg:text-left text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
            focus:border-blue-500 focus:shadow-outline transition duration-150"
            />
            {zodErrors.password && (
              <div className="text-red-600">{zodErrors.password}</div>
            )}
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? (
                <IconEyeOff className="text-blue-600" size={24} />
              ) : (
                <IconEye className="text-blue-600" size={24} />
              )}
            </div>
          </div>
        </div>
        <div className="flex-grow mt-4"></div>
        <div className="flex w-full  items-center justify-center mt-8">
          <button
            className="p-4 px-8  text-gray-200 rounded-md shadow-md shadow-gray-200
            bg-blue-500 hover:bg-blue-700 "
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Loging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
