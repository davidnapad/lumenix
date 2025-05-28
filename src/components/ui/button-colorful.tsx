import { Button } from "./button";
import { cn } from "../../lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export function ButtonColorful({
    className,
    label = "Explore Components",
    ...props
}: ButtonColorfulProps) {
    return (
        <Button
            className={cn(
                "relative h-10 px-6 py-3 overflow-hidden rounded-full",
                "bg-gradient-to-r from-[#00dfff] to-[#A855F7]",
                "text-white font-medium",
                "transition-all duration-200",
                "hover:shadow-lg hover:-translate-y-0.5",
                "group",
                className
            )}
            {...props}
        >
            {/* Content */}
            <div className="relative flex items-center justify-center gap-2">
                <span>{label}</span>
                <ArrowUpRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
        </Button>
    );
}