import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Oops! Something Went Wrong!</h1>
      <p className="text-gray-300 text-center max-w-md mb-6">
        It seems we couldn't find the page you're looking for. Don't worry, you
        can always go back to the home page.
      </p>
      <button
        onClick={handleReturnHome}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md transition duration-300"
      >
        Return Home
      </button>
    </div>
  );
};

export default Error;
