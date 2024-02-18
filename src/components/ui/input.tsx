import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    React.useEffect(() => {
      if (props.defaultValue && props.onChange) {
        const e = {
          target: {
            value: props.defaultValue as any,
            name: props.name as string,
          },
        } as any;
        props.onChange(e);
      }
    }, []);

    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-xl border border-black/30 bg-transparent px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-black/80  focus-visible:ring-0 focus-visible:ring-slate-950 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/5 dark:bg-transparent dark:ring-offset-0 dark:placeholder:text-white/[0.29] dark:focus-visible:border-white/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
