
interface OwnerCrudMenuProps {
    onEditModal: () => void
    onDialogOpen: () => void
}

export function OwnerCrudMenu({ onEditModal, onDialogOpen }: OwnerCrudMenuProps) {

    return (
        <div className="relative">
          
                <div className="crud-buttons absolute right-0 -bottom-18 font-light dark:bg-slate-900 bg-white px-2 w-30 py-2 gap-1 dark:text-white flex flex-col items-center text-base">
                    <button
                        onClick={onEditModal}
                        className="cursor-pointer hover:bg-indigo-200 dark:hover:bg-slate-700 w-full">Edit</button>
                    <button
                        onClick={onDialogOpen}
                        className="cursor-pointer hover:bg-indigo-200 dark:hover:bg-slate-700 w-full">Delete</button>
                </div>

        </div>
    )

}