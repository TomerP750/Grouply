import { useForm } from "react-hook-form"
import { Input } from "../../elements/Input";


export function SignUp() {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const handleRegister = () => {

    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <Input label="Email"/>
                <Input label="Password"/>
            </form>
        </div>
    )
}