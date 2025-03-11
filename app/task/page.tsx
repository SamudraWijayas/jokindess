"use client";

import React, { useEffect, useState } from "react";
import { message } from "antd";

interface Task {
  _id: string;
  service: string;
  details: string;
  deadline: string;
  whatsapp: string;
  date: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (data.success) setTasks(data.data);
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setTasks((prev) => prev.filter((task) => task._id !== id));
      message.success("Data berhasil dihapus!");
    } else {
      message.error("Gagal menghapus data!");
    }
  };

  return (
    <div>
      <h2>Daftar Jasa</h2>
      {tasks.map((task) => (
        <div key={task._id} className="border p-2 mt-2">
          <p>
            {task.service} - {task.deadline}
          </p>
          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-500"
          >
            Hapus
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
