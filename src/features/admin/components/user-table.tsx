"use client";

import React, { useEffect, useRef, useState } from "react";
import { USER_ITEMS } from "@/features/admin/constants/users";
import { UserModal } from "@/features/admin/components/user-modal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Pencil } from "lucide-react";

interface User {
  username: string;
  email: string;
  role: string;
  container: number;
  max_containers: number;
  db: boolean;
  req_db?: boolean;
}

export function UserTable() {
  const [usersTable, setUserstable] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState(false);
  const [container, setContainers] = useState("5");
  const [username, setUsername] = useState("");
  const [userDel, setDelUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [refresh, setRefresh] = useState(false);

  const msgTimer = useRef<NodeJS.Timeout | null>(null);

  const setMessage = (text: string, duration = 2000) => {
    setMsg(text);
    if (msgTimer.current) clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => setMsg(""), duration);
  };

  const openUserModal = (user: User | null) => {
    if (user) {
      setSelectedUser(user);
      setIsOpen(true);
      setIcon(user.db);
      setContainers(user.max_containers.toString());
      setUsername(user.username);
      setDelUsername(user.username);
    } else {
      setSelectedUser(null);
      setIsOpen(false);
    }
  };

  const containerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 1 || numValue > 10) return;
    if (!/^[0-9]+$/.test(value)) return;
    setContainers(value);
  };

  const iconChange = () => setIcon((prev) => !prev);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`);
        if (!res.ok) {
          setUserstable(Array.isArray(USER_ITEMS) ? USER_ITEMS : []);
          return;
        }
        const data: User[] | { users: User[] } = await res.json();
        setUserstable(Array.isArray(data) ? data : data.users);
      } catch (error) {
        console.error(error);
        setUserstable(Array.isArray(USER_ITEMS) ? USER_ITEMS : []);
      }
    };
    fetchUsers();
  }, [refresh]);

  // Edit maximum number of containers
  const changeMaxContainer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/maxcontainer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: username,
        max_containers: container,
        db_mode: icon,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error);
      return;
    }

    setMessage(data.message);
    setRefresh((prev) => !prev);
  };

  // Delete user from database
  const delUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userDel) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/deluser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: userDel }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error);
      return;
    }

    setMessage(data.message);
    setRefresh((prev) => !prev);
    setTimeout(() => openUserModal(null), 50);
  };

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Containers</TableHead>
              <TableHead>Database</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {usersTable.map((user, index) => (
              <TableRow key={user.username} className="hover:bg-gray-50">
                <TableCell>{index + 1}</TableCell>
                <TableCell className="truncate max-w-30">
                  {user.username}
                </TableCell>
                <TableCell className="truncate max-w-37.5">
                  {user.email}
                </TableCell>
                <TableCell className="truncate max-w-25">{user.role}</TableCell>
                <TableCell>
                  {user.container} / {user.max_containers}
                </TableCell>
                <TableCell>
                  {user.db
                    ? "Connected"
                    : user.req_db
                      ? "Request DB"
                      : "Not Connected"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openUserModal(user)}
                  >
                    <Pencil size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {isOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          container={container}
          icon={icon}
          msg={msg}
          onClose={() => openUserModal(null)}
          onContainerChange={containerChange}
          onIconToggle={iconChange}
          onSubmitEdit={changeMaxContainer}
          onDelete={delUser}
        />
      )}
    </Card>
  );
}
