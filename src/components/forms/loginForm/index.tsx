import { FormikHelpers, useFormik } from "formik";
import { registerProps } from "../../../interfaces/authInterfaces";

const LoginForm = () => {
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      username: "",
      birthday: new Date(),
      password: "",
      repeatpassword: "",
    },
    onSubmit: (
      values: registerProps,
      { setSubmitting }: FormikHelpers<registerProps>
    ) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 500);
    },
  });

  return (
    <div className="block border-2 border-solid my-10 mx-auto px-4 w-full md:w-2/3 lg:w-1/2 xl:w-2/6 shadow-lg rounded-lg border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="w-full p-6">
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            id="userName"
            name="userName"
            placeholder="username"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="birthdate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Birthdate
          </label>
          <input
            id="birthdate"
            name="birthdate"
            type="date"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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
        </div>
        <div className="flex items-center justify-between mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
