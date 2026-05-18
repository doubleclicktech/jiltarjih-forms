import type { ProjectStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  if (status === "open") {
    return (
      <Badge className="bg-primary-fixed text-on-primary-fixed-variant">
        مفتوح للتسجيل
      </Badge>
    );
  }
  if (status === "active") {
    return (
      <Badge className="bg-secondary-fixed text-on-secondary-fixed-variant">
        قيد التنفيذ
      </Badge>
    );
  }
  return (
    <Badge className="bg-surface-variant text-on-surface-variant">مكتمل</Badge>
  );
}

