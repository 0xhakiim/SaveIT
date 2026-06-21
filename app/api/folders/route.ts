import { prisma as db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
export async function POST(req: Request) {
    const body = await req.json();
    const folderName = body.folderName;

    if (!folderName) {
        return Response.json(
            { error: "Folder name is required" },
            { status: 400 }
        );
    }
    await db.folder.create({
        data: {
            name: folderName,
            userId: (await getCurrentUser())?.id || null,
            parentId: body.parentId || null,
        },
    });
    if (!folderName) {
        return Response.json(
            { error: "Failed to create folder" },
            { status: 500 }
        );
    }
    console.log("Folder created successfully:", folderName);
    return Response.json({ success: true });

}
export async function GET(req: Request) {

    const folder = await db.folder.findMany({
        where: {

            parentId: req.url.includes("folderId=") ? new URL(req.url).searchParams.get("folderId")
                : null,
        },
    });
    return Response.json({
        success: true,
        folder: folder || [],
    });
}