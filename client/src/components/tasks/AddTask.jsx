import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/slices/api/taskApiSlice";
import { dateFormatter } from "../../utils";
import Button from "../Button";
import Loading from "../Loading";
import ModalWrapper from "../ModalWrapper";
import SelectList from "../SelectList";
import Textbox from "../Textbox";

const TYPE_OF_WORK = [
  "Bug Fix",
  "Feature",
  "Documentation",
  "Testing",
  "Deployment",
  "Other",
];

const AddTask = ({ open, setOpen, task }) => {
  const defaultValues = {
    projectName: task?.projectName || "",
    typeOfWork: task?.typeOfWork || TYPE_OF_WORK[0],
    description: task?.description || "",
    taskDate: task?.taskDate
      ? dateFormatter(task.taskDate)
      : dateFormatter(new Date()),
    timeTaken: task?.timeTaken || "",
    links: task?.links ? task.links.join(", ") : "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [typeOfWork, setTypeOfWork] = useState(defaultValues.typeOfWork);
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const handleOnSubmit = async (data) => {
    try {
      const linksArray = data.links
        ? data.links
            .split(",")
            .map((link) => link.trim())
            .filter(Boolean)
        : [];

      const newData = {
        ...data,
        typeOfWork,
        links: linksArray,
        timeTaken: Number(data.timeTaken),
      };

      console.log(data, newData);
      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      toast.success(res.message);

      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <div className="flex gap-4 flex-col sm:flex-row">
            <Textbox
              placeholder="Project Name"
              label="Project Name *"
              type="text"
              register={register("projectName", {
                required: "Project Name is required!",
              })}
              error={errors?.projectName?.message}
            />
            <SelectList
              label="Type of Work *"
              lists={TYPE_OF_WORK}
              selected={typeOfWork}
              setSelected={setTypeOfWork}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex w-full">
              <Textbox
                placeholder="Task Date"
                label="Task Date *"
                type="date"
                register={register("taskDate", {
                  required: "Task date is required!",
                })}
                error={errors.taskDate?.message}
              />
            </div>
            <Textbox
              placeholder="in hours"
              label="Time Taken *"
              type="number"
              register={register("timeTaken", {
                required: "Time taken is required!",
                min: 0,
              })}
              error={errors.timeTaken?.message}
            />
          </div>

          <div className="w-full">
            <p>Task Description</p>
            <textarea
              name="description"
              {...register("description")}
              className="w-full h-32 bg-transparent px-3 py-1.5 2xl:py-3 border border-gray-300 rounded-md
            dark:border-gray-600 placeholder-gray-300 dark:placeholder-gray-700
            text-gray-900 dark:text-white outline-none text-base focus:ring-2
            ring-blue-300"
            ></textarea>
          </div>

          <div className="w-full">
            <p>
              Add Links{" "}
              <span className="text- text-gray-600">(separated by commas)</span>
            </p>
            <textarea
              name="links"
              {...register("links")}
              className="w-full bg-transparent px-3 py-1.5 2xl:py-3 border border-gray-300 rounded-md
            dark:border-gray-600 placeholder-gray-300 dark:placeholder-gray-700
            text-gray-900 dark:text-white outline-none text-base focus:ring-2
            ring-blue-300"
            ></textarea>
          </div>
        </div>

        {isLoading || isUpdating ? (
          <div className="py-4">
            <Loading />
          </div>
        ) : (
          <div className="my-4 flex justify-between items-center">
            <Button
              label="Submit"
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
            />

            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
