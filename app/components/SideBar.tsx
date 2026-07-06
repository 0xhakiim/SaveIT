"use client";
import { IconPlusFolder, IconUpload } from "./Icons";

const SideBar = ({ OnUpload, OnNewFile }: { OnUpload: () => void, OnNewFile: () => void }) => {

    return (
        <div
            className="sidebar-start fixed left-0 top-0 h-screen w-1/5 min-w-[220px] max-w-[280px] flex flex-col gap-6 p-5"
            style={{ background: "var(--sidebar-bg)", color: "var(--sidebar-fg)" }}
        >
            <div className="flex items-center gap-2 px-1">
                <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
                    style={{ background: "var(--accent)", color: "white" }}
                >
                    D
                </span>
                <h2 className="text-base font-semibold tracking-tight">My Drive</h2>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <button
                    onClick={() => OnNewFile()}
                    className="group flex w-full items-center gap-2.5 rounded-xl py-2.5 px-3.5 text-sm font-medium transition-colors hover:brightness-125"
                    style={{ background: "rgba(255,255,255,0.06)", color: "var(--sidebar-fg)" }}
                >
                    <IconPlusFolder className="w-4 h-4 opacity-80 group-hover:opacity-100" />
                    New folder
                </button>
                <button
                    onClick={() => OnUpload()}
                    className="flex w-full items-center gap-2.5 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-white transition-colors"
                    style={{ background: "var(--upload-accent)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--upload-accent-strong)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--upload-accent)")}
                >
                    <IconUpload className="w-4 h-4" />
                    Upload file
                </button>
            </div>

            <div className="mt-auto px-1 text-xs" style={{ color: "var(--sidebar-muted)" }}>
                Files stay private to your account.
            </div>
        </div>
    )
}
export default SideBar;