import { useForm } from "react-hook-form";
import { useUser } from "../../../../../redux/hooks";
import { useEffect, useState } from "react";
import type { UpdateUserDTO } from "../../../../../dtos/models_dtos/request_dto/update_user_dto";
import userService from "../../../../../service/user_service";
import { toast } from "react-toastify";
import { DeleteAccount } from "./delete_account";


const inputStyle = "rounded-lg border border-gray-500/50 bg-gray-400 dark:bg-gray-800 px-3 py-1";


export function UserSettings() {

  const { register, handleSubmit, formState: { errors }, setValue, getValues, watch, resetField } = useForm<UpdateUserDTO>();

  const user = useUser();
  const [usernameChecked, setUsernameChecked] = useState<boolean>(false);
  const [isTaken, setIsTaken] = useState<boolean>(false);
  const usernameQuery = watch("username", user.username ?? "");
  const [avatarInputOpen, setAvatarInputOpen] = useState<boolean>(false);


  useEffect(() => {
    setValue("firstName", user.firstName)
    setValue("lastName", user.lastName)
    setValue("username", user.username)
    setValue("email", user.email)
    user.avatar && setValue("avatarUrl", user.avatar)
  }, []);



  const updateUser = (data: UpdateUserDTO) => {
    userService.updateUser(data)
      .then(() => {
        toast.success("Settings Updated Successfully!");
      })
      .catch(err => {
        toast.error(err.response.data);
      })
  };

  const checkUsername = () => {

    const trimmedQuery = getValues("username").trim().toLowerCase();

    if (!trimmedQuery) return;

    userService.checkUsernameAvailability(trimmedQuery)
      .then(res => {
        setUsernameChecked(true)
        setIsTaken(res);
      })
      .catch(err => {
        toast.error(err.response.data);
      })
  }

  return (
    <div className="pb-10">
      {/* Nav */}
      <nav className="h-20 border-b border-gray-500/60 flex justify-start items-center gap-6 px-8 text-sm font-medium dark:text-white">
        <span>User</span>
        <span>Notifications</span>
      </nav>

      {/* Inputs */}
      <form onSubmit={handleSubmit(updateUser)} className="mt-20 flex flex-col md:flex-row items-center md:items-start px-6 gap-10 overflow-y-auto text-black dark:text-white">
        {/* header */}
        <div className="space-y-2 dark:text-white">
          <p className="font-semibold text-lg">Personal Information</p>
          <p className="text-gray-400">Settings for update user information</p>
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col items-start gap-8 px-5 dark:text-white">

          {/* avatar upload */}
          <div className="flex items-start gap-8">

            <div className="w-30 aspect-square rounded-lg bg-white" />
            
            <div className="flex flex-col gap-5 items-start">
              {/* <img src={defaultImage} className="w-30 aspect-square rounded-lg bg-white" /> */}
              <button type="button" onClick={() => setAvatarInputOpen(true)} className="text-white cursor-pointer bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg">
                Change Avatar
              </button>

              {avatarInputOpen && <div className="flex gap-4">
                <input
                  {...register("avatarUrl")}
                  type="url"
                  className={`${inputStyle} `}
                />
                <button 
                onClick={() => {
                  setAvatarInputOpen(false);
                  resetField("avatarUrl");
                }}
                className="text-sm cursor-pointer">Cancel</button>
              </div>}

            </div>

          </div>

          {/* Inputs section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-medium ">First Name</label>
              <input
                {...register("firstName")}

                type="text"
                className={`${inputStyle}`}

              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Last Name</label>
              <input
                {...register("lastName")}
                type="text"
                className={`${inputStyle}`}
              />
            </div>

            <div className="flex flex-col gap-1.5 col-span-1 lg:col-span-2">
              <label>Email</label>
              <input
                {...register("email")}
                type="email"
                className={`${inputStyle}`}
              />
            </div>
          </section>

          {/* username input and check*/}
          <section className="flex flex-col gap-1.5 w-full">
            <label>Username</label>

            {/* Input and check */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 w-full">
              <input
                {...register("username")}
                type="text"
                className={`${inputStyle} w-full md:w-1/2`}
              />

              {/* Username check */}
              <div className="flex gap-2">

                <button
                  type="button"
                  disabled={usernameQuery === user.username || !usernameQuery}
                  onClick={checkUsername}
                  className="text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Check Avilability</button>

                <button
                  type="button"
                  disabled={usernameQuery === user.username}
                  onClick={() => {
                    setValue("username", user.username ?? "");
                    setUsernameChecked(false);
                  }} className="text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Reset</button>

              </div>
            </div>

            {usernameChecked && (
              isTaken
                ? <span className="text-red-500">Username Not Available</span>
                : <span className="text-green-500">Username Available</span>
            )}

          </section>

          <button className="text-white cursor-pointer rounded-lg hover:bg-teal-500 bg-teal-600 px-4 py-2">
            Save
          </button>
        </div>

      </form>

      <hr className="border-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-600 my-15 rounded-full" />

      {/* Delete account */}
      <DeleteAccount />

    </div>
  );
}
