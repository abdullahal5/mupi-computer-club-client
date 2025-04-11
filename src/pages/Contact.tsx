/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";
import { useSendEmailMutation } from "../redux/features/contact/contactApi";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sendEmail, { isLoading }] = useSendEmailMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Logging in...");

    try {
      const res = (await sendEmail(formData)) as any;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        toast.dismiss(loadingToastId);
      } else {
        toast.success(res.data.message, {
          duration: 2000,
        });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        toast.dismiss(loadingToastId);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.dismiss(loadingToastId);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg p-6 text-white">
        {/* Contact Info Section */}
        <div className="space-y-4 bg-[#17163A] p-10 rounded-lg">
          <h2 className="text-2xl font-semibold">Contact us</h2>
          <p>Your email address is safe with us</p>
          <div className="space-y-2">
            <p className="flex items-center">
              📞 <span className="ml-2">01585 565441</span>
            </p>
            <p className="flex items-center">
              ✉️ <span className="ml-2">yourmail@domain.com</span>
            </p>
            <p className="flex items-center">
              📍{" "}
              <span className="ml-2">
                26 Mirkadim, Munshiganj Sadar, Munshiganj - 0059
              </span>
            </p>
          </div>
          <div>
            <p>Follow us for more!</p>
            <div className="flex space-x-3 mt-2">
              <a
                href="#"
                className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600"
              >
                <FaFacebook size={20} color="white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600"
              >
                <LiaLinkedin size={20} color="white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600"
              >
                <BsTwitter size={20} color="white" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-[#17163A] p-10 rounded-lg"
          >
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-[#2e2d4e] text-white rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-600"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-[#2e2d4e] text-white rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-600"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full bg-[#2e2d4e] text-white rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-600"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
