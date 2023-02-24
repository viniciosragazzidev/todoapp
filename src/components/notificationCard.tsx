import React, { useContext, useEffect, useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";

import { DadosContext } from "../context/ContextApp";
export default function NotificationCard() {
  const { handleNotification, notification, showNotification } =
    useContext(DadosContext);
  useEffect(() => {
    console.log(notification);
  }, [showNotification]);
  return (
    <div
      className={`
  w-full max-w-[260px] h-[100px] m-6 bg-gray-400 fixed top-0 text-center right-0 p-4 z-50 transition-transform flex rounded-md border-2 border-gray-700  justify-center items-center ${
    showNotification ? "translate-x-[0vw]" : "translate-x-[100vw]"
  }`}
    >
      {notification ? (
        <span className="text-sm text-gray-200 font-bold flex justify-center items-center gap-2">
          {notification[0]?.type === "sucess" ? (
            <span className="text-green-500 text-2xl">
              <IoMdDoneAll />
            </span>
          ) : (
            <span className="text-red-500  text-2xl">
              <BiErrorCircle />
            </span>
          )}
          {notification[0]?.message}
        </span>
      ) : null}
    </div>
  );
}
