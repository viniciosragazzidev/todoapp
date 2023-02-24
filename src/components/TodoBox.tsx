import React, { useContext, useState } from "react";
import { DadosContext } from "../context/ContextApp";
import { BiTaskX } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

export default function TodoBox() {
  const { tasks, addTask, toggleTask, removeTask } = useContext(DadosContext);
  const [currentTast, setCurrentTask] = useState("");
  console.log(tasks);
  const handleRemove = (id: number) => {
    const confirm = window.confirm("tem certeza ?");

    if (confirm) {
      removeTask(id);
    }
  };
  const completedTasks = tasks.filter((task) => task.done).length;

  return (
    <div className="w-full md:max-w-[50%] max-md:max-w-[90%] ">
      <div className="header flex w-full justify-between">
        <span className="text-14 text-product-blue font-bold flex items-center gap-4">
          Tarefas criadas{" "}
          <span className="text-white text-12 px-3 py-1 rounded-full bg-gray-400">
            {tasks.length}
          </span>
        </span>
        <span className="text-14 text-product-purple font-bold flex items-center gap-4">
          Concluidas
          <span className="text-white text-12 px-3 py-1 rounded-full bg-gray-400">
            {completedTasks} de {tasks.length}
          </span>
        </span>
      </div>
      <div className="table w-full min-h-[50vh] border-t border-t-gray-400 mt-6 rounded-lg py-6">
        {tasks.length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-16 text-center">
            <span className="text-6xl mb-4">
              <BiTaskX className="text-gray-300 " />
            </span>
            <span className="text-gray-300 text-16 font-bold ">
              Você ainda não tem tarefas cadastradas
            </span>
            <span className="text-gray-300 text-16 font-normal ">
              Crie tarefas e organize seus itens a fazer{" "}
            </span>
          </div>
        ) : (
          <div className="tasks w-full flex flex-col gap-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`show task w-full min-h-[72px]  border-gray-300 rounded-lg flex p-4 gap-4 text-white items-center  transition-all ${
                  task.done ? "bg-gray-600 opacity-70" : "bg-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  name="checked"
                  id="completed"
                  onClick={() => {
                    toggleTask(task.id);
                  }}
                />
                <p
                  className={`max-w-[80%] taskTitle ${
                    task.done ? "line-through text-gray-300" : ""
                  }`}
                >
                  {task.title}
                </p>
                <span
                  onClick={() => {
                    handleRemove(task.id);
                  }}
                  className="ml-6 cursor-pointer text-gray-300"
                >
                  <BsTrash />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
