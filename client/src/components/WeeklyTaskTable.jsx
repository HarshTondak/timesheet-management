import { useNavigate } from "react-router-dom";
import { Button } from "./index";
import { formatDate } from "../utils";

const WeeklyTable = ({ weeks }) => {
  const navigate = useNavigate();

  const viewHandler = (week) => {
    navigate(`/tasks-by-date?start=${week.weekStart}&end=${week.weekEnd}`);
  };

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300 dark:border-gray-600">
      <tr className="w-full text-black dark:text-white text-left">
        <th className="px-4 py-2 whitespace-nowrap">Duration</th>
        <th className="px-4 py-2 whitespace-nowrap">Status</th>
        <th className="px-4 py-2 whitespace-nowrap">Time Logged</th>
        <th className="px-4 py-2 whitespace-nowrap"></th>
      </tr>
    </thead>
  );

  const TableRow = ({ week }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="px-4 py-2 whitespace-nowrap">
        <p className="w-full text-base text-black">
          {formatDate(new Date(week?.weekStart))} -{" "}
          {formatDate(new Date(week?.weekEnd))}
        </p>
      </td>
      <td className="px-4 py-2 whitespace-nowrap">
        <span
          className={`ml-2 px-2 py-1 rounded text-xs
            ${week.status === "missing" ? "bg-red-100 text-red-800" : ""}
            ${
              week.status === "incomplete"
                ? "bg-yellow-100 text-yellow-800"
                : ""
            }
            ${week.status === "completed" ? "bg-green-100 text-green-800" : ""}
          `}
        >
          {week.status.toUpperCase()}
        </span>
      </td>
      <td className="px-4 py-2 whitespace-nowrap">
        <span className="text-sm text-gray-600">{week?.totalHours} hrs</span>
      </td>
      <td className="px-4 py-2 whitespace-nowrap flex justify-end">
        <Button
          className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
          label="View"
          type="button"
          onClick={() => viewHandler(week)}
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
              {weeks.map((week, index) => (
                <TableRow key={week._id || index} week={week} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WeeklyTable;
