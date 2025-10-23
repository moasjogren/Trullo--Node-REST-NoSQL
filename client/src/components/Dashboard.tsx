import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";
import CreateTaskContainer from "./createTask";
import { TaskCard } from "./TaskCard";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  // const [users, setUsers] = useState<any[]>([]);

  const fetchAPI = async (endpoint: string) => {
    try {
      const response = await axios.get(`${DB_URL}/${endpoint}`);

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Failed to fetch.", error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const tasksData = await fetchAPI("tasks");
      // const usersData = await fetchAPI("users");

      setTasks(tasksData);
      // setUsers(usersData);
    };
    loadData();
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <div className="mainContent">
        <CreateTaskContainer />
        <div className="taskBoard">
          {["TO_DO", "IN_PROGRESS", "BLOCKED", "DONE"].map((status, index) => (
            <div key={index} className="taskColumn">
              <h3>
                {status
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </h3>
              {tasks.filter((task) => task.status === status).length > 0 ? (
                tasks
                  .filter((task) => task.status === status)
                  .map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <p>No tasks</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
