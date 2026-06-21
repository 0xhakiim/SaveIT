// actions.ts
'use server'

import bcrypt from "bcryptjs";
import { prisma as db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const DUMMY_HASH = "$2a$10$Nxw7Kae9gUepK6qJ1qEthe.k2l.O3g8vL1Kdfi3Zz5I9Yh3aG4e22";

// Define a type for your action's return state
export type FormState = {
    error?: string;
    success?: boolean;
} | null;

// 1. Add prevState as the first argument
export const login = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await db.user.findUnique({
        where: { email },
    });

    const hashToCompare = user ? user.password : DUMMY_HASH;
    const isPasswordValid = await bcrypt.compare(password, hashToCompare);

    if (!user || !isPasswordValid) {
        // 2. Return an object matching FormState instead of throwing
        return { error: "Invalid email or password" };
    }

    // Handle your successful login logic here (e.g., creating a session)
    const session = await db.session.create({
        data: {
            userId: user.id,
            expiresAt: new Date(
                Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
            ),
        },
    });

    const cookieStore = await cookies();

    cookieStore.set("session", session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: session.expiresAt,
        path: "/",
    });
    redirect("/");

}