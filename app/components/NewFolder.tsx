"use client";
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
        <div className="newfolder-start h-1/2 rounded-xl p-6 max-h-1/2 inset-0 z-50 w-1/3 flex flex-col gap-4 align-center justify-center items-center  bg-gray-100 dark:bg-gray-900">
            <div onClick={onClose} className="absolute inset-0  text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                Close
            </div>
            <form className=" relative z-10 shadow-lg flex flex-col gap-4 align-center justify-center items-center  " onSubmit={handleFolderCreation}>
                <input type="text" name="folderName" className="flex flex-col w-full rounded-full pt-2 pb-2 bg-white dark:bg-gray-800" placeholder="Folder Name" required />
                <button type="submit" className="flex flex-col w-full p-6 rounded-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600">
                    Create Folder
                </button>
            </form>
        </div>
    )
}
export default NewFolder;