import { cn } from "@/lib/utils";
import * as React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[90%] px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
