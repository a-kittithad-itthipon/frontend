"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
const contact = () => {
  const [subject, setsubject] = useState("");
  const [content, setcontent] = useState("");
  const mail_subject = (e: React.ChangeEvent<HTMLInputElement>) => {
    let subject = e.target.value;
    setsubject(subject);
  };
  const mail_content = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let content = e.target.value;
    setcontent(content);
  };
  const email = "a.kittithad.ittipon@gmail.com";
  let send =   "https://mail.google.com/mail/?view=cm&fs=1&to="+email+"&su="+encodeURIComponent(subject)+"&body="+encodeURIComponent(content);
  console.log(send);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="h-[calc(100vh-90px)] w-full flex justify-start items-center flex-col">
        <div className="w-[75%] h-[90%] flex justify-start items-center rounded-4xl shadow-lg mt-7 overflow-hidden shadow-gray-100">
          <div className="w-full h-full flex">
            <div className="w-[45%] h-full bg-gray-50">
              <div className="w-full h-full">
                <div className="w-full h-full flex justify-start items-center flex-col">
                  <h1 className="text-5xl font-[900] mt-10 ml-10 leading-tight w-full flex justify-center items-center">
                    Mail to Us
                  </h1>
                  <div
                    className="flex w-[80%] justify-center items-center text-2xl mt-10 font-[600] overflow-hidden rounded-xl border border-gray-400 transition-all duration-300 focus-within:border-gray-900"
                    id="subject"
                  >
                    <span className="w-[10%] h-full flex justify-center items-center px-2 transition-all duration-200 focus-within:text-gray-900">
                      <i className="bx bxl-gmail text-3xl"></i>
                    </span>
                    <input
                      type="text"
                      className="outline-none rounded-lg p-5 w-[90%] text-[17px] font-[400]"
                      placeholder="Subject"
                      onChange={mail_subject}
                    />
                  </div>
                  <div
                    className="flex w-[80%] justify-center items-center text-2xl mt-10 font-[600] overflow-hidden rounded-xl border border-gray-400 transition-all duration-300 focus-within:border-gray-900"
                    id="content"
                  >
                    <span className="w-[10%] h-full flex justify-center items-start pt-5 px-2 transition-all duration-200">
                      <i className="bx bxs-conversation text-3xl"></i>
                    </span>
                    <textarea
                      className="outline-none rounded-lg p-5 w-[90%] h-[250px] text-[17px] font-[400]"
                      placeholder="Content"
                      onChange={mail_content}
                    />
                  </div>
                  <div className="w-full h-auto flex justify-center items-center">
                    <a
                      href={send}
                      className="mt-10 w-[80%] h-[50px] flex justify-center items-center p-2 rounded-full text-lg font-[600] text-white bg-gray-900 border border-gray-900 hover:text-gray-800 hover:bg-gray-50 hover:border hover:border-gray-400 transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[55%] h-full bg-img-logo bg-cover bg-start"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default contact;
