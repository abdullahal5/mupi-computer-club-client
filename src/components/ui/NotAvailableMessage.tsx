import { FaRegFrown } from "react-icons/fa";

const NotAvailableMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-center border h-[60vh] flex items-center justify-center p-6 rounded-md shadow-lg border-gray-500 text-gray-400">
      <div className="flex items-center justify-center space-x-6">
        <div className="text-center">
          <FaRegFrown className="text-5xl text-gray-400 mx-auto text-center" />
          <p className="text-3xl font-semibold text-gray-700">{message}</p>
          <p className="mt-2 text-gray-500">
            Please check back later or explore other sections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotAvailableMessage;
