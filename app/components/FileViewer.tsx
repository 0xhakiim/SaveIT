//app/components/FileViewer.tsx
import { useEffect, useState } from "react";
import type { User, Folder, File, Session } from "@/app/generated/prisma";
import { IconClose, IconDownload, IconTrash, IconSpinner, fileGlyph } from "./Icons";

export default function FileViewer({
    file,
    onClose,
    onDelete,
}: {
    file: File;
    onClose?: () => void;
    onDelete?: (file: File) => void;
}) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    if (!file) {
        return <div>No file selected</div>;
    }
    useEffect(() => {
        async function load() {
            const res = await fetch(`/api/files/${file.id}/preview`);
            const blob = await res.blob();
            setUrl(URL.createObjectURL(blob));
        }

        load();

        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [file.id]);

    async function handleDelete() {
        if (!onDelete) return;
        setDeleting(true);
        await onDelete(file);
        setDeleting(false);
    }

    const { Icon } = fileGlyph(file.mimeType);

    function renderBody() {
        if (!url) {
            return (
                <div className="flex flex-1 items-center justify-center py-16 text-gray-400">
                    <IconSpinner className="w-6 h-6" />
                </div>
            );
        }

        if (file.mimeType.startsWith("image/")) {
            return <img src={url} alt={file.name} className="max-h-[70vh] w-auto mx-auto rounded-lg" />;
        }

        if (file.mimeType === "application/pdf") {
            return <iframe src={url} className="w-full h-[70vh] rounded-lg border" style={{ borderColor: "var(--card-border)" }} />;
        }

        if (file.mimeType.startsWith("video/")) {
            return <video src={url} controls className="max-h-[70vh] w-full rounded-lg" />;
        }

        return (
            <div className="flex flex-col items-center gap-3 py-16 text-gray-500">
                <Icon className="w-10 h-10" />
                <p>Preview isn&apos;t available for this file type.</p>
            </div>
        );
    }

    return (
        <div
            className="drive-modal-enter relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between gap-3 border-b px-5 py-3.5" style={{ borderColor: "var(--card-border)" }}>
                <div className="flex min-w-0 items-center gap-2.5">
                    <Icon className="w-4.5 h-4.5 shrink-0 text-gray-400" />
                    <h3 className="truncate text-sm font-semibold">{file.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                    {url && (
                        <a
                            href={url}
                            download={file.name}
                            aria-label="Download file"
                            title="Download"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <IconDownload />
                        </a>
                    )}
                    {onDelete && (
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            aria-label="Delete file"
                            title="Delete"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-500/10"
                        >
                            {deleting ? <IconSpinner className="w-4 h-4" /> : <IconTrash />}
                        </button>
                    )}
                    {onClose && (
                        <button
                            onClick={onClose}
                            aria-label="Close preview"
                            title="Close"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <IconClose />
                        </button>
                    )}
                </div>
            </div>
            <div className="drive-scroll flex-1 overflow-auto p-6">{renderBody()}</div>
        </div>
    );
}