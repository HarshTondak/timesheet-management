import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useEffect } from "react";

const SignUp = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleLogin = async (data) => {
    try {
      const res = await registerUser(data).unwrap();

      dispatch(setCredentials(res));
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    user && navigate("/weekly-summary");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col md:flex-row bg-white">
      <div className="w-full md:w-[50%] h-[50vh] md:h-screen p-4 md:p-1 flex flex-col justify-center items-center bg-white">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full flex flex-col gap-y-8 px-10 pt-14 pb-14"
        >
          <div>
            <p className="text-blue-600 text-3xl font-bold">Register</p>
          </div>
          <div className="flex flex-col gap-y-5">
            <Textbox
              placeholder="John Doe"
              type="text"
              name="name"
              label="Full Name"
              className="w-full rounded-xl"
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />

            <Textbox
              placeholder="you@example.com"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded-xl"
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder="password"
              type="password"
              name="password"
              label="Password"
              className="w-full rounded-xl"
              register={register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password ? errors.password.message : ""}
            />

            <Textbox
              placeholder="Your Role (e.g. Developer)"
              type="text"
              name="role"
              label="Role"
              className="w-full rounded-xl"
              register={register("role", {
                required: "Role is required!",
              })}
              error={errors.role ? errors.role.message : ""}
            />

            <Textbox
              placeholder="Title (e.g. Engineer)"
              type="text"
              name="title"
              label="Title"
              className="w-full rounded-xl"
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <span className="text-sm text-gray-600 hover:underline cursor-pointer">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600">
                Log In
              </a>
            </span>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type="submit"
              label="Sign Up"
              className="w-full h-10 bg-blue-700 text-white rounded-xl"
            />
          )}
        </form>
      </div>

      <div className="md:h-screen w-full h-[50vh] md:w-[50%] flex flex-col items-center justify-center bg-[#1C64F2]">
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-white">
            TickTock
          </p>
          <p className="flex flex-col gap-0 md:gap-4 text-lg text-center text-white font-thin w-[90%]">
            Introducing TickTock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employees work hours. With
            ticktock you can effortlessly track and monitor employee attendance
            and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>

          <div className="cell">
            <div className="circle rotate-in-up-left"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
