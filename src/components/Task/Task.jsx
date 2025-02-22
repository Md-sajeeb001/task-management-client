/* eslint-disable react/prop-types */

import "./Task.css";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

export const Task = ({ task, refetch }) => {
  //   console.log(task._id);
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);

  // Open modal and set selected task
  const handleEdit = (task) => {
    setSelectedTask(task);
    document.getElementById("my_modal_5").showModal();
  };

  const handelDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Delete This Task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tasks-delete/${id}`).then((res) => {
          if (res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Request has been Deleted.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

  //   const handleUpdate = (e) => {
  //     e.preventDefault();

  //     axiosSecure
  //       .put(`/tasks-update/${selectedTask._id}`, selectedTask)
  //       .then((res) => {
  //         if (res.data.modifiedCount > 0) {
  //           Swal.fire({
  //             title: "Updated!",
  //             text: "Your task has been updated.",
  //             icon: "success",
  //           });
  //           document.getElementById("my_modal_5").close();
  //           refetch(); // Refresh tasks
  //         }
  //       });
  //   };
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // const taskInfo = {
    //   title: data.title,
    //   des: data.des,
    //   timestamp: Date.now(),
    //   category: data.category,
    //   email: user.email,
    // };

    axiosSecure
      .patch(`/tasks-update/${selectedTask._id}`, selectedTask)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Your task has been updated.",
            icon: "success",
          });
          document.getElementById("my_modal_5").close();
          refetch(); // Refresh tasks
        }
      });
  };

  return (
    <div className="border p-3 rounded-lg flex justify-between items-center mb-2">
      <div>
        <h3 className="text-black font-bold">{task.title}</h3>
        <p className="text-gray-400 text-sm">{task.description}</p>
        <p className="text-gray-500 text-xs">
          {format(new Date(task.timestamp), "yyyy-MM-dd HH:mm:ss")}
        </p>
      </div>
      <div className="space-x-3 items-center">
        <button
          onClick={() => handelDelete(task._id)}
          className="text-red-500 hover:text-red-400"
        >
          <FaTrash />
        </button>
        <button
          onClick={() => handleEdit(task)}
          className="text-green-600 hover:text-green-400 text-lg"
        >
          <MdEditSquare />
        </button>

        {/* modal */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-slate-800 pb-4">
              Update Task
            </h3>

            {/* Update Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  //   value={selectedTask?.title || ""}
                  readOnly
                  placeholder={selectedTask?.title || task.title}
                  value={selectedTask?.title || task.title} // Allow editing the title
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, title: e.target.value })
                  }
                  {...register("title", { required: true })}
                  className="mt-1 text-black py-2 px-4 block w-full rounded-md  shadow-sm focus:border-[#d9af01] focus:ring-[#d9af01]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="des"
                  readOnly
                  placeholder={selectedTask?.des || task.des}
                  value={selectedTask?.des || task.des} // Allow editing the description
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, des: e.target.value })
                  }
                  {...register("des", { required: true })}
                  className="mt-1 text-black py-2 px-4 block w-full rounded-md  shadow-sm focus:border-[#d9af01] focus:ring-[#d9af01]"
                />
              </div>

              {/* Category Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={selectedTask?.category || task.category} // Allow category change
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      category: e.target.value,
                    })
                  }
                  {...register("category", { required: true })}
                  className="mt-1 text-black py-2 px-4 block w-full rounded-md  shadow-sm focus:border-[#d9af01] focus:ring-[#d9af01]"
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn bg-[#d9af01] text-white px-4 py-2 rounded hover:bg-[#c09b01]"
                >
                  Update Task
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_5").close()}
                  className="btn"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};
