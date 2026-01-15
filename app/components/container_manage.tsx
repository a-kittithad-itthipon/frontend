"use client";
import { Pencil, Rocket, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function UserTable() {
  const connt: React.SetStateAction<any[]> = [
    // {
    //   container_name: "None",
    //   domain: "None",
    //   project_path: "None",
    //   port_internal: "None",
    // },
  ];

  const [data, setData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [containerTable, setContainerTable] = useState<any[]>([]);
  const [msg, setmsg] = useState("");
  const [port, setPort] = useState("");
  const [domain, setDomain] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [del, setDel] = useState(false);

  function userData(params: any) {
    if (params) {
      setData(params);
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setData(null);
    }
  }
  const check_port = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let port = parseInt(value);
    const allowed = "0123456789";
    for (const num of value) {
      console.log(num);
      console.log(value);
      if (!allowed.includes(num)) {
        setmsg("Port : Character Not Allowed");
        return;
      }
    }
    if (value.includes(" ")) {
      setmsg("Port : Space not allowed");
      return;
    }
    if (value.length > 5) {
      setmsg("Port : Maximum length is 5 characters");
      return;
    }
    if (port < 1 || port > 65535) {
      setmsg("Port : 1 - 65535");
      return;
    }
    setmsg("");
    setPort(value);
  };
  const check_domain = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789-.";

    if (value.includes(" ")) {
      setmsg("Domain : Space not allowed");
      return;
    }
    if (value !== value.toLowerCase()) {
      setmsg("Domain : UpperCase  not allowed");
      return;
    }
    if (value.length > 25) {
      setmsg("Domain : Maximum length is 25 characters");
      return;
    }
    for (const ch of value) {
      console.log(ch);
      console.log(value);
      if (!allowed.includes(ch)) {
        setmsg("Domain Name : Special characters not allowed");
        return;
      }
      if (
        value.includes("--") ||
        value.includes("..") ||
        value.includes("-.") ||
        value.includes(".-")
      ) {
        setmsg("Domain Name : Double  ' -- ' or ' .. ' not allowed");
        return;
      }
      if (value.startsWith("-") || value.startsWith(".")) {
        setmsg("Domain Name : First  ' - ' or ' . ' not allowed");
        return;
      }
    }
    setmsg("");
    setDomain(value);
  };

  useEffect(() => {
    const fetchContainermanage = async () => {
      try {
        const res = await fetch("/api/container_data");
        const data = await res.json();
        if (!res.ok) {
          setContainerTable(connt);
          return;
        }
        setContainerTable(data);
      } catch (error) {
        console.log(error);
        setContainerTable(connt);
      }
    };
    fetchContainermanage();
  }, []);
  return (
    <main className="flex flex-12 h-full justify-center items-center relative">
      <div className="flex w-[90%] h-[90%] justify-center items-center">
        <div className="w-full h-full flex justify-center items-start overflow-y-auto custom-scroll border rounded-3xl relative">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-800 sticky top-0 z-10">
              <tr className="h-[70px] text-lg text-center text-white">
                <th className="w-[10%]">No.</th>
                <th className="w-[20%]">Container Name</th>
                <th className="w-[20%]">Domain</th>
                <th className="w-[25%]">Project Path</th>
                <th className="w-[15%]">Port</th>
                <th className="w-[10%]">Edit</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {containerTable.map((container, index) => (
                <tr
                  key={index}
                  className="h-[60px] border-b hover:bg-gray-100 transition-all"
                >
                  <td>{index + 1}</td>
                  <td className="max-w-[80px] truncate">
                    {container.container_name}
                  </td>
                  <td className="max-w-[80px] truncate">{container.domain}</td>
                  <td className="max-w-[80px] truncate">
                    {container.project_path}
                  </td>
                  <td className="max-w-[80px] truncate">
                    {container.port_internal}
                  </td>
                  <td>
                    <div className="flex justify-center items-center w-full h-full">
                      <button
                        onClick={() => userData(container)}
                        className="p-3 rounded-full hover:bg-gray-200 h-full flex justify-center items-center cursor-pointer transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {containerTable.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="h-[65px] border-b hover:bg-gray-100 transition-all group"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition duration-200">
          <div className="flex flex-col items-center justify-start w-[25%] h-[50%] bg-white rounded-3xl p-2">
            <div className="w-full h-[15%] flex justify-center items-center text-2xl font-[600] flex-col gap-1">
              <span className="h-[60%] flex justify-center items-end">
                Edit System
              </span>
              <span className="text-[16px] font-[400] text-gray-500 h-[40%]">
                {msg}
              </span>
            </div>
            <div className="w-full px-5 gap-3 h-[15%] flex justify-start items-center text-xl font-[600]">
              <Rocket size={40} /> <span>{data.container_name}</span>
            </div>
            {!del && (
              <form
                action="#"
                method="post"
                className="w-full px-5 h-[55%] bg-white flex flex-col justify-start gap-2"
                id="editForm"
              >
                <div className="flex justify-center items-start flex-col gap-3 mt-5">
                  <label className="block text-sm font-bold text-[18px]">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 border px-3 outline-none rounded-lg"
                    value={domain}
                    onChange={check_domain}
                    required
                    placeholder="Enter Domain"
                  />
                </div>
                <div className="flex justify-center items-start flex-col gap-3 mt-5">
                  <label className="block text-sm font-bold text-[18px]">
                    Port
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 border px-3 outline-none rounded-lg"
                    value={port}
                    onChange={check_port}
                    required
                    placeholder="Enter port app (1 - 65535)"
                  />
                </div>
              </form>
            )}
            {del && (
              <div className="w-full px-5 h-[55%] bg-white flex flex-col justify-start gap-2">
                <div className="w-[90%] h-full text-lg felx text-center mt-8">
                  Are you sure you want to delete all containers in this stack ?
                </div>
              </div>
            )}
            <div className="flex justify-end items-center gap-4 w-full px-5 h-[15%] pb-4">
              {!del && (
                <>
                  <button
                    type="submit"
                    className="p-2 flex justify-center items-center bg-blue-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200"
                    form="editForm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="p-2 flex justify-center items-center bg-red-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-red-700 transition duration-200"
                    onClick={() => {
                      setDel(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="p-2 flex justify-center items-center bg-gray-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200"
                    onClick={() => userData(null)}
                  >
                    Cancel
                  </button>
                </>
              )}
              {del && (
                <>
                  <form
                    action="#"
                    method="post"
                    className="p-2 flex justify-center items-center bg-red-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-red-700 transition duration-200"
                    id="delForm"
                  >
                    <input
                      type="hidden"
                      name="username_del"
                      value={data.username}
                    />
                    <button
                      type="submit"
                      className="cursor-pointer"
                      form="delForm"
                    >
                      Confirm
                    </button>
                  </form>
                  <button
                    type="button"
                    className="p-2 flex justify-center items-center bg-gray-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200"
                    onClick={() => {
                      setDel(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
