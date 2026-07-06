//app/components/home/Layout.tsx
"use client";
import SideBar from "../SideBar";
import NewFolder from "../NewFolder";
import UploadFile from "../UploadFile";
import { useState, useCallback } from "react";
import type { User, Folder, File, Session } from "@/app/generated/prisma";
import FileViewer from "../FileViewer";
import { IconFolder, IconChevronLeft, IconEye, IconDownload, IconTrash, IconSpinner } from "../Icons";
import { fileGlyph } from "../Icons";



export default function Layout({
    initialFiles,
    initialFolders,
}: {
    initialFiles: File[];
    initialFolders: Folder[];
}) {
    const [uploadOpen, setUploadOpen] = useState(false);
    const [newFolderOpen, setNewFolderOpen] = useState(false);

    const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
    const [folderStack, setFolderStack] = useState<{ id: string; name: string }[]>([]);

    const [files, setFiles] = useState<File[]>(initialFiles);
    const [folders, setFolders] = useState<Folder[]>(initialFolders);
    const emptyFile = { id: "", name: "", size: 0 as unknown as bigint, mimeType: "", userId: "", folderId: null, storageKey: "" } as File;
    // Re-fetch contents whenever we navigate into a folder
    const loadFolder = useCallback(async (folderId: string | null) => {
        const params = new URLSearchParams();
        if (folderId) params.set("folderId", folderId);
        console.log("Loading folder with params:", params.toString());
        const [foldersRes, filesRes] = await Promise.all([
            fetch(`/api/folders?${params}`),
            fetch(`/api/files?${params}`),
        ]);

        if (!foldersRes.ok || !filesRes.ok) {
            console.error("Failed to load folder contents");
            return;
        }
        setFolders((await foldersRes.json()).folder);
        setFiles((await filesRes.json()).files);
    }, []);

    const openFolder = (folder: Folder) => {
        setFolderStack(prev => [...prev, { id: folder.id, name: folder.name }]);
        setCurrentFolder(folder);
        loadFolder(folder.id);
    };

    const goBack = () => {
        setFolderStack(prev => {
            const newStack = prev.slice(0, -1);
            const last = newStack[newStack.length - 1];

            const newCurrent = last ? { id: last.id, name: last.name } as Folder : null;

            setCurrentFolder(newCurrent);
            loadFolder(newCurrent?.id || null);

            return newStack;
        });
    };

    const handleModalClose = () => {
        setUploadOpen(false);
        setNewFolderOpen(false);
        loadFolder(currentFolder?.id || null); // refresh after creating/uploading
    };
    const [previewFile, setPreviewFile] = useState<File>(emptyFile);
    const closePreview = () => setPreviewFile(emptyFile);

    // --- Minimal additions to support download / delete from the grid & viewer ---
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDownload = async (file: File, e?: React.MouseEvent) => {
        e?.stopPropagation();
        const res = await fetch(`/api/files/${file.id}/preview`);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(blobUrl);
    };

    const handleDelete = async (file: File, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setDeletingId(file.id);
        const res = await fetch(`/api/files/${file.id}`, { method: "DELETE" });
        setDeletingId(null);
        if (!res.ok) {
            console.error("Failed to delete file");
            return;
        }
        setFiles(prev => prev.filter(f => f.id !== file.id));
        if (previewFile.id === file.id) closePreview();
    };

    return (
        <div className="h-screen w-screen flex" style={{ background: "var(--background)" }}>
            <SideBar
                OnUpload={() => setUploadOpen(true)}
                OnNewFile={() => setNewFolderOpen(true)}
            />

            <main className="ml-[20%] min-w-0 flex-1 p-8 overflow-y-auto drive-scroll">
                {/* Breadcrumb / back button */}
                <div className="flex items-center gap-3 mb-6">
                    {folderStack.length > 0 && (
                        <button
                            onClick={goBack}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                            style={{ borderColor: "var(--card-border)" }}
                            aria-label="Go back"
                        >
                            <IconChevronLeft />
                        </button>
                    )}
                    <h1 className="text-xl font-semibold tracking-tight">
                        {currentFolder ? (folderStack[folderStack.length - 1]?.name ?? "Folder") : "My Drive"}
                    </h1>
                    <span className="text-sm text-gray-400">
                        {folders.length + files.length} item{folders.length + files.length === 1 ? "" : "s"}
                    </span>
                </div>

                {folders.length === 0 && files.length === 0 ? (
                    <div
                        className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed py-24 text-center"
                        style={{ borderColor: "var(--card-border)" }}
                    >
                        <IconFolder className="w-8 h-8 text-gray-300" />
                        <p className="text-sm font-medium text-gray-500">This folder is empty</p>
                        <p className="text-xs text-gray-400">Upload a file or create a folder to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {folders.map((f) => (
                            <div
                                key={f.id}
                                onClick={() => openFolder(f)}
                                className="drive-card-enter group flex cursor-pointer items-center gap-3 rounded-xl p-4 transition-colors"
                                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
                            >
                                <span
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                                    style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                                >
                                    <IconFolder />
                                </span>
                                <span className="truncate text-sm font-medium">{f.name}</span>
                            </div>
                        ))}
                        {files && files.map((file) => {
                            const { Icon, tint, bg } = fileGlyph(file.mimeType);
                            const isDeleting = deletingId === file.id;
                            return (
                                <div
                                    key={file.id}
                                    onClick={() => setPreviewFile(file)}
                                    className="drive-card-enter group relative flex cursor-pointer flex-col gap-3 rounded-xl p-4 transition-shadow hover:shadow-md"
                                    style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${bg} ${tint}`}>
                                            <Icon />
                                        </span>
                                        <span className="truncate text-sm font-medium">{file.name}</span>
                                    </div>

                                    {/* Hover action bar */}
                                    <div
                                        className="absolute right-3 top-3 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            onClick={() => setPreviewFile(file)}
                                            title="Preview"
                                            aria-label="Preview file"
                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-gray-600 shadow-sm hover:text-gray-900 dark:bg-gray-900/90 dark:text-gray-300"
                                        >
                                            <IconEye className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDownload(file, e)}
                                            title="Download"
                                            aria-label="Download file"
                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-gray-600 shadow-sm hover:text-gray-900 dark:bg-gray-900/90 dark:text-gray-300"
                                        >
                                            <IconDownload className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(file, e)}
                                            title="Delete"
                                            aria-label="Delete file"
                                            disabled={isDeleting}
                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-gray-600 shadow-sm hover:text-red-600 disabled:opacity-60 dark:bg-gray-900/90 dark:text-gray-300"
                                        >
                                            {isDeleting ? <IconSpinner className="w-3.5 h-3.5" /> : <IconTrash className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
            {previewFile.id !== "" && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
                    onClick={closePreview}
                >
                    <FileViewer file={previewFile} onClose={closePreview} onDelete={handleDelete} />
                </div>
            )}
            <NewFolder
                open={newFolderOpen}
                onClose={handleModalClose}
                parentFolderId={currentFolder?.id || null}
            />
            <UploadFile
                open={uploadOpen}
                onClose={handleModalClose}
                folderId={currentFolder?.id || null}
            />
        </div>
    );
}