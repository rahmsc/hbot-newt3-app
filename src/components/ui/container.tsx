import { cn } from "~/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}
        {...props}
      />
    );
  },
);

Container.displayName = "Container";
