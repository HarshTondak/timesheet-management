import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { Button, Loading, Table, Title } from "../components";
import { AddTask } from "../components/tasks";
import { useGetTasksByDateRangeQuery } from "../redux/slices/api/taskApiSlice";
import { useSelector } from "react-redux";
import { formatDate } from "../utils";

const TasksByDate = () => {
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const { data, isLoading, refetch } = useGetTasksByDateRangeQuery({
    start,
    end,
  });

  useEffect(() => {
    refetch();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [open, refetch]);

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title
          title={`Tasks [${formatDate(new Date(start))} - ${formatDate(
            new Date(end)
          )}]`}
        />
        <Button
          label="Create Task"
          icon={<IoMdAdd className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          onClick={() => setOpen(true)}
        />
      </div>
      <div>
        {data?.dateWiseTasks?.length === 0 ? (
          <div className="py-4 text-center text-gray-500">
            No tasks for this week.
          </div>
        ) : (
          data?.dateWiseTasks?.map(({ date, tasks }) => (
            <div key={date} className="mb-6">
              <Table tasks={tasks} />
            </div>
          ))
        )}
      </div>
      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default TasksByDate;
