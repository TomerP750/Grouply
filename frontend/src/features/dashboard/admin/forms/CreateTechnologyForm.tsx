import { useForm } from "react-hook-form"

const inputBase =
  "w-full rounded-lg px-3 py-2 text-sm outline-none transition border " +
  "dark:bg-slate-800 bg-indigo-300 border-slate-700 " +
  "focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500";
const labelBase = "text-sm font-medium dark:text-white select-none";
const errorText = "text-xs text-rose-400 mt-1";

type CreateTechnologyDTO = {
    name: string
    slug: string
    color: string
}

interface CreateProjectFormProps {
    onClose: () => void;
}

export function CreateTechnologyForm({ onClose }: CreateProjectFormProps) {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateTechnologyDTO>();

    const sendData = (data: CreateTechnologyDTO) => {

    }

    return (
        <form className="w-full" onSubmit={handleSubmit(sendData)}>

            <section className="grid gric-cols-1">

                <div className="flex flex-col">

                    <label htmlFor="" className={labelBase}>Name</label>
                    <input type="text" {...register("name")} className={inputBase}/>

                </div>


                <div className="flex flex-col">

                    <label htmlFor="" className={labelBase}>Slug</label>
                    <input type="text" {...register("name")} className={inputBase}/>
                </div>


                <div className="flex flex-col">

                    <label htmlFor="" className={labelBase}>Color (Must be hexcode)</label>
                    <input type="text" {...register("name")} className={inputBase}/>
                </div>


            </section>

            <button>Create</button>



        </form>
    )
}