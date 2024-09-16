import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export default function Spinner({
  size = 24,
  className = "",
}: SpinnerProps = {}) {
  return (
    <div
      className={`flex animate-spin items-center justify-center p-4 ${className}`}
      aria-label="Loading"
    >
      <Loader2 size={size} />
    </div>
  );
}
