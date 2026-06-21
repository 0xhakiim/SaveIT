import { randomUUID } from "crypto";

export function buildStorageKey(params: {
    userId: string;
    folderId: string | null;
    originalName: string;
}) {
    const ext = params.originalName.split(".").pop();
    const safeExt = ext ? `.${ext}` : "";

    const id = randomUUID();

    const folderPath = params.folderId ?? "root";

    return `${params.userId}/${folderPath}/${id}${safeExt}`;
}