import { SystemStatus } from "./components/system-status";
import { SystemTable } from "./components/system-table";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <SystemStatus />
      <SystemTable />
    </div>
  );
}
