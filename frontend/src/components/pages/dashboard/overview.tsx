import { useUser } from "../../../redux/hooks"


export function Overview() {

    const user = useUser();

    return (
        <div className="dark:text-white p-5 space-y-5">
            <h1 className="text-5xl font-bold mb-10">Hello, {user.username}</h1>

            <ul className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                <li className="text-center border p-6">
                    <p className="font-bold text-5xl">2</p>
                    <p>Project Participating</p>
                </li>

                <li className="text-center border p-6">
                    <p className="font-bold text-5xl">12</p>
                    <p>Project Participated</p>
                </li>

                <li className="text-center border p-6">
                    <p className="font-bold text-5xl">12</p>
                    <p>Project Participated</p>
                </li>

                <li className="text-center border p-6">
                    <p className="font-bold text-5xl">12</p>
                    <p>Project Participated</p>
                </li>
            </ul>

            <ul className="grid grid-cols-1 lg:grid-cols-4 gap-5 min-h-70">

                <li className="text-center border p-6 col-span-2">
                    <p className="font-bold text-5xl">12</p>
                    <p>Project Participated</p>
                </li>

                <li className="text-center border p-6 col-span-2">
                    <p className="font-bold text-5xl">12</p>
                    <p>Project Participated</p>
                </li>

            </ul>

        </div>
    )
}