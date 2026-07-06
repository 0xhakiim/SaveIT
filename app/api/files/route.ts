import { prisma as db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { buildStorageKey, minio } from "@/lib/minio";

import { Readable } from "stream";
export async function POST(req: Request) {
    const formData = await req.formData();
    const userId = (await getCurrentUser())?.id || "";
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
    const folderId =
        (formData.get("folderId") as string) || null;
    // Upload to MinIO here
    // Save metadata to Postgres here
    const storagekey = buildStorageKey({
        userId,
        folderId: folderId,
        originalName: file.name,
    });

    try {
        const fileRecord = await db.file.create({
            data: {
                name: file.name,
                size: file.size,
                mimeType: file.type,
                userId: userId,
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
        await minio.putObject(
            "drive",
            storagekey,
            Readable.from(file.stream()),
            file.size,
            {
                "Content-Type": file.type,
                "Original-Name": file.name,
            }
        )

        return Response.json({ success: true });
    } catch (error) {
        console.error("Error uploading file:", error);
        return Response.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
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