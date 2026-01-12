import { ArrowUpRight } from "lucide-react";

export default function Getsystemlist() {
  const data = [
    {
      id: 1,
      name: "Portainer",
      domain: "portainer.local",
      type: "System",
      status: "Running",
    },
    {
      id: 2,
      name: "Nginx",
      domain: "nginx.local",
      type: "System",
      status: "Running",
    },
    {
      id: 3,
      name: "Technitium",
      domain: "technitium.local",
      type: "System",
      status: "Running",
    },
    {
      id: 4,
      name: "PHPmyadmin",
      domain: "pma.local",
      type: "System",
      status: "Running",
    },
    {
      id: 5,
      name: "Dozzle",
      domain: "dozzle.local",
      type: "System",
      status: "Running",
    },
    {
      id: 6,
      name: "Dashdot",
      domain: "dashdot.local",
      type: "System",
      status: "Running",
    },
    {
      id: 7,
      name: "Dashdot",
      domain: "dashdot.local",
      type: "System",
      status: "Running",
    },
  ];

  return data.map((item, index) => (
    <tr
      key={item.id}
      className="h-[65px] border-b hover:bg-gray-100 transition-all group"
    >
      <td className="max-w-[80px] truncate">{index + 1}</td>
      <td className="max-w-[80px] truncate">{item.name}</td>
      <td className="max-w-[80px] truncate">
        <div className="flex justify-center items-center gap-1">
          <a
            href={`https://${item.domain}`}
            className="text-sky-700 hover:text-sky-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.domain}
          </a>
          <ArrowUpRight
            size={16}
            className="text-sky-700 group-hover:text-sky-900"
          />
        </div>
      </td>
      <td className="max-w-[80px] truncate">{item.type}</td>
      <td className="h-[65px] align-middle">
        <div className="relative w-full h-full flex justify-center items-center">
          <i className="bx bxs-circle text-green-600 text-[14px] transition-opacity duration-200 group-hover:opacity-0"></i>
          <span className="absolute text-sm text-green-600 font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {item.status}
          </span>
        </div>
      </td>
    </tr>
  ));
}
