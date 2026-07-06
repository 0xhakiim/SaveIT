import { randomUUID } from "crypto";
import { Client } from "minio";

export const minio = new Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,

    accessKey: "admin",
    secretKey: "yourStrongPassword123",
});
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