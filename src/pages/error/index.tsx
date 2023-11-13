import { useRouteError, Link } from "react-router-dom";

interface ErrorData {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const errorRaw = useRouteError();
  const error: ErrorData | undefined =
    typeof errorRaw === "object" ? (errorRaw as ErrorData) : undefined;
  return (
    <div
      id="error-page"
      className="bg-oscure-300 h-screen flex justify-center items-center"
    >
      <div className="text-2xl text-center text-oscure-100 font-bold">
        <h1>Oops!</h1>
        <p className=" text-lg font-normal">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="font-thin text-3xl mb-3">
          {error && <i>{error.statusText || error.message} </i>}
        </p>
        <Link
          className="p-2 space-y-2 bg-sky-600 border-solid
           border-gray-200 rounded-xl shadow-md shadow-gray-300
           text-gray-200"
          to="/"
        >
          {" "}
          Go Back
        </Link>
      </div>
    </div>
  );
}
