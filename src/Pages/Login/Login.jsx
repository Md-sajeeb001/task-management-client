import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import LodingSpinner from "../../Shared/LodingSpinner";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";
// import LodingSpinner from "../../Shared/Loading/LodingSpinner";

const Signup = () => {
  const { signIn, loading, signInWithGoogle } = useAuth();
  //   const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        reset();
        navigate("/");
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log("user sing in with google", res);
        navigate("/");
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
        //       navigate("/dashboard/home");
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          LogIn Now
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
            type="email"
            placeholder="Enter your email..."
            required
            {...register("fullName", {
              required: "Full name is required",
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
            Login Now
          </button>

          <div className="text-center mt-3">
            <Link className="text-blue-500 hover:underline">
              Forgot your password?
            </Link>
          </div>

          <p className="text-center text-gray-600 text-sm mt-4">
            By continuing with Google, or Email, you agree to our{" "}
            <Link className="text-blue-500 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <p className="text-center mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
