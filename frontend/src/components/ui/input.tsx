import * as React from "react"
import { cn } from "../../libs/utils"

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "green-focus"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border dark:border-zinc-700 bg-transparent px-3 py-5 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          variant === "default" && "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",

          variant === "green-focus" && "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-main-color focus-visible:border-main-color",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }