import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Loading, Table, Title } from "../components";
import { AddTask } from "../components/tasks";
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import { useSelector } from "react-redux";

const Tasks = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const [searchTerm] = useState(searchParams.get("search") || "");
  const [open, setOpen] = useState(false);

  const status = params?.status || "";

  const { data, isLoading, refetch } = useGetAllTaskQuery({
    search: searchTerm,
  });

  useEffect(() => {
    refetch();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [open]);

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={"Tasks"} />
        <Button
          label="Create Task"
          icon={<IoMdAdd className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          onClick={() => setOpen(true)}
        />
      </div>

      <div>
        {data?.tasks.length === 0 ? (
          <tr>
            <td colSpan={5} className="py-4 text-center text-gray-500">
              No tasks for this week.
            </td>
          </tr>
        ) : (
          <Table tasks={data?.tasks} />
        )}
      </div>
      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
