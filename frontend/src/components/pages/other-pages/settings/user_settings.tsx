import { useForm } from "react-hook-form";
import { useUser } from "../../../../redux/hooks";
import { useEffect } from "react";
import type { UpdateUserDTO } from "../../../../dtos/models_dtos/request_dto/update_user_dto";
import userService from "../../../../service/UserService";
import { toast } from "react-toastify";

export function UserSettings() {

    const user = useUser();

    useEffect(() => {
        setValue("firstName", user.firstName)
        setValue("lastName", user.lastName)
        setValue("username", user.username)
        setValue("email", user.email)
    }, []); 

    const { register, handleSubmit, formState: {errors}, setValue } = useForm<UpdateUserDTO>();

    const updateUser = (data: UpdateUserDTO) => {
        userService.updateUser(data)
        .then(() => {
            toast.success("Settings Updated Successfully!");
        })
        .catch(err => {
            toast.error(err.response.data);
        })
    };

  return (
    <div className="text-white pb-10">
      {/* Nav */}
      <nav className="h-20 border-b border-gray-500/60 flex justify-start items-center gap-6 px-8 text-sm font-medium text-white">
        <span>User</span>
        <span>Notifications</span>
      </nav>

      {/* Inputs */}
      <form onSubmit={handleSubmit(updateUser)} className="mt-20 flex flex-col md:flex-row items-center md:items-start px-6 gap-10 overflow-y-auto">
        {/* header */}
        <div className="space-y-2">
          <p className="font-semibold text-lg">Personal Information</p>
          <p className="text-gray-400">Settings for update user information</p>
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col items-start gap-8 px-5 text-white">
          
          {/* avatar upload */}
          <div className="flex items-start gap-8">

            <div className="w-30 aspect-square rounded-lg bg-white" />
            <button className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg">
              Change Avatar
            </button>

          </div>

          {/* Inputs section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
            <div className="flex flex-col gap-1.5">
              <label>First Name</label>
              <input
                {...register("firstName")}
          
                type="text"
                className="w-full border border-gray-500/50 bg-gray-800 py-1"
             
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Last Name</label>
              <input
                {...register("lastName")}
                type="text"
                className="w-full border border-gray-500/50 bg-gray-800 py-1"
              />
            </div>

            <div className="flex flex-col gap-1.5 col-span-1 lg:col-span-2">
              <label>Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full border border-gray-500/50 bg-gray-800 py-1"
              />
            </div>

            <div className="flex flex-col gap-1.5 col-span-1 lg:col-span-2">
              <label>Username</label>
              <input
                {...register("username")}
                type="text"
                className="w-full border border-gray-500/50 bg-gray-800 py-1"
              />
            </div>
          </div>

          <button className="cursor-pointer rounded-lg hover:bg-teal-500 bg-teal-600 px-4 py-2">
            Save
          </button>
        </div>

      </form>

    </div>
  );
}
