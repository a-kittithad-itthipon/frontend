"use client";

import { useEffect, useState } from "react";

import { CircleX, ScrollText } from "lucide-react";

const users = [
  {
    username: "admin",
    container: "dev",
    action: "DEPLOY",
    datetime: Date.now(),
    status: "Success",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, dicta consequuntur quam, perspiciatis vitae pariatur hic, quibusdam ut non dignissimos labore enim maxime laudantium dolores? Excepturi mollitia totam necessitatibus laudantium.",
  },
  {
    username: "admin",
    container: "dev",
    action: "DEPLOY",
    datetime: Date.now(),
    status: "Success",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, dicta consequuntur quam, perspiciatis vitae pariatur hic, quibusdam ut non dignissimos labore enim maxime laudantium dolores? Excepturi mollitia totam necessitatibus laudantium.",
  },
  {
    username: "admin",
    container: "dev",
    action: "DEPLOY",
    datetime: Date.now(),
    status: "Success",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, dicta consequuntur quam, perspiciatis vitae pariatur hic, quibusdam ut non dignissimos labore enim maxime laudantium dolores? Excepturi mollitia totam necessitatibus laudantium.",
  },
];

export function AdminHistory() {
  const [usersTable, setUserstable] = useState<any[]>([]);
  const [isopen, setisopen] = useState(false);
  const [data, setdata] = useState<any>(null);

  function userData(params: any) {
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
    setUserstable(users);
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center items-start overflow-y-auto custom-scroll border rounded-3xl relative">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-800 sticky top-0 z-10">
            <tr className="h-17.5 text-lg text-center text-white">
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
                className="h-15 border-b hover:bg-gray-100 transition-all"
              >
                <td>{index + 1}</td>
                <td className="max-w-20 truncate">{user.username}</td>
                <td className="max-w-20 truncate">{user.container}</td>
                <td className="max-w-20 truncate">{user.action}</td>
                <td className="max-w-20 truncate">{user.datetime}</td>
                <td className="max-w-20 truncate">{user.status}</td>
                <td className="max-w-20 truncate">
                  <div className="w-full h-full flex justify-center">
                    <button
                      className="cursor-pointer transition duration-200 hover:bg-gray-200 p-2 rounded-full"
                      onClick={() => userData(user)}
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

      {isopen && data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition duration-200">
          <div className="w-[40%] h-[55%] bg-white rounded-2xl flex flex-col">
            <div className="w-full h-[15%] flex justify-between items-center">
              <div className="w-[10%]"></div>
              <div className="text-xl flex justify-center items-center font-semibold w-[80%]">
                Details : {data.username}
              </div>
              <button
                className="cursor-pointer px-3 w-[10%]"
                onClick={() => {
                  userData(null);
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
    </>
  );
}
