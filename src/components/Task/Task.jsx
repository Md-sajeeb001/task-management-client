/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Task.css";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa";

export const Task = ({  task }) => {
  console.log(task);
    const { category, timestamp, des, title, id } = task;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task border p-4 rounded-lg"
    >
      {/* {task.map(() => ( */}
        <div key={id} className="data-item  mb-4">
          <div>
            <h3 className="text-black font-bold">{title}</h3>
            <p className="text-gray-400 text-sm">{category}</p>
            <p className="text-gray-500 text-xs">
              {format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss")}
            </p>
          </div>
          <button
            // onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-400"
          >
            <FaTrash />
          </button>
        </div>
      {/* ))} */}
    </div>
  );
};
