import { Task } from "../Task/Task";

/* eslint-disable react/prop-types */
const TaskCategory = ({ id, tasks, refetch, deleteTask }) => {
  return (
    <div className="border w-full p-4 rounded-lg">
      <h2 className="text-lg font-bold text-slate-800 mb-3">{id}</h2>
      {tasks
        .filter((task) => task.category === id)
        .map((task) => (
          <Task
            key={task._id}
            task={task}
            refetch={refetch}
            deleteTask={deleteTask}
          />
        ))}
    </div>
  );
};
export default TaskCategory;
