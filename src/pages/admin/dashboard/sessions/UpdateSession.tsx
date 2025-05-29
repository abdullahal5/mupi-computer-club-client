/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { ISession, TResponse } from "../../../../types";
import { useNavigate } from "react-router-dom";
import {
  useGetSingleSessionQuery,
  useUpdateSessionMutation,
} from "../../../../redux/features/sessions/sessionsApi";
import Loading from "../../../../components/ui/Loading";
import { formats, modulesWithoutImage } from "../../../../shared";
import ReactQuill from "react-quill";

const convertTo24HourFormat = (time: string): string => {
  if (!time) return "";

  const match = time.match(/(\d+):(\d+) (\w+)/);
  if (!match) return time;

  const [, hours, minutes, period] = match;
  let hour = parseInt(hours, 10);

  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return `${hour.toString().padStart(2, "0")}:${minutes}`;
};

const UpdateSession = ({
  onClose,
  id,
}: {
  onClose: () => void;
  id: string;
}) => {
  const [updateEvent] = useUpdateSessionMutation();

  const {
    data: getSingleSessionInfo,
    isLoading,
    isFetching,
  } = useGetSingleSessionQuery(id, {
    skip: !id,
  });

  const sessionData = getSingleSessionInfo?.data as ISession;

  const [images, setImages] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [sponsorLogos, setSponsorLogos] = useState<string[]>([]);
  const [eligibilityCriteria, setEligibilityCriteria] = useState<string[]>([
    "",
  ]);
  const router = useNavigate();

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  useEffect(() => {
    if (sessionData) {
      setEligibilityCriteria(sessionData.eligibilityCriteria || []);
      setImages(sessionData.images || []);
      setValue(sessionData?.description || "");
      setSponsorLogos(sessionData?.sponsorLogos || []);
    }
  }, [sessionData]);

  const removeField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFieldChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleFileChange = async (
    session: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = session.target.files;
    if (!files || files.length === 0) return;

    const loadingToast = toast.loading("Uploading images...");

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
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
          return result.data.url;
        } else {
          throw new Error("Upload failed");
        }
      });

      const uploadedImages = await Promise.all(uploadPromises);

      setImages((prev) => [...prev, ...uploadedImages]);

      toast.success("Images uploaded successfully!", { id: loadingToast });
    } catch (error) {
      toast.error("Error uploading images!", { id: loadingToast });
    }
  };

  const handleSponsorLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const loadingToast = toast.loading("Uploading sponsor logos...");

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
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
          return result.data.url;
        } else {
          throw new Error("Upload failed");
        }
      });

      const uploadedLogos = await Promise.all(uploadPromises);
      setSponsorLogos((prev) => [...prev, ...uploadedLogos]);
      toast.success("Sponsor logos uploaded successfully!", {
        id: loadingToast,
      });
    } catch (error) {
      toast.error("Error uploading sponsor logos!", { id: loadingToast });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Loading");

    const target = e.target as any;

    const title = target.title.value;
    const instructorName = target.instructorName.value;
    const status = target.status.value;
    const date = target.date.value;
    let startTime = target.startTime.value;
    let endTime = target.endTime.value;
    const description = value;
    const location = target.location.value;
    const sessionLink = target.sessionLink.value;

    const convertTo12HourFormat = (time: string) => {
      if (!time) return "";

      // eslint-disable-next-line prefer-const
      let [hours, minutes] = time.split(":").map(Number);
      let period = "AM";

      if (hours >= 12) {
        period = "PM";
        if (hours > 12) hours -= 12;
      } else if (hours === 0) {
        hours = 12;
      }

      return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    startTime = convertTo12HourFormat(startTime);
    endTime = convertTo12HourFormat(endTime);

    const res = (await updateEvent({
      id: id,
      sessionData: {
        title,
        instructorName,
        images,
        status,
        date,
        description,
        location,
        sponsorLogos,
        startTime,
        sessionLink,
        endTime,
        eligibilityCriteria,
      },
    })) as unknown as TResponse<any>;

    if (res.error) {
      toast.error(res.error.data.message, {
        duration: 2000,
        id: toastId,
      });

      onClose();
    } else {
      toast.success(res.data.message, {
        duration: 2000,
        id: toastId,
      });
      onClose();

      router("/admin/dashboard/sessions");
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto shadow-md rounded-lg p-6 space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Update New Session
          </h2>

          <div className="space-y-4">
            {/* Title + Instructor Name */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Session Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="This is a new "
                  defaultValue={sessionData?.title}
                  className="mt-1 p-3 w-full rounded-md shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="instructorName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Instructor Name
                </label>
                <input
                  type="text"
                  id="instructorName"
                  name="instructorName"
                  placeholder="himel vai"
                  defaultValue={sessionData?.instructorName}
                  className="mt-1 p-3 w-full rounded-md shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Session Images
              </label>
              <div className="flex flex-wrap gap-4">
                {images?.map((image, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-white/15 hover:bg-white/25 transition"
                >
                  <FaCloudUploadAlt className="text-2xl text-[#000030]" />
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Status */}
            <div>
              <select
                id="status"
                name="status"
                defaultValue={sessionData?.status}
                className="mt-1 p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                required
              >
                <option className="text-black" value="upcoming">
                  Upcoming
                </option>
                <option className="text-black" value="past">
                  Past Activities
                </option>
              </select>
            </div>

            {/* Date & Start Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={sessionData?.date}
                  className="mt-1 p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="start-time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  id="start-time"
                  name="startTime"
                  defaultValue={
                    sessionData?.startTime
                      ? convertTo24HourFormat(sessionData.startTime)
                      : ""
                  }
                  className="mt-1 p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  required
                />
              </div>
            </div>

            {/* End Time & Location */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex-1">
                <label
                  htmlFor="end-time"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Time
                </label>
                <input
                  type="time"
                  id="end-time"
                  name="endTime"
                  defaultValue={
                    sessionData?.endTime
                      ? convertTo24HourFormat(sessionData.endTime)
                      : ""
                  }
                  className="mt-1 p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  defaultValue={sessionData?.location}
                  placeholder="Dhaka, Bangladesh"
                  className="mt-1 p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  required
                />
              </div>
            </div>

            {/* Session Link */}
            <div>
              <label
                htmlFor="sessionLink"
                className="block text-sm font-medium text-gray-700"
              >
                Session Link
              </label>
              <input
                type="url"
                id="sessionLink"
                name="sessionLink"
                defaultValue={sessionData?.sessionLink}
                placeholder="https://example.com"
                className="mt-1 p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <ReactQuill
                className="mt-3 rounded-md text-white"
                formats={formats}
                modules={modulesWithoutImage}
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </div>

            {/* Eligibility Criteria */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Eligibility Criteria
              </label>
              {eligibilityCriteria.map((criterion, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input
                    type="text"
                    value={criterion}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        e.target.value,
                        setEligibilityCriteria
                      )
                    }
                    className="flex-grow p-3 rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                    placeholder="Eligibility criterion"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeField(index, setEligibilityCriteria)}
                      className="ml-2 p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField(setEligibilityCriteria)}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#000030] hover:bg-[#000050] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000030]"
              >
                <FaPlus className="mr-2" /> Update Criterion
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sponsor Logos
              </label>
              <div className="flex flex-wrap gap-2 md:gap-4 mt-2">
                {sponsorLogos?.map((logo, index) => {
                  return (
                    <div
                      key={index}
                      className="relative w-16 h-16 md:w-24 md:h-24"
                    >
                      <img
                        src={logo}
                        alt={`Sponsor Logo ${index}`}
                        className="w-full h-full object-contain rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSponsorLogos(
                            sponsorLogos.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full text-xs"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                })}
                <label
                  htmlFor="sponsor-logo-upload"
                  className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-white/15 hover:bg-white/25 transition"
                >
                  <FaCloudUploadAlt className="text-xl md:text-2xl text-[#000030]" />
                  <input
                    type="file"
                    id="sponsor-logo-upload"
                    accept="image/*"
                    multiple
                    onChange={handleSponsorLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Upload sponsor logos (multiple allowed)
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-right mt-4">
              <button
                type="submit"
                className="px-6 py-3 w-full border hover:border-[#000030] bg-[#000030] text-white rounded-md hover:bg-[#000050] transition-all"
              >
                Update session
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateSession;
