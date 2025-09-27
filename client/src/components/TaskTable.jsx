import { useState } from "react";
import { toast } from "sonner";
import { useDeleteTaskMutation } from "../redux/slices/api/taskApiSlice.js";
import { formatDate } from "../utils/index.js";

import { Button, ConfirmatioDialog } from "./index";
import { AddTask } from "./tasks/index.js";
import { Link } from "react-router-dom";

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [deleteTask] = useDeleteTaskMutation();

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClickHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteTask({
        id: selected,
      }).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300 dark:border-gray-600">
      <tr className="w-full text-black dark:text-white  text-left">
        <th className="px-4 py-2 whitespace-nowrap">Project Name</th>
        <th className="px-4 py-2 whitespace-nowrap">Type of Work</th>
        <th className="px-4 py-2 whitespace-nowrap">Created On</th>
        <th className="px-4 py-2 whitespace-nowrap">Time Taken</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="px-4 py-2 whitespace-nowrap">
        <Link to={`/task/${task._id}`}>
          <div className="flex items-center gap-2">
            <p className="w-full line-clamp-2 text-base text-black">
              {task?.projectName}
            </p>
          </div>
        </Link>
      </td>

      <td className="px-4 py-2 whitespace-nowrap">
        <div className={"flex gap-1 items-center"}>
          <span className="capitalize">{task?.typeOfWork}</span>
        </div>
      </td>

      <td className="px-4 py-2 whitespace-nowrap">
        <span className="text-sm text-gray-600">
          {formatDate(new Date(task?.taskDate))}
        </span>
      </td>

      <td className="px-4 py-2 whitespace-nowrap">
        <span className="text-sm text-gray-600">{task?.timeTaken} hrs</span>
      </td>

      <td className="px-4 py-2 flex gap-2 md:gap-4 justify-end">
        <Button
          className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
          label="Edit"
          type="button"
          onClick={() => editClickHandler(task)}
        />

        <Button
          className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
          label="Delete"
          type="button"
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
    </>
  );
};

export default Table;
