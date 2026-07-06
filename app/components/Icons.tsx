//app/components/Icons.tsx
// Small, dependency-free icon set used across the drive UI.
// Keeping these local avoids pulling in an icon package for a handful of glyphs.

export const IconFolder = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12a1.5 1.5 0 0 0 1.06.44H19.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
    </svg>
);

export const IconChevronLeft = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M14.5 5.5 8 12l6.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const IconEye = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M2.5 12S5.7 5.5 12 5.5 21.5 12 21.5 12 18.3 18.5 12 18.5 2.5 12 2.5 12Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
);

export const IconDownload = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 3.5v11.2M7.5 10.5 12 15l4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 17v1.8A1.7 1.7 0 0 0 6.2 20.5h11.6a1.7 1.7 0 0 0 1.7-1.7V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const IconTrash = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M5 7h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9.5 7V5.2A1.2 1.2 0 0 1 10.7 4h2.6a1.2 1.2 0 0 1 1.2 1.2V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7l.8 12.1A1.6 1.6 0 0 0 9.4 20.5h5.2a1.6 1.6 0 0 0 1.6-1.4L17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.2 10.8v6M13.8 10.8v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

export const IconClose = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

export const IconPlusFolder = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12a1.5 1.5 0 0 0 1.06.44H19.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
        <path d="M12 10.5v5M9.5 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

export const IconUpload = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 15.5V4.3M7.5 8.8 12 4.3l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 17v1.8A1.7 1.7 0 0 0 6.2 20.5h11.6a1.7 1.7 0 0 0 1.7-1.7V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const IconImage = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="8.5" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.5 16.5 9 12l3 3 3.5-4L20 16.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
);

export const IconPdf = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6.5 3.5h8l4 4v13a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14.5 3.5V7a1 1 0 0 0 1 1h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
);

export const IconVideo = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3.5" y="6" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15.5 10.5 20.5 8v8l-5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
);

export const IconFile = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6.5 3.5h8l4 4v13a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14.5 3.5V7a1 1 0 0 0 1 1h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
);

export const IconSpinner = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} animate-spin`}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.2" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
);

export function fileGlyph(mimeType: string) {
    if (mimeType?.startsWith("image/")) return { Icon: IconImage, tint: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" };
    if (mimeType === "application/pdf") return { Icon: IconPdf, tint: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" };
    if (mimeType?.startsWith("video/")) return { Icon: IconVideo, tint: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10" };
    return { Icon: IconFile, tint: "text-slate-500", bg: "bg-slate-100 dark:bg-slate-500/10" };
}