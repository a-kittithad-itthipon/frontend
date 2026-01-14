"use client";

import { ArrowUpRight } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";

export default function SystemList() {
  const [search, setSearch] = useState("");
  const [system, setSystem] = useState<any[]>([]);
  const search_system = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setSearch(value);
  };
  const systems_data: SetStateAction<any[]> = [];
  for (let i = 0; i < 30; i++) {
    systems_data.push({
      id: i + 1,
      container_name: "system" + (i + 1),
      domain: "sys" + (i + 1) + ".local",
      type: "Web",
      owner: "Administrator",
      status: "Running",
    });
  }
  const filteredSystems = [];
  for (let i = 0; i < system.length; i++) {
    const sys = system[i];
    const name = sys.container_name.toLowerCase();
    const domain = sys.domain.toLowerCase();
    const keyword = search.toLowerCase();
    if (name.includes(keyword) || domain.includes(keyword)) {
      filteredSystems.push(sys);
    }
  }
  useEffect(() => {
    const fetchSystemdata = async () => {
      try {
        const res = await fetch("api/active-site");
        const data = await res.json();

        if (!res.ok) {
          setSystem(systems_data);
        }
        setSystem(data);
        console.log(data);
        console.log(system);
      } catch (error) {
        console.log(error);
        setSystem(systems_data);
      }
    };
    fetchSystemdata();
  }, []);
  return (
    <main className="h-[calc(100vh-90px)] w-full flex justify-start items-center flex-col">
      <div className="w-[75%] h-[10%] flex justify-end items-center">
        <span className="w-[32%] h-[50px] rounded-full border border-gray-300 text-right flex justify-between items-center gap-2 px-4 focus-within:border focus-within:border-gray-500 transition-all duration-300">
          <input
            type="text"
            placeholder="Search name or domain..."
            className="w-full h-full p-3 outline-none"
            onChange={search_system}
          />
          <i className="bx bx-search text-2xl"></i>
        </span>
      </div>
      <div className="w-[75%] h-[85%] flex justify-between items-start rounded-3xl shadow-lg mt-2 overflow-hidden shadow-gray-100 flex-col relative">
        <div className="h-full w-full overflow-y-auto custom-scroll flex items-start justify-center">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-800 sticky top-0 z-10">
              <tr className="h-[70px] p-2 text-lg text-center text-white">
                <th className="w-[10%]">No.</th>
                <th className="w-[25%]">Container Name</th>
                <th className="w-[20%]">Domain</th>
                <th className="w-[15%]">Type</th>
                <th className="w-[20%]">Owner</th>
                <th className="w-[10%]">Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredSystems.map((value, i) =>
                value.domain ? (
                  <tr
                    key={i + 1}
                    className="h-[65px] border-b hover:bg-gray-100 transition-all group"
                  >
                    <td>{i + 1}</td>
                    <td className="max-w-[250px] truncate">
                      {value.container_name}
                    </td>
                    <td>
                      <div className="flex justify-center items-center group gap-1">
                        <a
                          href="#"
                          className="text-sky-700 hover:text-sky-900"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {value.domain}
                        </a>
                        <ArrowUpRight
                          size={16}
                          className="text-sky-700 group-hover:text-sky-900"
                        />
                      </div>
                    </td>
                    <td>{value.type}</td>
                    <td>{value.owner}</td>
                    <td>
                      <div className="relative group text-green-600 font-medium flex justify-center items-center h-[65px] w-full group">
                        <i
                          className={
                            value.status == "running"
                              ? "bx bxs-circle text-green-600 text-[14px] transition-opacity duration-200 group-hover:opacity-0"
                              : "bx bxs-circle text-red-500 text-[14px] transition-opacity duration-200 group-hover:opacity-0"
                          }
                        ></i>
                        <span
                          className={
                            value.status == "running"
                              ? "absolute text-sm text-green-600 font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                              : "absolute text-sm text-red-500 font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          }
                        >
                          {value.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : null
              )}
              {filteredSystems.length === 0 && (
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
    </main>
  );
}
