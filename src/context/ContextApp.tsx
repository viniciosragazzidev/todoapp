import { createContext, useState } from "react";

// Define o tipo para o objeto de tarefa
type Task = {
  id: number;
  title: string;
  done: boolean;
};

type Notification = {
  type: string;
  duration: number;
  message: string;
};
// Define o tipo para o contexto
type ContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  handleNotification: (type: string, duration: number, message: string) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
  notification: Notification[];

  showNotification: boolean;
  setShowNotification: (showNotification: boolean) => void;
};

// Cria o contexto
export const DadosContext = createContext<ContextType>({
  tasks: [],
  addTask: () => {},
  handleNotification: () => {},
  toggleTask: () => {},
  removeTask: () => {},
  editTask: () => {},
  notification: [],
  showNotification: false,
  setShowNotification: () => {},
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Cria o estado das tarefas

  const data = localStorage.getItem("tasks");

  const dt = data === null || data.length === 0 ? [] : JSON.parse(data);

  console.log(dt);

  const [tasks, setTasks] = useState<Task[]>(dt);
  const [notification, setNotification] = useState<Notification[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Adiciona uma nova tarefa ao estado
  const addTask = (title: string) => {
    if (title.length > 0) {
      const newTask: Task = {
        id: tasks.length + Math.random(),
        title,
        done: false,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    } else {
      handleNotification("erro", 5, "Você precisa adicionar uma tarefa antes.");
    }
  };

  // Altera o estado de "done" de uma tarefa
  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const removeTask = (id: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    if (filteredTasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify([...filteredTasks]));
    }else{
      localStorage.removeItem('tasks')
    }
  };

  const editTask = (id: number, title: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: title } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    handleNotification("sucess", 5, "Task editada com sucesso!!");
  };

  const handleNotification = (
    type: string,
    duration: number,
    message: string
  ) => {
    setShowNotification(true);
    setNotification([
      {
        type,
        duration,
        message,
      },
    ]);

    setTimeout(() => {
      setShowNotification(false);
      console.log(notification, showNotification);
    }, duration * 1000);
  };
  // Passa o estado e as funções como valor para o contexto
  const contextValue: ContextType = {
    notification,
    tasks,
    addTask,
    toggleTask,
    removeTask,
    editTask,
    handleNotification,
    showNotification,
    setShowNotification,
  };

  // Renderiza o provedor do contexto com o valor definido acima
  return (
    <DadosContext.Provider value={contextValue}>
      {children}
    </DadosContext.Provider>
  );
};

export default ContextProvider;
