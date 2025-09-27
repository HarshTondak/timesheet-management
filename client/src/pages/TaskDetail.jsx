import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components";
import { useGetSingleTaskQuery } from "../redux/slices/api/taskApiSlice";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleTaskQuery(id);

  const task = data?.task || [];

  if (isLoading)
    <div className="py-10">
      <Loading />
    </div>;

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      {/* task detail */}
      <MdKeyboardArrowLeft
        className="text-2xl font-bold"
        onClick={() => {
          navigate("/tasks");
        }}
      />
      <h1 className="text-2xl text-gray-600 font-bold">{task?.projectName}</h1>
      <div className="w-full flex flex-col md:flex-row gap-2 bg-white shadow rounded-md px-8 py-8 overflow-y-auto">
        <div className="w-full space-y-8">
          {task?.description && (
            <div className="mb-2">
              <p className="text-lg font-semibold">TASK DESCRIPTION</p>
              <div className="w-full">{task?.description}</div>
            </div>
          )}
          <div className="w-full flex justify-between items-center">
            <p className="text-gray-500">Type of Work: {task.typeOfWork}</p>
            <p className="text-gray-500">
              Created At: {new Date(task?.taskDate).toDateString()}
            </p>
          </div>

          {task?.links?.length > 0 && (
            <div className="">
              <p className="text-lg font-semibold">SUPPORT LINKS</p>
              <div className="w-full flex flex-col gap-4">
                {task?.links?.map((el, index) => (
                  <a
                    key={index}
                    href={el}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {el}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
