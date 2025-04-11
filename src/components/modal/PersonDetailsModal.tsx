import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";
import { IExecutives } from "../../types";
import { useGetSingleExecutiveQuery } from "../../redux/features/executives/executivesApi";
import { useEffect, useState } from "react";
import Loading from "../ui/Loading";

interface AnimeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  executiveId: string | null;
}

export default function AnimeCardModal({
  isOpen,
  onClose,
  executiveId,
}: AnimeCardModalProps) {
  const { data: getSingleExecutiveInfo, isLoading, isFetching } =
    useGetSingleExecutiveQuery(executiveId, { skip: !executiveId });

  const [executiveData, setExecutiveData] = useState<IExecutives | null>(null);

  useEffect(() => {
    if (getSingleExecutiveInfo?.data) {
      setExecutiveData(getSingleExecutiveInfo.data);
    }
  }, [getSingleExecutiveInfo]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-4 sm:py-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto duration-300">
          <div className="relative overflow-hidden rounded-xl bg-[#1a1b35] text-white">
            {/* Background Logo */}
            <div
              className="absolute -right-20 -top-28 w-full h-full opacity-20"
              style={{
                backgroundImage: "url(https://i.ibb.co/t8y38K0/logo.png)",
                backgroundSize: "contain",
                backgroundPosition: "center right",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Content Container */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Side */}
                <div className="flex flex-col space-y-4 md:space-y-6 w-full md:w-1/2">
                  <div>
                    <div className="inline-block rounded-lg bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
                      {executiveData?.communitySession}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {executiveData?.fullName}
                    </h2>
                    <p className="text-purple-300 text-sm sm:text-base">
                      {executiveData?.role}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs sm:text-sm text-purple-300">
                        Session
                      </p>
                      <p className="text-white text-sm sm:text-base">
                        {executiveData?.session}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs sm:text-sm text-purple-300">
                        Contact
                      </p>
                      <p className="text-white text-sm sm:text-base">
                        {executiveData?.contact}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs sm:text-sm text-purple-300">
                        Email
                      </p>
                      <p className="text-white text-sm sm:text-base">
                        {executiveData?.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs sm:text-sm text-purple-300">
                      Socials
                    </p>
                    <div className="flex space-x-3">
                      <a
                        href={executiveData?.facebook}
                        className="rounded-full bg-purple-500/20 p-2 transition-colors hover:bg-purple-500/30"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaFacebook className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                      <a
                        href={executiveData?.twitter}
                        className="rounded-full bg-purple-500/20 p-2 transition-colors hover:bg-purple-500/30"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <BsTwitter className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                      <a
                        href={executiveData?.linkedin}
                        className="rounded-full bg-purple-500/20 p-2 transition-colors hover:bg-purple-500/30"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LiaLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="md:absolute md:right-0 md:bottom-0 flex-shrink-0 w-full md:w-1/2 h-64 md:h-[400px] flex items-center justify-center">
                  <img
                    src={executiveData?.profileImage}
                    alt={executiveData?.fullName || "Executive"}
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full bg-purple-500/20 p-1 sm:p-2 transition-colors hover:bg-purple-500/30"
            >
              <span className="text-xl sm:text-2xl">&times;</span>
            </button>

            {/* Purple Glow Border */}
            <div className="absolute inset-0 rounded-xl border border-purple-500/50 shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]" />
          </div>
        </div>
      )}
    </div>
  );
}
