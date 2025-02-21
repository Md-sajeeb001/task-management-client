// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import {
//   DndContext,
//   closestCorners,
//   useDraggable,
//   useDroppable,
// } from "@dnd-kit/core";
// // import axios from "axios";
// import { FaPlus, FaTrash } from "react-icons/fa";
// import { format } from "date-fns";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

// const TaskManager = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");
//   const axiosSecure = useAxiosSecure();

//   // Fetch tasks from the database using useEffect
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const { data } = await axiosSecure.get("/tasks");
//         setTasks(data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };
//     fetchTasks();
//   }, [axiosSecure]);

//   // Add a new task
//   const addTask = async () => {
//     if (!newTask.trim()) return;
//     const newTaskObj = {
//       title: newTask,
//       description: "New Task",
//       category: "To-Do",
//       timestamp: Date.now(),
//     };
//     try {
//       const { data } = await axiosSecure.post("/tasks", newTaskObj);
//       setTasks([...tasks, data]); // Update UI after adding
//       setNewTask("");
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   // Delete a task
//   const deleteTask = async (id) => {
//     try {
//       await axiosSecure.delete(`${id}`);
//       setTasks(tasks.filter((task) => task.id !== id)); // Update UI after deleting
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Handle Drag and Drop
//   const handleDragEnd = async (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     const updatedTasks = tasks.map((task) =>
//       task.id === active.id ? { ...task, category: over.id } : task
//     );

//     setTasks(updatedTasks);

//     try {
//       await axiosSecure.patch(`${active.id}`, {
//         category: over.id,
//       });
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-6 text-white">
//       <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>

//       {/* Task Input */}
//       <div className="bg-gray-800 w-full max-w-lg mt-6 p-3 rounded-lg flex items-center gap-3">
//         <FaPlus className="text-yellow-500" />
//         <input
//           type="text"
//           placeholder="Add a task"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           className="bg-transparent outline-none text-gray-300 flex-grow"
//         />
//         <button
//           onClick={addTask}
//           className="text-yellow-500 hover:text-yellow-400"
//         >
//           ➡
//         </button>
//       </div>

//       {/* Drag and Drop Context */}
//       <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
//         <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-4xl">
//           {["To-Do", "In Progress", "Done"].map((category) => (
//             <TaskCategory
//               key={category}
//               id={category}
//               tasks={tasks}
//               deleteTask={deleteTask}
//             />
//           ))}
//         </div>
//       </DndContext>
//     </div>
//   );
// };

// // Task Category Component
// const TaskCategory = ({ id, tasks, deleteTask }) => {
//   const { setNodeRef } = useDroppable({ id });
//   return (
//     <div ref={setNodeRef} className="bg-gray-800 p-4 rounded-lg">
//       <h2 className="text-lg font-bold text-yellow-500 mb-3">{id}</h2>
//       {tasks
//         .filter((task) => task.category === id)
//         .map((task) => (
//           <Task key={task.id} task={task} deleteTask={deleteTask} />
//         ))}
//     </div>
//   );
// };

// // Task Component
// const Task = ({ task, deleteTask }) => {
//   const { attributes, listeners, setNodeRef } = useDraggable({ id: task.id });

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       className="bg-gray-700 p-3 rounded-lg flex justify-between items-center mb-2 cursor-grab"
//     >
//       <div>
//         <h3 className="text-white font-bold">{task.title}</h3>
//         <p className="text-gray-400 text-sm">{task.description}</p>
//         <p className="text-gray-500 text-xs">
//           {format(task.timestamp, "yyyy-MM-dd HH:mm:ss")}
//         </p>
//       </div>
//       <button
//         onClick={() => deleteTask(task.id)}
//         className="text-red-500 hover:text-red-400"
//       >
//         <FaTrash />
//       </button>
//     </div>
//   );
// };

// export default TaskManager;

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { FaPlus, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust for your backend URL

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
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

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      title: newTask,
      description: "New Task",
      category: "To-Do",
      timestamp: Date.now(),
    };
    try {
      const { data } = await axiosSecure.post("/tasks", newTaskObj);
      console.log(data)
      socket.emit("taskChange"); // Notify the server to broadcast changes
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

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

  return (
    <div className="flex flex-col items-center p-6 text-white">
      <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
      <div className="bg-gray-800 w-full max-w-lg mt-6 p-3 rounded-lg flex items-center gap-3">
        <FaPlus className="text-yellow-500" />
        <input
          type="text"
          placeholder="Add a task"
          name="newTask"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="bg-transparent outline-none text-gray-300 flex-grow"
        />
        <button
          onClick={addTask}
          className="text-yellow-500 hover:text-yellow-400"
        >
          ➡
        </button>
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-4xl">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <TaskCategory
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
    <div ref={setNodeRef} className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-bold text-yellow-500 mb-3">{id}</h2>
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
      className="bg-gray-700 p-3 rounded-lg flex justify-between items-center mb-2 cursor-grab"
    >
      <div>
        <h3 className="text-white font-bold">{task.title}</h3>
        <p className="text-gray-400 text-sm">{task.description}</p>
        <p className="text-gray-500 text-xs">
          {format(task.timestamp, "yyyy-MM-dd HH:mm:ss")}
        </p>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-400"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default TaskManager;
