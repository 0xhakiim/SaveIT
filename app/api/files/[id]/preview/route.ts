import { prisma as db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { buildStorageKey, minio } from "@/lib/minio";
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const userId = (await getCurrentUser())?.id || "";
    const url = new URL(req.url);
    const fileId = (await params).id;

    if (!fileId) {
        return Response.json(
            { error: "File ID is required" },
            { status: 400 }
        );
    }

    const fileRecord = await db.file.findUnique({
        where: { id: fileId, userId: userId },
    });
    if (!fileRecord) {
        return Response.json(
            { error: "File not found" },
            { status: 404 }
        );
    }
    if (fileRecord.mimeType.startsWith("image/")) {
        const storageKey = fileRecord.storageKey;
        const url = await minio.presignedGetObject(
            "drive",
            storageKey,
            60 * 60 // 1 hour
        );
        return Response.redirect(url);
    }
    if (fileRecord.mimeType.startsWith("video/")) {
        const storageKey = fileRecord.storageKey;
        const url = await minio.presignedGetObject(
            "drive",
            storageKey,
            60 * 60 // 1 hour
        );
        return Response.redirect(url);
    }
    if (fileRecord.mimeType.startsWith("application/pdf")) {
        const storageKey = fileRecord.storageKey;
        const url = await minio.presignedGetObject(
            "drive",
            storageKey,
            60 * 60 // 1 hour
        );
        return Response.redirect(url);
    }
    return Response.json(
        { error: "Unsupported file type" },
        { status: 415 }
    );
}