/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetCommitteeByIdQuery, useUpdateCommitteeMutation } from "../../../../redux/features/committee/committeeApi";
import { ICommittee, TResponse } from "../../../../types";
import Loading from "../../../../components/ui/Loading";

const UpdateCommittee = ({
  onClose,
  id,
}: {
  onClose: () => void;
  id: string;
}) => {
  const [UpdateCommittee] = useUpdateCommitteeMutation();
  const router = useNavigate();

  const { data: getSingleCommitteeInfo, isLoading, isFetching } = useGetCommitteeByIdQuery(id, {
    skip: !id,
  });

  const CommitteeData = getSingleCommitteeInfo?.data as ICommittee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

        const toastId = toast.loading("Loading");


    const target = e.target as any;

    const year = target.session.value;

    const regex = /^(\d{4})-(\d{4})$/;
    const match = year.match(regex);

    if (!match) {
      toast.error("Please enter a valid session in the format YYYY-YYYY.", {
        id: toastId,
      });
      return;
    }

    const start = parseInt(match[1]);
    const end = parseInt(match[2]);

    if (end - start !== 1) {
      toast.error("The year difference must be exactly one.", {
        id: toastId,
      });
      return;
    }

    const res = (await UpdateCommittee({
      id: id,
      updateData: year,
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

      router("/admin/dashboard/committee");
    }
  };
  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto rounded-lg p-6 space-y-6"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Update Committee
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 items-center lg:flex-row md:flex-row flex-col">
              <div className="flex-1">
                <label
                  htmlFor="article"
                  className="block text-sm font-medium text-gray-700"
                >
                  Session <span className="italic">(eg: 2023-2024)</span>
                </label>
                <input
                  type="text"
                  id="session"
                  placeholder="year of the session"
                  defaultValue={CommitteeData?.year}
                  name="session"
                  className="mt-1 p-3 block w-full rounded-md focus:border-[#000030] focus:ring focus:ring-[#000030] focus:ring-opacity-50 bg-white/15"
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-right mt-4">
            <button
              type="submit"
              className="px-6 py-3 w-full border hover:border-[#000030] bg-[#000030] text-white rounded-md hover:bg-[#000050] transition-all"
            >
              Update Session
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateCommittee;
