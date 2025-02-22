import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

export default function AddTaskForm() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const taskInfo = {
      title: data.title,
      des: data.description,
      timestamp: Date.now(),
      category: "To-Do",
      email: user.email,
    };

    axiosSecure
      .post("/tasks", taskInfo)
      .then((res) => {
        console.log(res);
        reset();
        toast.success(`Task added Successfully!`);
        navigate("/dashboard/manage-tasks");
      })
      .catch((err) => [console.log(err)]);
  };

  return (
    <div className="w-full h-full">
      {/* <h1></h1> */}
      <h1 className="sm:text-4xl text-xl font-bold mb-8">
        Welcome {user.displayName}
      </h1>
      <p className="text-justify pb-8">
        The Add Task form allows users to efficiently create new tasks within
        the system. Users can enter key task details such as title, description,
        date it will be set Automatically. This form ensures that tasks are
        well-defined, categorized, and assigned to the right individuals for
        seamless workflow management.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow p-4 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="add some title..."
            {...register("title", { required: true })}
            maxLength={50}
            className="mt-1 py-2 px-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d9af01] focus:ring-[#d9af01]"
          />
          {errors.title && (
            <span className="text-red-600">Title is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="add some description...."
            {...register("description", { required: true })}
            maxLength={200}
            className="mt-1 py-2 px-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d9af01] focus:ring-[#d9af01]"
          />
          {errors.description && (
            <span className="text-red-600">description is required</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#d9af01] disabled text-white px-4 py-2 rounded hover:bg-[#c09b01] focus:outline-none focus:ring-2 focus:ring-[#d9af01] focus:ring-opacity-50"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
