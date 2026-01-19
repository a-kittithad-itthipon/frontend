"use client";

import React from "react";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface User {
  username: string;
  email: string;
  role: string;
  container: number;
  max_containers: number;
  db: boolean;
  req_db?: boolean;
}

interface UserModalProps {
  user: User;
  container: string;
  icon: boolean;
  msg: string;
  onClose: () => void;
  onContainerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconToggle: () => void;
  onSubmitEdit: (e: React.FormEvent) => void;
  onDelete: (e: React.FormEvent) => void;
}

export const UserModal: React.FC<UserModalProps> = ({
  user,
  container,
  icon,
  msg,
  onClose,
  onContainerChange,
  onIconToggle,
  onSubmitEdit,
  onDelete,
}) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          {msg && <p className="text-sm text-gray-500">{msg}</p>}
        </DialogHeader>

        <div className="flex items-center gap-2 mt-4 mb-4">
          <UserIcon size={36} />
          <span className="font-semibold text-lg">{user.username}</span>
        </div>

        <form id="editForm" className="space-y-4" onSubmit={onSubmitEdit}>
          <div className="space-y-1">
            <Label htmlFor="maxContainers">Max Containers</Label>
            <Input
              id="maxContainers"
              type="text"
              value={container}
              onChange={onContainerChange}
              placeholder="1 - 10 (Number Only)"
            />
          </div>

          <div className="flex justify-between items-center">
            <Label htmlFor="dbSwitch">Use Database</Label>
            <Switch
              id="dbSwitch"
              checked={icon}
              onCheckedChange={onIconToggle}
            />
          </div>
        </form>

        <DialogFooter className="flex justify-between mt-4">
          <Button type="submit" form="editForm" variant="default">
            Edit
          </Button>

          <form onSubmit={onDelete}>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>

          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
