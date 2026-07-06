"use client";
import { IconClose, IconPlusFolder } from "./Icons";

const NewFolder = ({ open, onClose, parentFolderId }: { open: boolean; onClose: () => void; parentFolderId: string | null }) => {
    async function handleFolderCreation(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const folderName = form.get("folderName") as string;
        await fetch("/api/folders", {
            method: "POST",
            body: JSON.stringify({ folderName, parentId: parentFolderId }),
            headers: {
                "Content-Type": "application/json",
            },
        });

    }
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                aria-hidden="true"
            />
            <div
                className="drive-modal-enter relative z-10 w-full max-w-sm rounded-2xl p-6 shadow-2xl"
                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <IconClose />
                </button>

                <div className="flex items-center gap-2.5 mb-5">
                    <span
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                    >
                        <IconPlusFolder />
                    </span>
                    <h3 className="text-base font-semibold">New folder</h3>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleFolderCreation}>
                    <input
                        type="text"
                        name="folderName"
                        autoFocus
                        className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 bg-white dark:bg-gray-800"
                        style={{ borderColor: "var(--card-border)" }}
                        placeholder="Untitled folder"
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
                            style={{ background: "var(--accent)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-strong)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
                        >
                            Create folder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default NewFolder;