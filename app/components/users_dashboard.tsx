"use client";
import { ArrowUpRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

export default function Get_users_systemlist() {
  const data_container: SetStateAction<any[]> = [];

  const searchParams = useSearchParams();
  const taskId = searchParams.get("task_id");
  const [refresh, setRefresh] = useState(0)
  const router = useRouter();

  const [container, setContainer] = useState<any[]>([]);


  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task_id: taskId }),
        });
        
        const data = await res.json();
        if (res.status === 200) {
          setRefresh(Date.now()); 
          router.replace("/users/dashboard");
        } 
        else if (res.status >= 400) {
          router.replace("/users/dashboard");
        }

      } catch (error) {
        console.error(error);
      }
    }, 2000);

    return () => clearInterval(interval);

  }, [taskId]);

  useEffect(() => {
    const fetchContainer = async () => {
      try {
        const res = await fetch("/api/container_data");
        const data = await res.json();
        if (!res.ok) {
          setContainer(data_container);
          return;
        }
        setContainer(data);
      } catch (error) {
        console.log(error);
        setContainer(data_container);
      }
    };
    fetchContainer();
  }, [refresh]);

  if (container.length === 0) {
    return (
      <tr>
        <td
          colSpan={6}
          className="h-[65px] border-b hover:bg-gray-100 transition-all group"
        >
          No results found
        </td>
      </tr>
      );
  }
  return container.map((item, index) => (
    <tr
      key={index + 1}
      className="h-[65px] border-b hover:bg-gray-100 transition-all group"
    >
      <td className="max-w-[80px] truncate">{index + 1}</td>
      <td className="max-w-[80px] truncate">{item.container_name}</td>
      <td className="max-w-[80px] truncate">
        <div className="flex justify-center items-center gap-1">
          <a
            href={`https://${item.domain}`}
            className="text-sky-700 hover:text-sky-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.domain} {item.domain ? "" : "-"}
          </a>
          {item.domain && (
            <ArrowUpRight
              size={16}
              className="text-sky-700 group-hover:text-sky-900"
            />
          )}
        </div>
      </td>
      <td className="max-w-[80px] truncate">{item.type}</td>
      <td className="h-[65px] align-middle">
        <div className="relative w-full h-full flex justify-center items-center">
          <i
            className={
              item.status == "running"
                ? "bx bxs-circle text-green-600 text-[14px] transition-opacity duration-200 group-hover:opacity-0"
                : "bx bxs-circle text-red-500 text-[14px] transition-opacity duration-200 group-hover:opacity-0"
            }
          ></i>
          <span
            className={
              item.status == "running"
                ? "absolute text-sm text-green-600 font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                : "absolute text-sm text-red-500 font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            }
          >
            {item.status}
          </span>
        </div>
      </td>
    </tr>
  ));
}
