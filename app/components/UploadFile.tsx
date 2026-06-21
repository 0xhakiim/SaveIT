"use client";
const UploadFile = ({ open, onClose, folderId }: { open: boolean; onClose: () => void; folderId: string | null }) => {

    async function handleFileUpload(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const form = event.currentTarget;

        const formData = new FormData(form);
        formData.append("folderId", folderId || "");

        const response = await fetch("/api/files", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            console.error("Upload failed");
            return;
        }

        onClose();
    }
    if (!open) return null;
    return (

        <div className="upload-startfixed inset-0 z-50 w-1/3 flex flex-col gap-4 align-center justify-center items-center h-full bg-gray-100 dark:bg-gray-900">
            <div onClick={onClose} className="absolute inset-0  text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                Close
            </div>
            <form className=" relative z-10 shadow-lg flex flex-col gap-4 align-center justify-center items-center h-full w-1/2 " onSubmit={handleFileUpload}>
                <input type="file" name="file" className="flex flex-col w-full rounded-full pt-2 pb-2 bg-white dark:bg-gray-800" required />
                <button type="submit" className="flex flex-col w-full rounded-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600">
                    Upload File
                </button>
            </form>
        </div>
    )
}
export default UploadFile;