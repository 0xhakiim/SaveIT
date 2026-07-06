"use client";
import { useState } from "react";
import { IconClose, IconUpload } from "./Icons";

const UploadFile = ({ open, onClose, folderId }: { open: boolean; onClose: () => void; folderId: string | null }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleFileUpload(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const form = event.currentTarget;

        const formData = new FormData(form);
        formData.append("folderId", folderId || "");

        setSubmitting(true);
        const response = await fetch("/api/files", {
            method: "POST",
            body: formData,
        });
        setSubmitting(false);

        if (!response.ok) {
            console.error("Upload failed");
            return;
        }

        onClose();
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
                        style={{ background: "rgba(200,121,31,0.12)", color: "var(--upload-accent)" }}
                    >
                        <IconUpload />
                    </span>
                    <h3 className="text-base font-semibold">Upload file</h3>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleFileUpload}>
                    <label
                        htmlFor="file-input"
                        className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 px-4 text-center cursor-pointer transition-colors hover:border-current"
                        style={{ borderColor: "var(--card-border)", color: "var(--upload-accent)" }}
                    >
                        <IconUpload className="w-6 h-6" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {fileName ?? "Choose a file or drop it here"}
                        </span>
                        <input
                            id="file-input"
                            type="file"
                            name="file"
                            className="hidden"
                            required
                            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                        />
                    </label>

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
                            disabled={submitting}
                            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-60"
                            style={{ background: "var(--upload-accent)" }}
                            onMouseEnter={(e) => !submitting && (e.currentTarget.style.background = "var(--upload-accent-strong)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--upload-accent)")}
                        >
                            {submitting ? "Uploading…" : "Upload file"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UploadFile;