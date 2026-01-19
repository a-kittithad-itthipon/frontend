import type { Metadata } from "next";

import {
  ArrowUpToLine,
  SquareActivity,
  Database,
  FileText,
  MonitorCog,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard - User",
};

const user_data = { username: "Loading...", upload_total: 0 };

const get_data = async () => {
  // simulate fetching user data
  return user_data;
};

export default async function DashboardPage() {
  const userData = await get_data();
  const upload = userData.upload_total;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="h-44 md:h-52 w-full md:w-[22%] border rounded-3xl p-4 flex flex-col justify-between hover:bg-gray-800 hover:text-white transition">
          <div className="flex items-center gap-2 text-md">
            <ArrowUpToLine /> Uploads Total
          </div>
          <div className="text-2xl font-semibold flex justify-center items-center">
            {upload}
          </div>
        </div>

        <div className="h-44 md:h-52 w-full md:w-[22%] border rounded-3xl p-4 flex flex-col justify-between hover:bg-gray-800 hover:text-white transition">
          <div className="flex items-center gap-2 text-md">
            <SquareActivity /> History Log
          </div>
          <div className="text-lg flex justify-center items-center">
            Monitoring Log
          </div>
        </div>

        <a
          href="https://dashdot.local"
          target="_blank"
          rel="noopener noreferrer"
          className="h-44 md:h-52 w-full md:w-[22%] border rounded-3xl p-4 flex flex-col justify-between hover:bg-gray-800 hover:text-white transition"
        >
          <div className="flex items-center gap-2 text-md">
            <Database /> PHP MyAdmin
          </div>
          <div className="text-lg flex justify-center items-center">
            Manage DB
          </div>
        </a>

        <a
          href="https://dashdot.local"
          target="_blank"
          rel="noopener noreferrer"
          className="h-44 md:h-52 w-full md:w-[22%] border rounded-3xl p-4 flex flex-col justify-between hover:bg-gray-800 hover:text-white transition"
        >
          <div className="flex items-center gap-2 text-md">
            <FileText /> Documents
          </div>
          <div className="text-lg flex justify-center items-center">
            Read Doc
          </div>
        </a>
      </div>

      {/* System Table */}
      <div className="w-full rounded-3xl flex flex-col overflow-hidden border">
        <div className="w-full flex justify-between items-center bg-gray-100 p-4">
          <div className="flex items-center gap-3 text-xl font-semibold">
            <MonitorCog /> My System and Container
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-800 text-white sticky top-0">
              <tr className="h-12 text-center">
                <th>No.</th>
                <th>Container Name</th>
                <th>Domain</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* Example Rows */}
              <tr>
                <td>1</td>
                <td>Container 1</td>
                <td>example.com</td>
                <td>Web</td>
                <td>Running</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
