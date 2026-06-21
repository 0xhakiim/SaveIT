'use server'
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma as db } from "@/lib/db";
export const signup = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
        data: {
            email,
            name: username,
            password: hashedPassword,
        },
    });
    redirect("/login");
}