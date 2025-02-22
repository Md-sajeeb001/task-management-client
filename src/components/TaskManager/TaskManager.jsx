/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import {
//   DndContext,
//   KeyboardSensor,
//   PointerSensor,
//   closestCorners,
//   useDraggable,
//   useDroppable,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { FaTrash } from "react-icons/fa";
// import { MdEdit, MdEditSquare } from "react-icons/md";
// import { format } from "date-fns";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// // import { io } from "socket.io-client";
// import Colum from "../Colum/Colum";
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
// } from "@dnd-kit/sortable";
// import useAuth from "../../Hooks/useAuth";

// // const socket = io("http://localhost:9000"); // Adjust for your backend URL

// const TaskManager = () => {
//   const [tasks, setTasks] = useState([]);
//   //   const [newTask, setNewTask] = useState("");
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   // Fetch tasks from the database using useEffect
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const { data } = await axiosSecure.get(`/tasks/${user?.email}`);
//         console.log(data);
//         setTasks(data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };
//     fetchTasks();

//     // Listen for real-time updates from WebSockets
//     // socket.on("taskUpdated", (updatedTasks) => {
//     //   setTasks(updatedTasks);
//     // });
//   }, [axiosSecure, user.email]);

//   // Delete a task
//   const deleteTask = async (id) => {
//     try {
//       await axiosSecure.delete(`/tasks/${id}`);
//       //   socket.emit("taskChange"); // Notify the server
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Handle Drag and Drop
//   const handleDragEnd = async (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     try {
//       await axiosSecure.patch(`/tasks/${active.id}`, {
//         category: over.id,
//       });
//       //   socket.emit("taskChange"); // Notify server about change
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   return (
//     <div className="w-full p-6 text-slate-300">
//       <h1 className="text-3xl font-bold text-black sm:pb-8 pb-5">
//         Manage Tasks
//       </h1>
//       {!tasks && <p>No Todo Added</p>}
//       <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
//         <div className="sm:flex gap-3 rounded-lg  w-full">
//           {["To-Do", "In Progress", "Done"].map((category) => (
//             <TaskCategory
//               sensors={sensors}
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

// const TaskCategory = ({ id, tasks, deleteTask }) => {
//   const { setNodeRef } = useDroppable({ id });
//   return (
//     <div ref={setNodeRef} className="border w-full p-4 rounded-lg">
//       <h2 className="text-lg font-bold text-slate-800 mb-3">{id}</h2>
//       {tasks
//         .filter((task) => task.category === id)
//         .map((task) => (
//           <Task key={task.id} task={task} deleteTask={deleteTask} />
//         ))}
//     </div>
//   );
// };

// const Task = ({ task, deleteTask }) => {
//   const { attributes, listeners, setNodeRef } = useDraggable({ id: task._id });
//   // console.log(task)

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       className="border  p-3 rounded-lg flex justify-between items-center mb-2 cursor-grab"
//     >
//       <div>
//         <h3 className="text-black font-bold">{task.title}</h3>
//         <p className="text-gray-400 text-sm">{task.description}</p>
//         <p className="text-gray-500 text-xs">
//           {format(new Date(task.timestamp), "yyyy-MM-dd HH:mm:ss")}
//         </p>
//       </div>
//       <div className="space-x-3 items-center">
//         <button
//           onClick={() => deleteTask(task.id)}
//           className="text-red-500 hover:text-red-400"
//         >
//           <FaTrash />
//         </button>
//         {/* Open the modal using document.getElementById('ID').showModal() method */}
//         <button
//           className=""
//           onClick={() => document.getElementById("my_modal_5").showModal()}
//         >
//           <MdEditSquare className="text-green-600  hover:text-green-400 text-lg"></MdEditSquare>
//         </button>
//         {/* update modal */}
//         <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
//           <div className="modal-box">
//             <form
//               //   onSubmit={handleSubmit(onSubmit)}
//               className=" p-4 mb-4"
//             >
//               <div className="mb-4">
//                 <label
//                   htmlFor="title"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   id="title"
//                   placeholder="add some title..."
//                   maxLength={50}
//                   className="mt-1 py-2 px-4 block w-full rounded-md focus:outline-none shadow-sm focus:border-[#d9af01] focus:ring-[#d9af01]"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="description"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   placeholder="add some description...."
//                   maxLength={200}
//                   className="mt-1 py-2 px-4 block w-full rounded-md focus:outline-none shadow-sm focus:border-[#d9af01] focus:ring-[#d9af01]"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="category"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   className="mt-1 py-2 px-4 block w-full rounded-md focus:outline-none shadow-sm focus:border-[#d9af01] focus:ring-[#d9af01]"
//                 >
//                   <option value="To-Do">To-Do</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Done">Done</option>
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 className="bg-[#d9af01] text-white px-4 py-2 rounded hover:bg-[#c09b01] focus:outline-none focus:ring-2 focus:ring-[#d9af01] focus:ring-opacity-50"
//               >
//                 Update Task
//               </button>
//             </form>
//             <div className="modal-action">
//               <form method="dialog">
//                 {/* if there is a button in form, it will close the modal */}
//                 <button className="btn bg-[#d9af01] text-white">Close</button>
//               </form>
//             </div>
//           </div>
//         </dialog>
//       </div>
//     </div>
//   );
// };

// export default TaskManager;

import { useMutation, useQuery } from "@tanstack/react-query";
// import {
//   DndContext,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   closestCorners,
// } from "@dnd-kit/core";
// import { format } from "date-fns";
// import { FaTrash } from "react-icons/fa";
// import { MdEditSquare } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Task } from "../Task/Task";
import TaskCategory from "../TaskCategory/TaskCategory";

const TaskManager = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //   const queryClient = useQueryClient();

  // Fetch tasks using TanStack Query
  const {
    data: tasks = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
  });

  // Drag-and-Drop Mutation
  //   const updateTaskCategoryMutation = useMutation({
  //     mutationFn: async ({ taskId, category }) => {
  //       await axiosSecure.patch(`/tasks/${taskId}`, { category });
  //     },
  //     onMutate: async ({ taskId, category }) => {
  //       await queryClient.cancelQueries(["tasks", user?.email]);
  //       const previousTasks = queryClient.getQueryData(["tasks", user?.email]);

  //       queryClient.setQueryData(["tasks", user?.email], (old) =>
  //         old.map((task) => (task._id === taskId ? { ...task, category } : task))
  //       );

  //       return { previousTasks };
  //     },
  //     onError: (err, variables, context) => {
  //       queryClient.setQueryData(["tasks", user?.email], context.previousTasks);
  //     },
  //     onSettled: () => {
  //       queryClient.invalidateQueries(["tasks", user?.email]);
  //     },
  //   });

  //   // Handle Drag & Drop
  //   const handleDragEnd = (event) => {
  //     const { active, over } = event;
  //     if (!over) return;

  //     updateTaskCategoryMutation.mutate({ taskId: active.id, category: over.id });
  //   };

  //   const sensors = useSensors(useSensor(PointerSensor));

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks: {error.message}</p>;

  // Delete Task Mutation

  return (
    <div className="w-full p-6 text-slate-300">
      <h1 className="text-3xl font-bold text-black sm:pb-8 pb-5">
        Manage Tasks
      </h1>
      <div
      // collisionDetection={closestCorners}
      // onDragEnd={handleDragEnd}
      // sensors={sensors}
      >
        <div className="sm:flex gap-3 rounded-lg w-full">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <TaskCategory
              key={category}
              id={category}
              tasks={tasks}
              refetch={refetch}
              //   deleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// const TaskCategory = ({ id, tasks, refetch, deleteTask }) => {
//   return (
//     <div className="border w-full p-4 rounded-lg">
//       <h2 className="text-lg font-bold text-slate-800 mb-3">{id}</h2>
//       {tasks
//         .filter((task) => task.category === id)
//         .map((task) => (
//           <Task
//             key={task._id}
//             task={task}
//             refetch={refetch}
//             deleteTask={deleteTask}
//           />
//         ))}
//     </div>
//   );
// };

// const Task = ({ task, deleteTask }) => {
//   return (
//     <div className="border p-3 rounded-lg flex justify-between items-center mb-2">
//       <div>
//         <h3 className="text-black font-bold">{task.title}</h3>
//         <p className="text-gray-400 text-sm">{task.description}</p>
//         <p className="text-gray-500 text-xs">
//           {format(new Date(task.timestamp), "yyyy-MM-dd HH:mm:ss")}
//         </p>
//       </div>
//       <div className="space-x-3 items-center">
//         <button
//           onClick={() => deleteTaskMutation.mutate(task._id)}
//           className="text-red-500 hover:text-red-400"
//         >
//           <FaTrash />
//         </button>
//         <button className="text-green-600 hover:text-green-400 text-lg">
//           <MdEditSquare />
//         </button>
//       </div>
//     </div>
//   );
// };

export default TaskManager;
