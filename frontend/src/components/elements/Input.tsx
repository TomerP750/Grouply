
interface InputProps {
    label?: string
}

export function Input({ label }: InputProps) {
    return (
        <div className="flex flex-col gap-2 text-white">
            <label htmlFor="">{label}</label>
            <input type="text" className="border-b border-white" />
        </div>
    )
}