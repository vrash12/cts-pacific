import { cn } from "@/lib/utils";

type NetworkMotifProps = {
  className?: string;
  inverse?: boolean;
};

export function NetworkMotif({ className, inverse = false }: NetworkMotifProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("network-motif", inverse && "network-motif--inverse", className)}
    >
      <span className="network-motif__node network-motif__node--start" />
      <span className="network-motif__line" />
      <span className="network-motif__node network-motif__node--middle" />
      <span className="network-motif__branch" />
      <span className="network-motif__node network-motif__node--branch" />
      <span className="network-motif__line network-motif__line--end" />
      <span className="network-motif__node network-motif__node--end" />
    </div>
  );
}

