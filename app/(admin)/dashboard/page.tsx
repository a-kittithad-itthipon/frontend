import Sidebar from "@/app/components/sidebar";
import Getsystemlist from "@/app/components/system_dashboard";
import { cookies } from "next/headers";
import {
  ArrowUpRight,
  ArrowUpToLine,
  FileText,
  IdCard,
  MonitorCog,
  SquareActivity,
  Users,
} from "lucide-react";
import Link from "next/link";

const default_data = {
  username: "Loading...",
  user_total: 0,
  upload_total: 0,
  req_total: 0,
};
async function get_data() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return default_data;
  }

  try {
    const res = await fetch("http://localhost:5000/api/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return default_data;
    }
    console.log(res);
    return await res.json();
  } catch (error) {
    console.log("Error:", error);
    return default_data;
  }
}
const dashboard = async () => {
  const data = await get_data();
  const userName = data.username;
  const upLoad = data.upload_total;
  const users = data.user_total;
  const req_total = data.req_total;
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Sidebar />
      <main className="flex flex-12 h-full flex-col items-center justify-center gap-3">
        <div className="h-[90%] w-[90%] flex flex-col justify-start items-center gap-3">
          <div className="w-full h-[65%] rounded-3xl flex justify-between items-center flex-col overflow-hidden">
            <div className="w-full h-[15%] pl-4 flex items-center justify-between">
              <div className="flex items-center justify-start gap-3 text-xl font-[600]">
                <MonitorCog size={30} />
                <p>My System and Container</p>
              </div>
              <div className="flex items-center justify-end gap-3 text-xl text-gray-800 font-[600]">
                <IdCard size={35} />{" "}
                <div className="max-w-[250px]">{userName}</div>
              </div>
            </div>
            <div className="w-full h-[85%] flex justify-center items-start overflow-y-auto custom-scroll border rounded-3xl">
              <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-800 sticky top-0 z-10">
                  <tr className="h-[70px] p-2 text-lg text-center text-white">
                    <th className="w-[10%]">No.</th>
                    <th className="w-[25%]">Container Name</th>
                    <th className="w-[20%]">Domain</th>
                    <th className="w-[15%]">Type</th>
                    <th className="w-[10%]">Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <Getsystemlist />
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full h-[35%] flex justify-between items-center">
            <Link
              className="h-[90%] w-[22%] border rounded-3xl flex justify-center items-center gap-3 flex-col p-2 transition duration-200 shadow-gray-100 hover:bg-gray-800 hover:text-white"
              href={"/user_manage"}
            >
              <span className="h-full w-full flex flex-col justify-between items-center font-[600]">
                <div className="w-full h-[20%] pt-3 pl-3 flex justify-start items-center gap-2 text-md">
                  <Users />
                  <p>Users <span className="text-sm">( Req : {req_total} )</span></p>
                </div>
                <div className="w-full h-[30%] text-2xl flex justify-center items-center flex-col gap-2">
                  <p>{users}</p>
                </div>
                <div className="w-full h-[20%]"></div>
              </span>
            </Link>
            <Link
              className="h-[90%] w-[22%] border rounded-3xl flex justify-center items-center gap-3 flex-col p-2 transition duration-200 shadow-gray-100 hover:bg-gray-800 hover:text-white"
              href={"/upload"}
            >
              <span className="h-full w-full flex flex-col justify-between items-center font-[600]">
                <div className="w-full h-[20%] pt-3 pl-3 flex justify-start items-center gap-2 text-md">
                  <ArrowUpToLine />
                  <p>Uploads Total</p>
                </div>
                <div className="w-full h-[30%] text-2xl flex justify-center items-center">
                  <p>{upLoad}</p>
                </div>
                <div className="w-full h-[20%]"></div>
              </span>
            </Link>
            <a
              className="h-[90%] w-[22%] border rounded-3xl flex justify-center items-center gap-3 flex-col p-2 transition duration-200 shadow-gray-100 hover:bg-gray-800 hover:text-white"
              href="https://dashdot.local"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="h-full w-full flex flex-col justify-between items-center font-[600]">
                <div className="w-full h-[20%] pt-3 pl-3 flex justify-start items-center gap-2 text-md">
                  <SquareActivity />
                  <p>System</p>
                </div>
                <div className="w-full h-[30%] text-lg flex justify-center items-center outline-none">
                  <p>Monitor </p>
                  <ArrowUpRight />
                </div>
                <div className="w-full h-[20%]"></div>
              </span>
            </a>
            <a
              className="h-[90%] w-[22%] border rounded-3xl flex justify-center items-center gap-3 flex-col p-2 transition duration-200 shadow-gray-100 hover:bg-gray-800 hover:text-white"
              href="https://fileadmin.local"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="h-full w-full flex flex-col justify-between items-center font-[600]">
                <div className="w-full h-[20%] pt-3 pl-3 flex justify-start items-center gap-2 text-md">
                  <FileText />
                  <p>Documents</p>
                </div>
                <div className="w-full h-[30%] text-lg flex justify-center items-center outline-none">
                  <p>Docs Edit </p>
                  <ArrowUpRight />
                </div>
                <div className="w-full h-[20%]"></div>
              </span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
export default dashboard;
