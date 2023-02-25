import React, { useContext, useState } from "react";
import { DadosContext } from "../context/ContextApp";
import { BiTaskX } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";

export default function TodoBox() {
  const {
    tasks,
    addTask,
    toggleTask,
    removeTask,
    editTask,
    handleNotification,
  } = useContext(DadosContext);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditId, setCurrentEditId] = useState(0);

  const handleRemove = (id: number) => {
    const confirm = window.confirm("tem certeza ?");

    if (confirm) {
      removeTask(id);
      handleNotification("sucess", 5, "Task apagada com sucesso");
    }
  };
  const completedTasks = tasks.filter((task) => task.done).length;

  const handleEdit = (id: number, title: string) => {
    editTask(id, title);
    setCurrentEdit("");
  };
  return (
    <div className="w-full md:max-w-[50%] max-md:max-w-[90%] ">
      <div className="header flex w-full justify-between max-sm:items-center max-sm:gap-6 max-sm:flex-col">
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
      <div className="table w-full min-h-[50vh] border-t border-t-gray-400 mt-6 max-md:mt-0 rounded-lg py-6">
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
                className={`show task w-full min-h-[72px]   border-gray-300 rounded-lg flex p-4 gap-4 text-white items-center  transition-all ${
                  task.done ? "bg-gray-600 opacity-70" : "bg-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  name="checked"
                  id="completed"
                  
                  checked={task.done}
                  onClick={() => {
                    toggleTask(task.id);
                  }}
                />
                {currentEdit.length === 0 ? (
                  <p
                    className={`max-w-lg overflow-hidden taskTitle break-words ${
                      task.done ? "line-through text-gray-300" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                ) : currentEditId === task.id ? (
                  <input
                    value={currentEdit}
                    onChange={(e) => {
                      setCurrentEdit(e.target.value);
                    }}
                    className={`w-full  bg-transparent max-w-lg text-product-blue overflow-hidden taskTitle break-words outline-none `}
                  />
                ) : (
                  <p
                    className={`max-w-lg overflow-hidden taskTitle break-words ${
                      task.done ? "line-through text-gray-300" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                )}
                <div className="span absolute right-0 mr-6 flex justify-center items-center gap-3 ">
                  <span
                    onClick={() => {
                      handleRemove(task.id);
                    }}
                    className=" cursor-pointer text-gray-300 "
                  >
                    <BsTrash />
                  </span>
                  {currentEdit.length === 0 ? (
                    <span
                      onClick={() => {
                        setCurrentEdit(task.title);
                        setCurrentEditId(task.id);
                      }}
                      className="cursor-pointer text-gray-300 "
                    >
                      <AiOutlineEdit />
                    </span>
                  ) : currentEditId === task.id ? (
                    <span
                      onClick={() => {
                        handleEdit(task.id, currentEdit);
                      }}
                      className="cursor-pointer text-green-500 "
                    >
                      <MdDownloadDone />
                    </span>
                  ): <span
                  onClick={() => {
                    setCurrentEdit(task.title);
                    setCurrentEditId(task.id);
                  }}
                  className="cursor-pointer text-gray-300 "
                >
                  <AiOutlineEdit />
                </span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
