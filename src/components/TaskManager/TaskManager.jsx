/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { FaTrash } from "react-icons/fa";
import { MdEdit, MdEditSquare } from "react-icons/md";
import { format } from "date-fns";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { io } from "socket.io-client";
import Colum from "../Colum/Colum";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

const socket = io("http://localhost:9000"); // Adjust for your backend URL

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  //   const [newTask, setNewTask] = useState("");
  const axiosSecure = useAxiosSecure();

  // Fetch tasks from the database using useEffect
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosSecure.get("/tasks");
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();

    // Listen for real-time updates from WebSockets
    socket.on("taskUpdated", (updatedTasks) => {
      setTasks(updatedTasks);
    });
  }, [axiosSecure]);

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axiosSecure.delete(`/tasks/${id}`);
      socket.emit("taskChange"); // Notify the server
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle Drag and Drop
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    try {
      await axiosSecure.patch(`/tasks/${active.id}`, {
        category: over.id,
      });
      socket.emit("taskChange"); // Notify server about change
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="w-full p-6 text-slate-300">
      <h1 className="text-3xl font-bold text-black sm:pb-8 pb-5">
        Manage Tasks
      </h1>
      {!tasks && <p>No Todo Added</p>}
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="sm:flex gap-3 rounded-lg  w-full">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <TaskCategory
              sensors={sensors}
              key={category}
              id={category}
              tasks={tasks}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

const TaskCategory = ({ id, tasks, deleteTask }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="border w-full p-4 rounded-lg">
      <h2 className="text-lg font-bold text-slate-800 mb-3">{id}</h2>
      {tasks
        .filter((task) => task.category === id)
        .map((task) => (
          <Task key={task.id} task={task} deleteTask={deleteTask} />
        ))}
    </div>
  );
};

const Task = ({ task, deleteTask }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="border  p-3 rounded-lg flex justify-between items-center mb-2 cursor-grab"
    >
      <div>
        <h3 className="text-black font-bold">{task.title}</h3>
        <p className="text-gray-400 text-sm">{task.description}</p>
        <p className="text-gray-500 text-xs">
          {format(new Date(task.timestamp), "yyyy-MM-dd HH:mm:ss")}
        </p>
      </div>
      <div className="space-x-3">
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-400"
        >
          <FaTrash />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-pink-500 hover:text-pink-400"
        >
          <MdEdit />
        </button>
      </div>
    </div>
  );
};

export default TaskManager;
