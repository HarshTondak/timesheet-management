import { useEffect } from "react";
import { Loading, Title, WeeklyTable } from "../components";
import { useGetWeeklySummaryQuery } from "../redux/slices/api/taskApiSlice";

const WeeklySummary = () => {
  const { data, isLoading, refetch } = useGetWeeklySummaryQuery();

  useEffect(() => {
    refetch();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [refetch]);

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={"Weekly Summary"} />
      </div>

      <div>
        <WeeklyTable weeks={data?.weeks} />
      </div>
    </div>
  );
};

export default WeeklySummary;
