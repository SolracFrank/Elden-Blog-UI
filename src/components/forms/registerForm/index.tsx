import { useFormik } from "formik";
import { registerProps } from "../../../interfaces/authInterfaces";
import registerSchema from "../../../schemas/userSchemas/registerSchema";
import { DateConverter } from "../../../utils/dateConverter";
import { useState } from "react";
import { UseRegister } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ProblemDetails } from "../../../interfaces/httpInterfaces";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [zodErrors, setZodErros] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { registerUser } = UseRegister();
  const navigate = useNavigate();

  const ValidateOnSubmit = (
    values: registerProps,
    setErrors: (errors: Record<string, string>) => void
  ) => {
    const newValuest = { ...values, birthdate: DateConverter(values.birthday) };
    const result = registerSchema.safeParse(newValuest);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((error) => {
        errors[error.path[0]] = error.message;

        setZodErros(errors);
        setErrors(errors);
        console.log("errors: ", errors); //101 TO DELETE
      });
      return false;
    }
    return true;
  };

  const { handleSubmit, handleChange, setErrors } = useFormik({
    initialValues: {
      email: "",
      username: "",
      birthday: "",
      password: "",
      repeatpassword: "",
    },
    onSubmit: async (values: registerProps) => {
      const isValid = await ValidateOnSubmit(values, setErrors);
      if (!isValid) {
        console.log("Invalid inputs, ERRORS: ", values); // 101 TO DELETE
        return;
      }
      console.log("Correct Values: ", values); // 101 TO DELETE
      console.log("Sending to API");
      
      setIsLoading(true);
      try {
        const response = await registerUser(values);
        console.log('api response: ',response); // 101 TO DELETE
        
        if (response.status === 200 || response.status === 201) {
          navigate("/login");
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        const problemDetails = axiosError.response?.data as ProblemDetails;
        const { title, errors } = problemDetails || {};
        toast.error(`${title} ${errors}`);
      } finally {
        setIsLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className="block border-2 border-solid my-10 mx-auto px-4 w-full md:w-2/3 lg:w-1/2 xl:w-2/6 shadow-lg rounded-lg border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="w-full p-6">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            placeholder="username"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {zodErrors.username && (
            <div className="text-red-600">{zodErrors.username}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="birthday"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Birthday
          </label>
          <input
            id="birthday"
            name="birthday"
            type="date"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {zodErrors.birthday && (
            <div className="text-red-600">{zodErrors.birthday}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="email"
            type="email"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {zodErrors.email && (
            <div className="text-red-600">{zodErrors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {zodErrors.password && (
            <div className="text-red-600">{zodErrors.password}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="repeatpassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Repeat password
          </label>
          <input
            id="repeatpassword"
            name="repeatpassword"
            type="password"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {zodErrors.repeatpassword && (
            <div className="text-red-600">{zodErrors.repeatpassword}</div>
          )}
        </div>
        <div className="flex items-center justify-between mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
            value={isLoading ? "SIGNING" : "SIGN UP"}

          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegisterForm;
