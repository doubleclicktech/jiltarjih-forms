import type { ProjectStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

function Dot({ className }: { className?: string }) {
  return <span className={cn("h-1.5 w-1.5 rounded-full", className)} aria-hidden />;
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  if (status === "open") {
    return (
      <Badge className="bg-primary-fixed text-on-primary-fixed-variant">
        <Dot className="bg-on-primary-fixed-variant animate-pulse" />
        مفتوح للتسجيل
      </Badge>
    );
  }
  if (status === "active") {
    return (
      <Badge className="bg-secondary-fixed text-on-secondary-fixed-variant">
        <Dot className="bg-on-secondary-fixed-variant" />
        قيد التنفيذ
      </Badge>
    );
  }
  return (
    <Badge className="bg-surface-variant text-on-surface-variant">
      <Dot className="bg-on-surface-variant/60" />
      مكتمل
    </Badge>
  );
}

