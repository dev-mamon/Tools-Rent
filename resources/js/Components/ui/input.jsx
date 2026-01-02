import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
    (
        {
            className,
            type = "text",
            label,
            error,
            isTextArea = false,
            ...props
        },
        ref
    ) => {
        const Component = isTextArea ? "textarea" : "input";

        return (
            <div className="w-full space-y-1.5 text-left">
                {/* Label handling */}
                {label && (
                    <label className="text-[13px] font-semibold text-gray-700 ml-0.5">
                        {label}
                    </label>
                )}

                <Component
                    type={!isTextArea ? type : undefined}
                    className={cn(
                        // Base Styles
                        "flex w-full rounded-md border bg-white px-3 py-2 text-sm",
                        "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0",
                        "border-gray-200 focus:border-[#FF9F43] focus:ring-[#FF9F43]/20",

                        // Textarea specific
                        isTextArea ? "min-h-[100px] resize-y" : "h-10",
                        // Disabled state
                        "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {/* Validation message show korbe kintu input class e effect felbe na */}
                {error && (
                    <p className="text-[11px] font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
