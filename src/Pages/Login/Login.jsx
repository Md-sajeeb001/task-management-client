import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import LodingSpinner from "../../Shared/Loading/LodingSpinner";
import toast from "react-hot-toast";

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
        if (result) {
          reset();
          navigate("/dashboard");
          toast.success(`User Registration Successfully!`);
        }
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        // console.log("user sing in with google", res);
        if (res) {
          navigate("/dashboard");
          toast.success(`User Registration Successfully!`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <LodingSpinner></LodingSpinner>;
  }

  return (
    <div className="flex items-center justify-center pt-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-[#d9af01] mb-6">
          LogIn Now
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-[#d9af01] text-white py-2 rounded-lg mb-3 hover:[#d9af01]"
          >
            <Link className="flex items-center gap-3">
              <FcGoogle></FcGoogle>Continue with Google
            </Link>
          </button>

          <div className="my-4 border-t border-gray-300"></div>

          <input
            type="email"
            placeholder="Enter your email..."
            required
            {...register("fullName", {
              required: "Full name is required",
            })}
            className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#d9af01]"
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
            className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#d9af01]"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600 text-xs">Password is required</p>
          )}

          <button className="w-full bg-[#d9af01] text-white py-2 rounded-lg hover:[#d9af01]">
            <Link>Login Now</Link>
          </button>

          <div className="text-center mt-3">
            <Link className="text-[#d9af01] hover:underline">
              Forgot your password?
            </Link>
          </div>

          <p className="text-center text-gray-600 text-sm mt-4">
            By continuing with Google, or Email, you agree to our{" "}
            <Link className="text-[#d9af01] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="text-[#d9af01] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <p className="text-center mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#d9af01] hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
