import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterButton } from "../components/ui/FilterButton";
import { ProfileCard } from "../components/ui/ProfileCard";
import AnimeCardModal from "../components/modal/PersonDetailsModal";
import { ICommittee, IExecutives } from "../types";
import Loading from "../components/ui/Loading";
import NotAvailableMessage from "../components/ui/NotAvailableMessage";
import { useGetAllExecutivesQuery } from "../redux/features/executives/executivesApi";
import { useGetAllCommitteesQuery } from "../redux/features/committee/committeeApi";

export default function Committee() {
  const { data: getAllCommitteeInfo, isLoading: isCommitteeLoading, isFetching } =
    useGetAllCommitteesQuery(undefined);

  const getAllCommitteeData = getAllCommitteeInfo?.data as ICommittee[];
  const [activeType, setActiveType] = useState("executive");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: getAllExecutiveInfo, isFetching: isExecutiveFetching } = useGetAllExecutivesQuery({
    session: activeType === "advisor" ? undefined : activeYear,
    roleType: activeType,
  });

  const getAllExecutiveData = getAllExecutiveInfo?.data as IExecutives[];

  useEffect(() => {
    if (getAllCommitteeData) {
      setActiveYear(getAllCommitteeData[0]?.year || "");
    }
  }, [getAllCommitteeData]);

  useEffect(() => {
    const role = searchParams.get("roleType") || "executive";
    const session = searchParams.get("session") || activeYear;
    setActiveType(role);
    setActiveYear(session || "");
  }, [searchParams, activeYear]);

  const handleOpen = (_id: string) => {
    setSelectedId(_id);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const updateSearchParams = (type: string, year?: string) => {
    setActiveType(type);
    setActiveYear(year || "");

    if (type === "advisor") {
      setSearchParams({ roleType: type });
    } else {
      setSearchParams({ roleType: type, session: year || "" });
    }
  };

  useEffect(() => {
    if (getAllCommitteeData && !searchParams.get("roleType")) {
      setSearchParams({
        roleType: "executive",
        session: getAllCommitteeData[0]?.year || "",
      });
    }
  }, [getAllCommitteeData, searchParams, setSearchParams]);

  return (
    <>
      <div className="pt-24 md:pt-36 min-h-screen py-10 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {activeType === "executive" ? `Executives` : `Advisor`}
                <div className="h-1 w-16 md:w-20 bg-blue-500 mt-1 md:mt-2 rounded-full" />
              </h1>
            </div>

            {/* Role Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <FilterButton
                active={activeType === "executive"}
                onClick={() => updateSearchParams("executive", activeYear)}
                className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
              >
                Executives
              </FilterButton>
              <FilterButton
                active={activeType === "advisor"}
                onClick={() => updateSearchParams("advisor")}
                className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
              >
                Advisor
              </FilterButton>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-6 whitespace-nowrap md:whitespace-normal">
            {/* Year Filter - Horizontal scroll on mobile */}
            {activeType === "executive" && (
              <div className="md:hidden flex gap-2 overflow-x-auto pb-2">
                {getAllCommitteeData?.map((session) => (
                  <FilterButton
                    key={session?._id}
                    active={activeYear === session?.year}
                    onClick={() =>
                      updateSearchParams(activeType, session?.year || "")
                    }
                    className="whitespace-nowrap px-3 py-1.5 text-xs"
                  >
                    {session?.year}
                  </FilterButton>
                ))}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/* Year Filter - Vertical on desktop */}
              {activeType === "executive" && (
                <div className="hidden md:block md:w-40 lg:w-48 space-y-2 self-start sticky top-32">
                  {getAllCommitteeData?.map((session) => (
                    <FilterButton
                      key={session?._id}
                      active={activeYear === session?.year}
                      onClick={() =>
                        updateSearchParams(activeType, session?.year || "")
                      }
                      className="w-full text-left"
                    >
                      {session?.year}
                    </FilterButton>
                  ))}
                </div>
              )}

              {/* Profile Cards Grid */}
              <div className="flex-1">
                {isFetching || isCommitteeLoading || isExecutiveFetching ? (
                  <Loading />
                ) : getAllExecutiveData?.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {getAllExecutiveData?.map((executive) => (
                      <ProfileCard
                        handleOpen={() => handleOpen(executive?._id)}
                        key={executive?._id}
                        executive={executive}
                      />
                    ))}
                  </div>
                ) : (
                  <NotAvailableMessage message="No executives available." />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimeCardModal
        isOpen={isOpen}
        onClose={handleClose}
        executiveId={selectedId}
      />
    </>
  );
}
