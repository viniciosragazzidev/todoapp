import React, { useContext, useState } from "react";

import Logo from "../../assets/logo.svg";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TodoBox from "../../components/TodoBox";
import { DadosContext } from "../../context/ContextApp";
import NotificationCard from "../../components/notificationCard";

export default function Home() {
  const { tasks, addTask, toggleTask } = useContext(DadosContext);
  const [currentTask, setCurrentTask] = useState("");
  return (
    <div className="w-full flex flex-col justify-center items-center gap-24 max-md:gap-16 relative overflow-hidden">
      <NotificationCard />
      <header className="flex flex-col justify-center items-center w-full h-52 max-md:h-44 bg-gray-700 relative">
        <img
          src={Logo}
          alt="Logo escrito ToDo"
          className="w-full max-w-[126px]"
        />

        <div className="inputArea flex gap-2 h-14 max-md:h-12 w-full md:max-w-[50%] max-md:max-w-[90%]  absolute bottom-0 translate-y-[50%]">
          <div className="input w-full bg-gray-500 border border-gray-700 rounded-lg">
            <input
              type="text"
              className="w-full h-full text-gray-300 placeholder:text-gray-300 placeholder:text-16 text-16 placeholder:max-md:text-14 max-md:text-14 bg-transparent  pl-4 outline-none "
              placeholder="Adicione uma nova tarefa"
              value={currentTask}
              onChange={(e) => {
                setCurrentTask(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              addTask(currentTask);
              setCurrentTask("");
            }}
            className="h-full w-24 bg-product-blue-dark text-white text-14 font-bold rounded-md flex items-center justify-center gap-2 hover:opacity-90 hover:scale-95 transition-all"
          >
            Criar <AiOutlinePlusCircle />
          </button>
        </div>
      </header>
      <TodoBox />
    </div>
  );
}
