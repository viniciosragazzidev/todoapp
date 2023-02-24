import { createContext, useState } from "react";

// Define o tipo para o objeto de tarefa
type Task = {
  id: number;
  title: string;
  done: boolean;
};

// Define o tipo para o contexto
type ContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
};

// Cria o contexto
export const DadosContext = createContext<ContextType>({
  tasks: [],
  addTask: () => {},
  toggleTask: () => {},
  removeTask: () => {},
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Cria o estado das tarefas
  const [tasks, setTasks] = useState<Task[]>([]);

  // Adiciona uma nova tarefa ao estado
  const addTask = (title: string) => {
    if(title.length > 0){
      const newTask: Task = {
        id: tasks.length + 1,
        title,
        done: false,
      };
      setTasks([...tasks, newTask]);
    }else{
      alert('Tarefa vazia!')
    }
  };

  // Altera o estado de "done" de uma tarefa
  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };


  const removeTask = (id: number) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };
  // Passa o estado e as funções como valor para o contexto
  const contextValue: ContextType = {
    tasks,
    addTask,
    toggleTask,
    removeTask,
  };

  // Renderiza o provedor do contexto com o valor definido acima
  return (
    <DadosContext.Provider value={contextValue}>
      {children}
    </DadosContext.Provider>
  );
};

export default ContextProvider;
