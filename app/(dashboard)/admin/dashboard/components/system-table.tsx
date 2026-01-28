"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: {
  id: number;
  name: string;
  dns: string;
  type: string;
  status: string;
}[] = [
  {
    id: 1,
    name: "Portainer",
    dns: "portainer.addp.site",
    type: "System",
    status: "running",
  },
  {
    id: 2,
    name: "Nginx",
    dns: "nginx.addp.site",
    type: "System",
    status: "not running",
  },
  {
    id: 3,
    name: "Technitium",
    dns: "technitium.addp.site",
    type: "System",
    status: "running",
  },
  {
    id: 4,
    name: "PHPmyadmin",
    dns: "phpmyadmin.addp.site",
    type: "System",
    status: "running",
  },
];

export function SystemTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System status</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">No.</TableHead>
              <TableHead>Container name</TableHead>
              <TableHead>DNS</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.dns}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <CardDescription>Showing 1–10 of 42 users</CardDescription>
      </CardFooter>
    </Card>
  );
}
