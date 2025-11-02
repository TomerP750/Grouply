import type { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO";


export function ProfileProjectCard({ project }: { project: ProjectDTO }) {
    
  const { name, createdAt, status, technologies } = project;

  return (
    <div className="w-100 aspect-square border p-5">
        <p>{name}</p>
    </div>
  );
}
