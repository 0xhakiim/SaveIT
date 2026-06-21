import { signup } from "./actions";

const Signup = () => {
    return (
        <form action={signup} className="flex flex-col gap-4 align-center justify-center items-center h-screen w-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-col gap-4 align-center justify-center items-center h-full w-1/2 ">
                <input type="email" name="email" className="flex flex-col w-full rounded-full pt-2 pb-2 bg-white dark:bg-gray-800" placeholder="email" required />
                <input type="text" name="username" className="flex flex-col w-full rounded-full bg-white dark:bg-gray-800" placeholder="username" required />
                <input type="password" name="password" className="flex flex-col w-full rounded-full bg-white dark:bg-gray-800" placeholder="password" required />

                <button type="submit" className="flex flex-col w-full rounded-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600">
                    Signup
                </button>
            </div>
        </form>
    )
}
export default Signup
