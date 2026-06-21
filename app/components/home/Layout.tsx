"use client";
import SideBar from "../SideBar";
import NewFolder from "../NewFolder";
import UploadFile from "../UploadFile";
import { useState, useCallback } from "react";
import type { User, Folder, File, Session } from "@/app/generated/prisma";



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

    return (
        <div className="h-screen w-screen flex">
            <SideBar
                OnUpload={() => setUploadOpen(true)}
                OnNewFile={() => setNewFolderOpen(true)}
            />

            <main className="ml-[20%] flex-1 p-6">
                {/* Breadcrumb / back button */}
                <div className="flex items-center gap-2 mb-4">
                    {folderStack.length > 0 && (
                        <button
                            onClick={goBack}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            ← Back
                        </button>
                    )}
                    <h1 className="text-xl font-bold">
                        {currentFolder ? "📂 Folder" : "My Drive"}
                    </h1>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-3 gap-4">
                    {folders.map((f) => (
                        <div
                            key={f.id}
                            onClick={() => openFolder(f)}
                            className="p-3 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            📁 {f.name}
                        </div>
                    ))}
                    {files && files.map((file) => (
                        <div key={file.id} className="p-3 border rounded">
                            📄 {file.name}
                        </div>
                    ))}
                </div>
            </main>

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