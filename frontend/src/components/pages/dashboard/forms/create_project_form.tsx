import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { ProjectStatus } from "../../../../dtos/enums/ProjectStatus";
import { type CreateProjectDTO } from "../../../../dtos/models_dtos/request_dto/create_project_dto";
import { TechnologyDTO } from "../../../../dtos/models_dtos/technology_dto";
import technologyService from "../../../../service/technology_service";
import { toast } from "react-toastify";
import { TechSelectChips } from "./tech_select_chip";
import projectService from "../../../../service/project_service";
import { toNormal } from "../../../../util/util_functions";


const inputBase =
    "w-full rounded-lg px-3 py-2 text-sm outline-none transition border " +
    "bg-slate-800 text-white border-slate-700 " +
    "focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500";
  const labelBase = "text-sm font-medium text-gray-200 select-none";
  const errorText = "text-xs text-rose-400 mt-1";


interface CreateProjectFormProps {
  onClose: () => void
}

export function CreateProjectForm({ onClose }: CreateProjectFormProps) {

    const [technologies, setTechnologies] = useState<TechnologyDTO[]>([]);

    useEffect(() => {
        
        technologyService.allTechnologies()
        .then(res => {
            setTechnologies(res);
        })
        .catch(err => {
            toast.error(err.response.data)
        })
        
    }, []);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, control } = useForm<CreateProjectDTO>();
    
    const sendData = (data: CreateProjectDTO) => {
        
        projectService.createProject(data)
        .then(() => {
          toast.success("Project Created");
          onClose();
        })
        .catch(err => {
          toast.error(err.response.data);
        })
    
    };

    return (
    <form className="w-full" onSubmit={handleSubmit(sendData)}>
      <h1 className="text-xl font-semibold mb-4">Create Project</h1>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5">
          {/* Name */}
          <section className="w-full flex flex-col gap-1">
            <label className={labelBase} htmlFor="name">
              Name of the project <span className="text-rose-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Grouply"
              className={`${inputBase} ${
                errors.name ? "border-rose-500 focus:ring-rose-400" : ""
              }`}
              aria-invalid={!!errors.name}
              {...register("name", {
                required: "Project name is required",
                minLength: { value: 3, message: "Min 3 characters" },
                maxLength: { value: 60, message: "Max 60 characters" },
              })}
            />
            {errors.name && <p className={errorText}>{errors.name.message}</p>}
          </section>

          {/* Status */}
          <section className="w-full flex flex-col gap-1">
            <label className={labelBase} htmlFor="status">
              Status <span className="text-rose-400">*</span>
            </label>
            <select
              className={`${inputBase} appearance-none ${
                errors.status ? "border-rose-500 focus:ring-rose-400" : ""
              }`}
              aria-invalid={!!errors.status}
              {...register("status", {
                required: "Status is required",
                validate: (v) => (v ? true : "Please choose a status"),
              })}
            >
              <option value="">Select Status</option>
              {Object.values(ProjectStatus).map((s) => (
                <option key={s} value={s} className="bg-slate-800">
                  {toNormal(s)}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className={errorText}>{errors.status.message as string}</p>
            )}
          </section>

        </div>


        {/* Technologies Chip */}
      <div className="mt-6">
        <Controller
          name="technologies" 
          control={control}
          rules={{
            validate: (arr) => (arr && (arr as TechnologyDTO[]).length > 0) || "Add at least one technology",
          }}
          render={({ field }) => (
            <TechSelectChips
              technologies={technologies}
              value={(field.value as TechnologyDTO[]) ?? []}
              onChange={field.onChange}
              max={12}
            />
          )}
        />
        {errors.technologies && (
          <p className="text-xs text-rose-400 mt-1">
            {errors.technologies.message}
          </p>
        )}
      </div>

        

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => reset()}
            className="cursor-pointer px-4 py-2 rounded-md text-sm bg-slate-800 text-slate-200 hover:bg-slate-700 transition disabled:opacity-60"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="cursor-pointer disabled:cursor-not-allowed  px-4 py-2 rounded-md text-sm bg-teal-600 text-white hover:bg-teal-700 transition disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? <BiLoaderAlt size={20} className="animate-spin"/> : "Create Project"}
          </button>
        </div>
      </div>
    </form>
  );
}