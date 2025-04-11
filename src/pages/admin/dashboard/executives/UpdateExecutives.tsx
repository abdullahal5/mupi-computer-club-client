/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { advisor, developerPositions, executives } from "../../../../constants";
import { ICommittee, IExecutives, TResponse } from "../../../../types";
import { useNavigate } from "react-router-dom";
import {
  useGetSingleExecutiveQuery,
  useUpdateExecutiveMutation,
} from "../../../../redux/features/executives/executivesApi";
import { useGetAllCommitteesQuery } from "../../../../redux/features/committee/committeeApi";
import Loading from "../../../../components/ui/Loading";

const UpdateExecutives = ({
  onClose,
  id,
}: {
  onClose: () => void;
  id: string;
}) => {
  const { data: getSingleExecutiveInfo, isLoading, isFetching } = useGetSingleExecutiveQuery(id, {
    skip: !id,
  });

  const getsingleExecutiveData = getSingleExecutiveInfo?.data as IExecutives;

  const [roleType, setRoleType] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState<string>("");
  const [updateExecutives] = useUpdateExecutiveMutation();
  const { data: getAllCommICommitteeInfo } =
    useGetAllCommitteesQuery(undefined);
  const getAllCommICommitteeData =
    getAllCommICommitteeInfo?.data as ICommittee[];

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const loadingToast = toast.loading("Uploading...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=32759f60f432e8e5c388e20a2da70600",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        const imageUrl = result.data.url;
        setImage(imageUrl);
        toast.success("Image uploaded successfully!", { id: loadingToast });
      } else {
        toast.error("Image upload failed!", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Error uploading image!", { id: loadingToast });
    }
  };

  const [communitySession, setCommunitySession] = useState("");
  const router = useNavigate();

  const handleSessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCommunitySession(value);
  };

  useEffect(() => {
    if (getsingleExecutiveData) {
      setRoleType(getsingleExecutiveData?.roleType || "");
      setImage(getsingleExecutiveData?.profileImage || "");
      setCommunitySession(getsingleExecutiveData?.communitySession || "");
      setPosition(getsingleExecutiveData?.position || "");
    }
  }, [getsingleExecutiveData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as any;

    const session = target.session.value;

    const regex = /^(\d{4})-(\d{4})$/;
    const match = session.match(regex);

    if (!match) {
      toast.error("Please enter a valid session in the format YYYY-YYYY.");
      return;
    }

    const start = parseInt(match[1]);
    const end = parseInt(match[2]);

    if (end - start !== 1) {
      toast.error("The year difference must be exactly one when add session.");
      return;
    }

    const profileImage = image;
    const name = target.name.value;
    const email = target.email.value;
    const contact = target.contact.value;
    const roleType = target.roleType.value;
    const role = target.role.value;
    const facebook = target.facebook.value;
    const linkedin = target.linkedin.value;
    const twitter = target.twitter.value;

    const res = (await updateExecutives({
      id: id,
      executiveData: {
        profileImage,
        fullName: name,
        email,
        contact,
        role,
        session,
        communitySession,
        roleType,
        position: roleType === "developer" ? position : "N/A",
        facebook,
        linkedin,
        twitter,
      },
    })) as unknown as TResponse<any>;

    if (res.error) {
      toast.error(res.error.data.message, {
        duration: 2000,
      });

      onClose();
    } else {
      toast.success(res.data.message, {
        duration: 2000,
      });
      onClose();

      router("/admin/dashboard/executives");
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Update Executives
          </h2>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center justify-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-100 border-4 border-[#000030]">
                    {image ? (
                      <img
                        src={image || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaCloudUploadAlt className="text-4xl text-gray-400" />
                      </div>
                    )}
                    <label
                      htmlFor="image-upload"
                      className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="text-white text-sm font-medium">
                        Upload Image
                      </span>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={getsingleExecutiveData?.fullName}
                    placeholder="Enter full name"
                    name="name"
                    className="mt-1 p-3 block w-full rounded-md focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                    required
                  />
                </div>
                <div className="flex lg:flex-row md:flex-row flex-col gap-4">
                  <div className="lg:w-1/2 md:w-1/2 w-full">
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Contact
                    </label>
                    <input
                      type="text"
                      id="contact"
                      defaultValue={getsingleExecutiveData?.contact}
                      placeholder="Enter phone number"
                      name="contact"
                      className="mt-1 p-3 block w-full rounded-md focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                      required
                    />
                  </div>
                  <div className="lg:w-1/2 md:w-1/2 w-full">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={getsingleExecutiveData?.email}
                      id="email"
                      placeholder="Enter email address"
                      name="email"
                      className="mt-1 p-3 block w-full rounded-md focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <label
                  htmlFor="roll"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Session
                </label>
                <input
                  type="text"
                  id="session"
                  placeholder="Enter session"
                  defaultValue={getsingleExecutiveData?.session}
                  name="session"
                  className="mt-1 p-3 block w-full rounded-md focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                />
              </div>
              <div className="w-full md:w-1/3">
                <label
                  htmlFor="Committee's"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Committee's
                </label>
                <select
                  id="communitySession"
                  name="communitySession"
                  value={communitySession}
                  onChange={handleSessionChange}
                  className="mt-1 p-3 block w-full rounded-md focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                >
                  <option value="" disabled>
                    Select a Committee
                  </option>
                  {getAllCommICommitteeData?.map((sessionItem) => (
                    <option
                      className="text-black"
                      key={sessionItem?._id}
                      value={sessionItem?.year}
                    >
                      {sessionItem?.year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Type
                </label>
                <div className="flex gap-4 pt-3">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="roleType"
                      value="advisor"
                      checked={roleType === "advisor"}
                      className="form-radio h-5 w-5 text-[#000030] border-gray-300 focus:ring-[#000030]"
                      onChange={(e) => setRoleType(e.target.value)}
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">Advisor</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="roleType"
                      value="executive"
                      checked={roleType === "executive"}
                      className="form-radio h-5 w-5 text-[#000030] border-gray-300 focus:ring-[#000030]"
                      onChange={(e) => setRoleType(e.target.value)}
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Executive
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="roleType"
                      value="developer"
                      checked={roleType === "developer"}
                      className="form-radio h-5 w-5 text-[#000030] border-gray-300 focus:ring-[#000030]"
                      onChange={(e) => setRoleType(e.target.value)}
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Developer
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5">
              <div className="flex-1">
                {roleType && (
                  <div className="w-full">
                    <label
                      htmlFor="roleSelect"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {`${roleType} role`}
                    </label>
                    <select
                      id="roleSelect"
                      name="role"
                      defaultValue={getsingleExecutiveData.role}
                      className="mt-1 p-3 block w-full rounded-md focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                    >
                      <option className="text-black" value="">
                        Select Role
                      </option>
                      {roleType === "advisor" && (
                        <>
                          {advisor.map((option, idx) => (
                            <option
                              key={idx}
                              className="text-black"
                              value={option.value}
                            >
                              {option.name.charAt(0).toUpperCase() +
                                option.name.slice(1).toLowerCase()}
                            </option>
                          ))}
                        </>
                      )}
                      {roleType === "executive" && (
                        <>
                          {executives.map((option, idx) => (
                            <option
                              key={idx}
                              className="text-black"
                              value={option.value}
                            >
                              {option.name.charAt(0).toUpperCase() +
                                option.name.slice(1).toLowerCase()}
                            </option>
                          ))}
                        </>
                      )}
                      {roleType === "developer" && (
                        <>
                          {developerPositions.map((option, idx) => (
                            <option
                              key={idx}
                              className="text-black"
                              value={option.value}
                            >
                              {option.name.charAt(0).toUpperCase() +
                                option.name.slice(1).toLowerCase()}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    LinkedIn Link
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    defaultValue={getsingleExecutiveData?.linkedin}
                    placeholder="Enter LinkedIn URL"
                    className="mt-1 p-3 block w-full rounded-md focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="facebook"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Facebook Link
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    defaultValue={getsingleExecutiveData?.facebook}
                    name="facebook"
                    placeholder="Enter Facebook URL"
                    className="mt-1 p-3 block w-full rounded-md focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="twitter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Twitter Link
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    defaultValue={getsingleExecutiveData?.twitter}
                    name="twitter"
                    placeholder="Enter Twitter URL"
                    className="mt-1 p-3 block w-full rounded-md focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#000030] text-white rounded-md text-lg"
              >
                Update Executive
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateExecutives;
