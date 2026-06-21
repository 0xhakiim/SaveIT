import { prisma as db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { buildStorageKey } from "@/lib/minio";
export async function POST(req: Request) {
    const formData = await req.formData();

    const file = formData.get("file") as File | null

        ;

    if (!file) {
        return Response.json(
            { error: "No file uploaded" },
            { status: 400 }
        );
    }

    console.log(file.name);
    console.log(file.size);
    console.log(file.type);

    // Upload to MinIO here
    // Save metadata to Postgres here
    const storagekey = buildStorageKey({
        userId: (await getCurrentUser())?.id || "",
        folderId: formData.get("folderId") as string | null,
        originalName: file.name,
    });
    let folderId: string | null = null;
    if (formData.get("folderId") as string == "") {
        folderId = null;
    } else {
        folderId = formData.get("folderId") as string;
    }
    const fileRecord = await db.file.create({
        data: {
            name: file.name,
            size: file.size,
            mimeType: file.type,
            userId: (await getCurrentUser())?.id || null,
            folderId: folderId,
            storageKey: storagekey,
        },
    });
    if (!fileRecord) {
        return Response.json(
            { error: "Failed to save file metadata" },
            { status: 500 }
        );
    }
    return Response.json({ success: true });
}
export async function GET(req: Request) {

    const file = await db.file.findMany({
        where: {

            folderId: req.url.includes("folderId=") ? new URL(req.url).searchParams.get("folderId")
                : null,
        },
    });

    return Response.json({
        success: true,
        files: file.map(f => ({ ...f, size: Number(f.size) })) || [],
    });
}