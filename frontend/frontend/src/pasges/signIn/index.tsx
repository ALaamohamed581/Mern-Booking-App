import { useForm } from "react-hook-form";
import { signInData } from "../../types";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../apis/api-clients";
import { UseAppContext } from "../../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const location = useLocation();
  const { showToast } = UseAppContext(); //قثبهسثTODO
  const navigate = useNavigate();
  const quertClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInData>();

  const mutation = useMutation(
    (formData: signInData) => apiClient.SignIn(formData),
    {
      onSuccess: async () => {
        await quertClient.invalidateQueries("validteToken");
        showToast({ message: "welcome Back", type: "SUCCESS" });
        navigate(location.state?.from.pathname || "/");
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );
  const onsubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onsubmit}>
      <h2 className="text-3xl font-bold ">Sing In</h2>
      <div className="flex flex-col  text-2xl  w-full ">
        <label
          htmlFor="email"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          {" "}
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-slate-300 border rounded w-full py-1 px-2 font-normal "
          {...register("email", { required: "this field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col  text-2xl  w-full ">
        <label htmlFor="email" className="text-gray-700 text-sm font-bold">
          {" "}
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-slate-300  border rounded py-1 px-2 font-normal"
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 chartes",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <span>
        <span className="text-sm">
          not Regstired?{" "}
          <Link className="underline" to="/register">
            {" "}
            Create a account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white  p-2 font-bold hover:bg-blue-500  text-end"
        >
          SignIn
        </button>
      </span>
    </form>
  );
};

export default SignIn;
