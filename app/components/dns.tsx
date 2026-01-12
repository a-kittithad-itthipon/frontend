"use client";

import { TriangleAlert, UploadCloud } from "lucide-react";
import { useState } from "react";

export default function Upload() {
  const [msg, setmsg] = useState("");
  const [alert_msg, setalertmsg] = useState(false);
  const [container_name, setContainername] = useState("");
  const [port, setPort] = useState("");
  const [domain, setDomain] = useState("");
  const check_name = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789-_";

    if (value.includes(" ")) {
      setmsg("Container Name : Space not allowed");
      setalertmsg(true);
      return;
    }
    if (value !== value.toLowerCase()) {
      setmsg("Container Name : UpperCase  not allowed");
      setalertmsg(true);
      return;
    }
    if (value.length > 50) {
      setmsg("Container Name : Maximum length is 50 characters");
      setalertmsg(true);
      return;
    }
    for (const ch of value) {
      console.log(ch);
      console.log(value);
      if (!allowed.includes(ch)) {
        setmsg("Container Name : Special characters not allowed");
        setalertmsg(true);
        return;
      }
    }
    setmsg("");
    setalertmsg(false);
    setContainername(value);
  };
  const check_port = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let port = parseInt(value);
    const allowed = "0123456789";
    for (const num of value) {
      console.log(num);
      console.log(value);
      if (!allowed.includes(num)) {
        setmsg("Port : Character Not Allowed");
        setalertmsg(true);
        return;
      }
    }
    if (value.includes(" ")) {
      setmsg("Port : Space not allowed");
      setalertmsg(true);
      return;
    }
    if (value.length > 5) {
      setmsg("Port : Maximum length is 5 characters");
      setalertmsg(true);
      return;
    }
    if (port < 1 || port > 65535) {
      setmsg("Port : 1 - 65535");
      setalertmsg(true);
      return;
    }
    setmsg("");
    setalertmsg(false);
    setPort(value);
  };
  const check_domain = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789-_.";

    if (value.includes(" ")) {
      setmsg("Domain : Space not allowed");
      setalertmsg(true);
      return;
    }
    if (value !== value.toLowerCase()) {
      setmsg("Domain : UpperCase  not allowed");
      setalertmsg(true);
      return;
    }
    if (value.length > 25) {
      setmsg("Domain : Maximum length is 25 characters");
      setalertmsg(true);
      return;
    }
    for (const ch of value) {
      console.log(ch);
      console.log(value);
      if (!allowed.includes(ch)) {
        setmsg("Container Name : Special characters not allowed");
        setalertmsg(true);
        return;
      }
    }
    setmsg("");
    setalertmsg(false);
    setDomain(value);
  };
  return (
    <main className="flex flex-12 h-full justify-center items-center">
      <div className="w-[90%] h-[90%] border rounded-3xl flex flex-col justify-between items-center">
        <div className="h-[10%] w-full flex justify-center items-center text-2xl font-[600]">
          Add Local DNS
        </div>
        <div className="h-[90%] w-full flex">
          <div className="flex flex-1 justify-between items-center flex-col pt-5">
            <form
              action="#"
              method="post"
              id="file_zip_form"
              className="h-[30%] w-[80%] flex flex-col justify-start items-start gap-4"
            >
              <div className="w-full flex gap-3">
                <div className="w-[65%] flex flex-col">
                  <p>Container Name</p>
                  <input
                    type="text"
                    className="py-5 px-5 text-md border h-[55px] w-full rounded-2xl outline-none"
                    placeholder="Enter container name (App Container)"
                    name="container_name"
                    onChange={check_name}
                    value={container_name}
                    required
                  />
                </div>
                <div className="w-[35%] flex flex-col">
                  <p>Port</p>
                  <input
                    type="text"
                    className="py-5 px-5 text-md border h-[55px] w-full rounded-2xl outline-none"
                    placeholder="Enter port app (1 - 65535)"
                    name="port"
                    onChange={check_port}
                    value={port}
                    required
                  />
                </div>
              </div>
              <div className="w-full flex gap-3">
                <div className="w-[65%] flex flex-col">
                  <p>Domain Name</p>
                  <input
                    type="text"
                    className="py-5 px-5 text-md border h-[55px] w-full rounded-2xl outline-none"
                    placeholder="Domain name"
                    name="domain"
                    onChange={check_domain}
                    value={domain}
                    required
                  />
                </div>
                <div className="w-[35%] flex flex-col">
                  <p>Root Domain (.local)</p>
                  <input
                    type="text"
                    className="py-5 px-5 text-md border h-[55px] w-full rounded-2xl outline-none"
                    placeholder=".local"
                    name="root_domain"
                    readOnly
                    value={".local"}
                  />
                </div>
              </div>
            </form>
            <div className="h-[15%] w-[80%] flex flex-col justify-start items-start gap-3 pt-5">
              <div className="text-md w-full h-[50px] rounded-2xl flex justify-start items-center gap-3 text-red-500">
                {" "}
                <TriangleAlert className={alert_msg ? "" : "hidden"} /> {msg}
              </div>
            </div>
            <div className="h-[20%] w-full flex justify-center items-center">
              <button
                type="submit"
                form="file_zip_form"
                className="w-[30%] h-[60px] bg-sky-500 text-white text-md rounded-full flex justify-center items-center gap-2 hover:bg-sky-700 transition cursor-pointer"
              >
                <i className='bx bx-link-external text-xl'></i>
                Add Local Dns
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
