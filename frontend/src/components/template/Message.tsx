import React, { useEffect, useState } from "react";
import bus from "../../lib/bus";

export default function Message() {
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");
  let [type, setType] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  useEffect(() => {
    const closeButton = document.querySelector(".close");
    if (closeButton !== null) {
      closeButton.addEventListener("click", () => setVisibility(false));
    }
  }, []);

  return (
    visibility && (
      <div
        className={`max-w-full p-4 rounded-md ${
          type === "success"
            ? "text-155724"
            : "text-721c24"
        } ${
          type === "success"
            ? "dark:bg-green-400 bg-green-300 bg-d4edda"
            : "dark:bg-red-500 bg-red-500"
        } shadow-xl border-2 ${
          type === "success" ? "border-c3e6cb" : "border-f5c6cb"
        } transform transition-transform duration-200 hover:scale-105`}
      >
        {message}
      </div>
    )
  );
  
  
}
