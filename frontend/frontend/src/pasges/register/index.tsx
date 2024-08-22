import { useForm } from "react-hook-form";
import { regsiterFormData } from "../../types";
import * as apiClient from "../../apis/api-clients";
import { useMutation, useQueryClient } from "react-query";
import { UseAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const { showToast } = UseAppContext(); //قثبهسثTODO
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<regsiterFormData>();
  const quertClient = useQueryClient();

  const mutation = useMutation(
    (formData: regsiterFormData) => apiClient.register(formData),
    {
      onSuccess: async () => {
        await quertClient.invalidateQueries("validteToken");
        showToast({ message: "Regsitation success", type: "SUCCESS" });
        navigate("/");
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  const onSubmit = handleSubmit((data: regsiterFormData) => {
    mutation.mutate(data);
  });
  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className=" text-3xl md:text-start text-center py-1">
          Create an Account
        </h2>
        <div className="flex flex-col md:flex-row gap-5  ">
          <label
            htmlFor="frist"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            {" "}
            First Name
            <input
              type="text"
              id="frist"
              className="bg-slate-300 border rounded w-full py-1 px-2 font-normal "
              {...register("firstName", {
                required: "this field is required",
              })}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </label>
          <label
            htmlFor="frist"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            {" "}
            Last Name
            <input
              type="text"
              id="frist"
              className="bg-slate-300 border rounded w-full py-1 px-2 font-normal "
              {...register("lastName", {
                required: "this field is required",
              })}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </label>
        </div>
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

        <label htmlFor="email" className="text-gray-700 text-sm font-bold">
          {" "}
          Password
        </label>
        <input
          type="password"
          id="email"
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
        <label htmlFor="email" className="text-gray-700 text-sm font-bold">
          {" "}
          COnfirm Password
        </label>
        <input
          type="password"
          id="email"
          className="bg-slate-300  border rounded py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "this field is required";
              } else if (watch("password") !== val) {
                return "your passwords dont match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}

        <span>
          <button
            type="submit"
            className="bg-blue-600 text-white  p-2 my-5 font-bold hover:bg-blue-500  text-start"
          >
            Create Acoount
          </button>
        </span>
      </form>
    </>
  );
};

export default Register;
