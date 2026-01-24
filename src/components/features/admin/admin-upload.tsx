"use client";

import React, { useState } from "react";

import { UploadCloud, TriangleAlert } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

export function AdminUpload() {
  const [msg, setMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [containerName, setContainerName] = useState("");
  const [port, setPort] = useState("");
  const [domain, setDomain] = useState("");
  const [newFile, setNewFile] = useState(false);
  const [type, setType] = useState("");

  // --- Validation Functions ---
  const checkFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.files?.[0];
    if (!value) return;

    if (!value.name.endsWith(".zip")) {
      setMsg(".zip File Only");
      setAlertMsg(true);
      setFile(null);
      setFileName("");
      return;
    }

    setMsg("");
    setAlertMsg(false);
    setFileName(value.name);
    setFile(value);
  };

  const checkContainerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789-_";

    if (value.includes(" ")) {
      setMsg("Container Name: Spaces not allowed");
      setAlertMsg(true);
      return;
    }
    if (value !== value.toLowerCase()) {
      setMsg("Container Name: UpperCase not allowed");
      setAlertMsg(true);
      return;
    }
    if (value.length > 50) {
      setMsg("Container Name: Max length 50");
      setAlertMsg(true);
      return;
    }
    for (const ch of value) {
      if (!allowed.includes(ch)) {
        setMsg("Container Name: Special chars not allowed");
        setAlertMsg(true);
        return;
      }
    }
    setMsg("");
    setAlertMsg(false);
    setContainerName(value);
  };

  const checkPort = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const portNum = parseInt(value);

    if (!/^\d*$/.test(value)) {
      setMsg("Port: Only numbers allowed");
      setAlertMsg(true);
      return;
    }
    if (value.length > 5) {
      setMsg("Port: Max length 5");
      setAlertMsg(true);
      return;
    }
    if (portNum < 1 || portNum > 65535) {
      setMsg("Port: Must be 1-65535");
      setAlertMsg(true);
      return;
    }

    setMsg("");
    setAlertMsg(false);
    setPort(value);
  };

  const checkDomain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789-_.";
    if (value.includes(" ")) {
      setMsg("Domain: Spaces not allowed");
      setAlertMsg(true);
      return;
    }
    if (value !== value.toLowerCase()) {
      setMsg("Domain: UpperCase not allowed");
      setAlertMsg(true);
      return;
    }
    if (value.length > 25) {
      setMsg("Domain: Max length 25");
      setAlertMsg(true);
      return;
    }
    for (const ch of value) {
      if (!allowed.includes(ch)) {
        setMsg("Domain: Special chars not allowed");
        setAlertMsg(true);
        return;
      }
    }
    setMsg("");
    setAlertMsg(false);
    setDomain(value);
  };

  const checkType = (value: string) => {
    setType(value);
  };

  // --- Upload Handler ---
  const upload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMsg("Please choose a .zip file");
      setAlertMsg(true);
      return;
    }
    if (!type) {
      setMsg("Please choose project type");
      setAlertMsg(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("container_name", containerName);
    formData.append("port", port);
    formData.append("domain", domain);
    formData.append("type", type);
    formData.append("newfile", newFile ? "set_new_file" : "");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error);
      setAlertMsg(true);
      return;
    }

    // Reset
    setContainerName("");
    setPort("");
    setDomain("");
    setFileName("");
    setType("");
    setNewFile(false);
    setMsg(data.message);
    setAlertMsg(false);

    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <Card className="w-full">
      <CardContent>
        <form className="space-y-6" onSubmit={upload}>
          {/* File Upload */}
          <FileUpload checkFile={checkFile} />

          {/* Container Name & Port */}
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-2">
              <Label>Container Name</Label>
              <Input
                placeholder="App container"
                value={containerName}
                onChange={checkContainerName}
                required
              />
            </div>
            <div className="w-1/3 flex flex-col gap-2">
              <Label>Port</Label>
              <Input
                placeholder="1 - 65535"
                value={port}
                onChange={checkPort}
                required
              />
            </div>
          </div>

          {/* Domain Name & Root Domain */}
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-2">
              <Label>Domain Name</Label>
              <Input
                placeholder="Domain"
                value={domain}
                onChange={checkDomain}
                required
              />
            </div>
            <div className="w-1/3 flex flex-col gap-2">
              <Label>Root Domain (.addp.site)</Label>
              <Input
                value=".addp.site"
                readOnly
                className="cursor-not-allowed bg-gray-50"
              />
            </div>
          </div>

          {/* File Name & Project Type */}
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-2">
              <Label>File Name</Label>
              <Input
                value={fileName}
                readOnly
                className="cursor-not-allowed bg-gray-50"
              />
            </div>
            <div className="w-1/3 flex flex-col gap-2">
              <Label>Project Type</Label>
              <Select onValueChange={checkType} value={type} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML / CSS / JS</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="next.js">Next.js</SelectItem>
                  <SelectItem value="node.js">Node.js</SelectItem>
                  <SelectItem value="laravel">Laravel</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                  <SelectItem value="custom">Custom (Other)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* New Project Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={newFile}
              onCheckedChange={(checked) => setNewFile(checked as boolean)}
            />
            <span>Upload New Project</span>
          </div>

          {/* Alert Message */}
          {msg && (
            <div className="flex items-center gap-2 text-red-500">
              <TriangleAlert />
              {msg}
            </div>
          )}

          {/* Submit Button */}
          <CardFooter className="flex justify-center">
            <Button
              type="submit"
              variant="default"
              className="flex items-center gap-2"
            >
              <UploadCloud />
              Upload & Deploy
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
