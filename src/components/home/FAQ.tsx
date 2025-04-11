import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { faqData } from "../../constants";

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h1>

      <div className="max-w-4xl mx-auto space-y-2">
        {faqData.map((item) => (
          <div
            key={item.id}
            className={`bg-[#17163A] rounded-xl overflow-hidden border border-white/10 transition-all duration-300 ${
              openId === item.id ? "shadow-lg shadow-blue-500/10" : ""
            }`}
          >
            <button
              onClick={() => toggleQuestion(item.id)}
              className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors duration-200"
              aria-expanded={openId === item.id}
              aria-controls={`faq-${item.id}`}
            >
              <span className="text-lg font-medium text-white">
                {item.question}
              </span>
              <BiChevronDown
                className={`w-6 h-6 min-w-6 text-blue-400 transition-transform duration-300 ${
                  openId === item.id ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id={`faq-${item.id}`}
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                openId === item.id
                  ? "max-h-[500px] opacity-100 pb-6"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="prose prose-invert">
                <p className="text-gray-300">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
