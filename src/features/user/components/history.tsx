"use client";

import React, { useEffect, useState } from "react";

import { USER_ITEMS } from "@/lib/constants/user-history";
import { CircleX, Pencil, ScrollText, User, X } from "lucide-react";

export function UserHistory() {
  const [usersTable, setUserstable] = useState<any[]>([]);
  const [details_msg, setDetails_msg] = useState("");
  const [isopen, setisopen] = useState(false);
  const [data, setdata] = useState<any>(null);

  function User_data(params: any) {
    if (params) {
      setisopen(true);
      setdata(params);
      console.log(params);
    } else {
      setisopen(false);
      setdata(null);
    }
  }

  useEffect(() => {
    setUserstable(USER_ITEMS);
  }, []);

  return (
    <main className="flex flex-12 h-full justify-center items-center relative">
      <div className="flex w-[90%] h-[90%] justify-center items-center">
        <div className="w-full h-full flex justify-center items-start overflow-y-auto custom-scroll border rounded-3xl relative">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-800 sticky top-0 z-10">
              <tr className="h-[70px] text-lg text-center text-white">
                <th className="w-[10%]">No.</th>
                <th className="w-[20%]">Username</th>
                <th className="w-[20%]">Containers</th>
                <th className="w-[10%]">Action</th>
                <th className="w-[20%]">Date Time</th>
                <th className="w-[10%]">Status</th>
                <th className="w-[10%]">Details</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {usersTable.map((user, index) => (
                <tr
                  key={index}
                  className="h-[60px] border-b hover:bg-gray-100 transition-all"
                >
                  <td>{index + 1}</td>
                  <td className="max-w-[80px] truncate">{user.username}</td>
                  <td className="max-w-[80px] truncate">{user.container}</td>
                  <td className="max-w-[80px] truncate">{user.action}</td>
                  <td className="max-w-[80px] truncate">{user.datetime}</td>
                  <td className="max-w-[80px] truncate">{user.status}</td>
                  <td className="max-w-[80px] truncate">
                    <div className="w-full h-full flex justify-center">
                      <button
                        className="cursor-pointer transition duration-200 hover:bg-gray-200 p-2 rounded-full"
                        onClick={() => User_data(user)}
                      >
                        <ScrollText />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isopen && data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition duration-200">
          <div className="w-[40%] h-[55%] bg-white rounded-2xl flex flex-col">
            <div className="w-full h-[15%] flex justify-between items-center">
              <div className="w-[10%]"></div>
              <div className="text-xl flex justify-center items-center font-[600] w-[80%]">
                Details : {data.username}
              </div>
              <button
                className="cursor-pointer px-3 w-[10%]"
                onClick={() => {
                  User_data(null);
                }}
              >
                <CircleX size={30} />
              </button>
            </div>
            <div className="w-full h-[80%] p-5 overflow-y-auto text-justify">
              {data.details}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
