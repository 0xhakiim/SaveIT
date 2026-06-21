'use client'

import { useActionState } from "react";
import { login, FormState } from "./actions"; // Import the type and action

const Login = () => {
    // 1. Pass 'login' and an initial state (null) into the hook
    // 'formAction' is the enhanced action wrapper that TypeScript expects
    const [state, formAction, isPending] = useActionState<FormState, FormData>(login, null);

    return (

        < form action={formAction} className="flex min-h-screen flex-col gap-4 items-center justify-center " >

            {state?.error && (
                <div className="text-red-500">{state.error}</div>
            )}


            <input type="email" name="email" required className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 " />
            <input type="password" name="password" required className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 dark:bg-amber-50" />

            <button type="submit" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
            </button>
        </form >
    );
};

export default Login;