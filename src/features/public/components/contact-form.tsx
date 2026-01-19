"use client";

import { useState } from "react";

export function ContactForm() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const email = "a.kittithad.ittipon@gmail.com";

  const sendLink =
    "https://mail.google.com/mail/?view=cm&fs=1&to=" +
    email +
    "&su=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(content);

  return (
    <main className="flex justify-center items-center min-h-[calc(100vh-90px)] px-4 md:px-12">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-3xl shadow-lg overflow-hidden">
        {/* Left Form */}
        <div className="md:w-1/2 bg-card p-8 md:p-12 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-black text-foreground text-center">
            Mail to Us
          </h1>
          <p className="text-muted-foreground text-center">
            Send us a message and we’ll get back to you as soon as possible.
          </p>

          {/* Subject Input */}
          <div className="flex items-center border border-border rounded-xl p-2 focus-within:border-primary transition">
            <span className="text-foreground px-2">
              <i className="bx bxl-gmail text-3xl"></i>
            </span>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 outline-none p-3 text-foreground bg-card text-base rounded-lg"
            />
          </div>

          {/* Content Textarea */}
          <div className="flex items-start border border-border rounded-xl p-2 focus-within:border-primary transition">
            <span className="text-foreground px-2 pt-2">
              <i className="bx bxs-conversation text-3xl"></i>
            </span>
            <textarea
              placeholder="Message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 outline-none p-3 text-foreground bg-card text-base rounded-lg h-40 resize-none"
            />
          </div>

          {/* Send Button */}
          <a
            href={sendLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-foreground rounded-full text-center hover:text-foreground hover:bg-card border border-foreground transition"
          >
            Send Message
          </a>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 hidden md:block bg-[url(/img/w08.jpg)] bg-cover bg-center" />
      </div>
    </main>
  );
}
