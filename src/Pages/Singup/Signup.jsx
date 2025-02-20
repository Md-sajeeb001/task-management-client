import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
// import useAxiosPublic from "../../Shared/useAxiosPublic";
// import LodingSpinner from "../../Shared/Loading/LodingSpinner";

const Signup = () => {
  const { createUser, loading, signInWithGoogle, user, updateUserProfile } =
    useAuth();
  //   const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, data.photoURL)
          .then((result) => {
            if (result) {
              toast.success(`Users Registration Successfully!`);
            }
            reset();
            navigate("/");
            // create user entry in the database
            // const userInfo = {
            //   name: data.name,
            //   email: data.email,
            // };
            // axiosPublic.post("/users", userInfo).then((res) => {
            //   if (res.data.insertedId) {
            //     console.log("user added to the database");
            //     reset();
            //     navigate("/");
            //   }
            // });
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        if (res) {
          toast.success(`${user?.displayName} Registration Successfully!`);
        }
        navigate("/");

        // console.log("user sing in with google", res);
        // console.log(res.user);
        // const googleInfo = {
        //   name: res.user.displayName,
        //   email: res.user.email,
        //   photoUrl: res.user.photoURL,
        //   affiliated: false,
        //   role: "employee",
        // };
        // axiosSecure
        //   .post("/employee", googleInfo)
        //   .then((res) => {
        //     if (res.data?.insertedId) {
        // navigate("/dashboard/home");
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   if (loading) {
  //     return <LodingSpinner></LodingSpinner>;
  //   }

  return (
    // <div className="my-10">
    //   <h2 className="lg:text-4xl md:text-3xl text-2xl text-center font-bold  underline">
    //     LogIn
    //   </h2>

    //   <div className=" mt-8 flex-shrink-0 w-full max-w-2xl mx-auto p-4 rounded-md shadow-2xl bg-base-100">
    //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Email</span>
    //         </label>
    //         <input
    //           type="email"
    //           {...register("email", { required: true })}
    //           name="email"
    //           placeholder="email"
    //           className="input input-bordered w-full focus:outline-[#115071] py-2 px-3 pr-4 text-sm/6"
    //         />
    //         {errors.email && (
    //           <span className="text-red-600">Email is required</span>
    //         )}
    //       </div>

    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Password</span>
    //         </label>
    //         <input
    //           type="password"
    //           name="password"
    //           {...register("password", {
    //             required: true,
    //             minLength: 6,
    //             maxLength: 20,
    //             pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
    //           })}
    //           placeholder="password"
    //           className="input input-bordered w-full focus:outline-[#115071] py-2 px-3 pr-4 text-sm/6"
    //         />
    //         {errors.password?.type === "required" && (
    //           <p className="text-red-600">Password is required</p>
    //         )}
    //         {errors.password?.type === "minLength" && (
    //           <p className="text-red-600">Password must be 6 characters</p>
    //         )}
    //         {errors.password?.type === "maxLength" && (
    //           <p className="text-red-600">
    //             Password must be less than 20 characters
    //           </p>
    //         )}
    //         {errors.password?.type === "pattern" && (
    //           <p className="text-red-600">
    //             Password must have one Uppercase one lower case, one number and
    //             one special character.
    //           </p>
    //         )}
    //       </div>

    //       <div className="form-control mt-6">
    //         <button className="bg-[#115071] hover:bg-[#115071] text-white p-3 rounded-lg">
    //           Sign in
    //         </button>
    //       </div>
    //       <div className="divider">or</div>
    //     </form>
    //     <div>
    //       <button
    //         onClick={handleGoogleLogin}
    //         className="bg-[#115071] hover:bg-[#115071] w-full text-white p-3 rounded-lg flex items-center justify-center mt-3 gap-2"
    //       >
    //         Sing With Google
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md ">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Register Now
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg mb-3 hover:bg-blue-700"
          >
            <FcGoogle></FcGoogle>Continue with Google
          </button>

          <div className="my-4 border-t border-gray-300"></div>

          <input
            type="name"
            placeholder="Enter your Name..."
            required
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-600 text-xs">Name is required</p>
          )}

          <input
            type="email"
            placeholder="Enter your email..."
            required
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600 text-xs">Email is required</p>
          )}

          <input
            type="password"
            placeholder="Enter your password..."
            required
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600 text-xs">Password is required</p>
          )}

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Register Now
          </button>

          <p className="text-center text-gray-600 text-sm mt-4">
            By continuing with Google, or Email, you agree to our{" "}
            <Link href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <p className="text-center mt-3">
            Already signed up?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Go to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
