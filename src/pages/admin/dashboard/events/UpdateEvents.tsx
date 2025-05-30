/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  useGetSingleEventQuery,
  useUpdateEventMutation,
} from "../../../../redux/features/event/eventApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IEvent, TResponse } from "../../../../types";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa6";
import Loading from "../../../../components/ui/Loading";
import ReactQuill from "react-quill";
import { formats, modulesWithoutImage } from "../../../../shared";

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

const UpdateEvents = ({ onClose, id }: { onClose: () => void; id: string }) => {
  const [updateEvent] = useUpdateEventMutation();
  const [sponsorLogos, setSponsorLogos] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const router = useNavigate();
  const {
    data: getSingleEventInfo,
    isLoading,
    isFetching,
  } = useGetSingleEventQuery(id, {
    skip: !id,
  });

  const eventData = getSingleEventInfo?.data as IEvent;
  const [eligibilityCriteria, setEligibilityCriteria] = useState<string[]>([
    "",
  ]);

  const [images, setImages] = useState(eventData?.images);

  useEffect(() => {
    if (eventData) {
      setEligibilityCriteria(eventData.eligibilityCriteria || []);
      setImages(eventData.images || []);
      setSponsorLogos(eventData?.sponsorLogos || []);
      setValue(eventData.description || "");
    }
  }, [eventData]);


  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
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
      eventData: {
        title,
        instructorName,
        images,
        status,
        date,
        description,
        sponsorLogos,
        location,
        startTime,
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

      router("/admin/dashboard/events");
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto shadow-md rounded-lg p-4 md:p-6 space-y-4 md:space-y-6"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Update New Event
          </h2>

          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <div className="flex-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="This is a new Event"
                  defaultValue={eventData?.title}
                  name="title"
                  className="mt-1 p-2 md:p-3 block w-full rounded-md shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
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
                  placeholder="himel vai"
                  defaultValue={eventData?.instructorName}
                  name="instructorName"
                  className="mt-1 p-2 md:p-3 block w-full rounded-md shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Images
              </label>
              <div className="flex flex-wrap gap-2 md:gap-4">
                {images?.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-16 h-16 md:w-24 md:h-24"
                  >
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
                      className="absolute top-0 right-0 p-0.5 md:p-1 bg-red-500 text-white rounded-full text-xs md:text-base"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-white/15 hover:bg-white/25 transition"
                >
                  <FaCloudUploadAlt className="text-xl md:text-2xl text-[#000030]" />
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

            <select
              id="status"
              name="status"
              defaultValue={eventData?.status}
              className="mt-1 p-2 md:p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
              required
            >
              <option className="text-black" value="upcoming">
                Upcoming
              </option>
              <option className="text-black" value="past">
                Past Activities
              </option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
                  defaultValue={eventData?.date}
                  name="date"
                  className="mt-1 p-2 md:p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
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
                  defaultValue={
                    eventData?.startTime
                      ? convertTo24HourFormat(eventData.startTime)
                      : ""
                  }
                  name="startTime"
                  className="mt-1 p-2 md:p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <div className="flex-1">
                <label
                  htmlFor="end-time"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Time
                </label>
                <input
                  type="time"
                  defaultValue={
                    eventData?.endTime
                      ? convertTo24HourFormat(eventData.endTime)
                      : ""
                  }
                  id="end-time"
                  name="endTime"
                  className="mt-1 p-2 md:p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
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
                  defaultValue={eventData?.location}
                  placeholder="Dhaka, Bangladesh"
                  name="location"
                  className="mt-1 p-2 md:p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  required
                />
              </div>
            </div>

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
                defaultValue={eventData?.description}
                onChange={setValue}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Eligibility Criteria
              </label>
              {eligibilityCriteria?.map((criterion, index) => (
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
                    className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-[#000030] p-2 md:p-3 focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                    placeholder="Eligibility criterion"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeField(index, setEligibilityCriteria)}
                      className="ml-2 p-1 md:p-2 text-red-500 hover:text-red-700"
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
                <FaPlus className="mr-2" /> Add Criterion
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sponsor Logos
              </label>
              <div className="flex flex-wrap gap-2 md:gap-4 mt-2">
                {sponsorLogos?.map((logo, index) => (
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
                ))}
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

            <div className="text-right mt-3 md:mt-4">
              <button
                type="submit"
                className="px-4 py-2 md:px-6 md:py-3 w-full border hover:border-[#000030] bg-[#000030] text-white rounded-md hover:bg-[#000050] transition-all"
              >
                Update Event
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateEvents;
