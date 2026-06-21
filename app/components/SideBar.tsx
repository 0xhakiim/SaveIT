
"use client";
const SideBar = ({ OnUpload, OnNewFile }: { OnUpload: () => void, OnNewFile: () => void }) => {

    return (
        <div className="sidebar-start absolute left-0 top-0 h-screen w-1/5 bg-gray-200 dark:bg-gray-800 p-4">
            <h2 className="text-lg font-bold">My Drive</h2>
            <div className="flex flex-col gap-2 w-full">
                <button onClick={() => OnNewFile()} className="flex flex-col w-full rounded-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600">
                    New Folder
                </button>
                <button onClick={() => OnUpload()} className="flex flex-col w-full rounded-full bg-green-500 text-white py-2 px-4 hover:bg-green-600">
                    Upload File
                </button>
            </div>
        </div>
    )
}
export default SideBar;