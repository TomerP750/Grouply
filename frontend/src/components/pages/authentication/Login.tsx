import { Input } from "../../elements/Input";

export function Login() {
    return (
        <div className="min-h-screen bg-slate-800 flex items-center justify-center">
            <form action="" className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold text-white">Sign in</h1>
                
                <Input label="Email"/>
                <Input label="Password"/>
                

                <button className="bg-indigo-500 hover:bg-indigo-400 rounded-xl cursor-pointer text-white py-1">Login</button>
            </form>
        </div>
    )
}