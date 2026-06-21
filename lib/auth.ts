import { cookies } from "next/headers";
import { prisma as db } from "./db";

export async function getSession() {
    const sessionId = (await cookies()).get("session")?.value;

    if (!sessionId) return null;

    return db.session.findUnique({
        where: { id: sessionId },
    });
}
export async function getCurrentUser() {
    const session = await getSession();
    if (!session) return null;
    return db.user.findUnique({
        where: { id: session.userId },
    });
}