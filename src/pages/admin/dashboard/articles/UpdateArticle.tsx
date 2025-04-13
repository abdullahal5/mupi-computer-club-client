/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IArticle, TResponse } from "../../../../types";
import {
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
} from "../../../../redux/features/article/articleApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/ui/Loading";

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: function () {
        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
          const file = input?.files?.[0];

          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const quill = (this as any).quill;
              const range = quill.getSelection();
              if (range) {
                quill.insertEmbed(range.index, "image", reader.result);
              }
            };
            reader.readAsDataURL(file);
          }
        };
      },
    },
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const UpdateArticle = ({
  onClose,
  id,
}: {
  onClose: () => void;
  id: string;
}) => {
  const [value, setValue] = useState("");
  const [updateArticle] = useUpdateArticleMutation();
  const router = useNavigate();

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
        setImages(imageUrl);
        toast.success("Image uploaded successfully!", { id: loadingToast });
      } else {
        toast.error("Image upload failed!", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Error uploading image!", { id: loadingToast });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Loading");

    const target = e.target as any;

    const title = target.title.value;
    const authorName = target.authorName.value;
    const bio = target.bio.value;

    const res = (await updateArticle({
      id: id,
      updateData: {
        title,
        authorName,
        thumbnailImage: image,
        bio,
        content: value,
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

      router("/admin/dashboard/articles");
    }
  };

  const {
    data: getSingleArticleInfo,
    isLoading,
    isFetching,
  } = useGetSingleArticleQuery(id, {
    skip: !id,
  });

  const articleData = getSingleArticleInfo?.data as IArticle;

  const [image, setImages] = useState<string>();

  useEffect(() => {
    if (articleData) {
      setImages(articleData.thumbnailImage || "");
      setValue(articleData.content);
    }
  }, [articleData]);
  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto border-white/20 rounded-lg p-4 sm:p-6 space-y-6"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Update Article</h2>

          <div className="space-y-4">
            {/* Title & Author */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-200"
                >
                  Article Title
                </label>
                <input
                  type="text"
                  id="title"
                  defaultValue={articleData?.title}
                  placeholder="Title of the article"
                  name="title"
                  className="mt-1 p-3 block w-full rounded-md bg-white/15 focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 text-white placeholder:text-white/50"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-200"
                >
                  Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  defaultValue={articleData?.authorName}
                  placeholder="John Doe"
                  name="authorName"
                  className="mt-1 p-3 block w-full rounded-md bg-white/15 focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 text-white placeholder:text-white/50"
                  required
                />
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-200 pb-1">
                Thumbnail Image
              </label>
              <div className="flex items-center gap-4 h-28 sm:h-32 md:h-40 lg:h-48">
                {/* Upload Box */}
                <div className="flex flex-wrap gap-4 h-full">
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-28 h-28 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-white/15 hover:bg-white/25 transition"
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

                {/* Image Preview */}
                <div className="border flex-1 h-full rounded-md overflow-hidden flex items-center justify-center bg-white/5">
                  {image ? (
                    <img
                      className="w-full h-full object-cover transition-all duration-300"
                      src={image}
                      alt="Thumbnail"
                    />
                  ) : (
                    <h1 className="text-2xl sm:text-3xl font-semibold opacity-30 text-white text-center px-4">
                      Thumbnail Image
                    </h1>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-200"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Tell us more about this article."
                defaultValue={articleData?.bio}
                rows={4}
                className="mt-1 p-3 block w-full rounded-md bg-white/15 border-gray-300 focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 text-white placeholder:text-white/50"
                required
              />
            </div>

            {/* Description (Quill) */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <ReactQuill
                className="mt-3 rounded-md text-white"
                formats={formats}
                modules={modules}
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 text-right">
            <button
              type="submit"
              className="px-6 py-3 w-full sm:w-auto border hover:border-[#000030] bg-[#000030] text-white rounded-md hover:bg-[#000050] transition-all"
            >
              Update Article
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateArticle;
