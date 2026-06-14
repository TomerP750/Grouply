import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { UserDTO } from "../../../../../shared/models/UserDto";
import { useUser } from "../../../../../shared/store/hooks";
import { userColumns } from "./UsersColumns";
import { DataTable } from "../../ui/DataTable";




const handleEdit = (id: number) => {

}

const handleDelete = (id: number) => {

}

export function UsersTable() {
  

  const user = useUser();
  const navigate = useNavigate();

  
  // useEffect(() => {
  //   if (user?.role !== Role.ADMIN) navigate("/not-found");
    
  // }, [user?.role]);

  
  return (
    <div className="w-full p-4 dark:text-white">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Users</h2>
      </div>

      {/* <DataTable<UserDTO>
          
      /> */}
    </div>
  );
}
