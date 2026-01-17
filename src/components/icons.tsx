import { cn } from "@/lib/utils";

export const RobuxIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={cn("h-4 w-4", className)}
    >
        <path d="M13.23 3.34C14.71 4.5 15.11 6.8 14 8.59s-3.2 2.3-4.68 1.15a4.5 4.5 0 0 1-1.15-4.68c1.1-1.79 3.4-2.19 5.18-1.06Z" />
        <path d="m10.88 9.77 5.72 5.72" />
        <path d="M10.77 20.66c-1.48-1.16-1.88-3.46-.77-5.24s3.2-2.3 4.68-1.15a4.5 4.5 0 0 1 1.15 4.68c-1.1 1.79-3.4 2.19-5.18 1.06Z" />
    </svg>
);
