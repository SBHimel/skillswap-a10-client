"use client";

import React, { useState, useEffect } from 'react';
import AddTaskModal from '@/components/dashboard/client/AddTaskModal';
import EditTaskModal from '@/components/dashboard/client/EditTaskModal';
import { Card, Chip, Button } from "@heroui/react";
import { Edit2, Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadClientTasks = async () => {
    try {
      const { data: token } = await authClient.token();
      const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      const resTasks = await fetch(`${baseURL}/client-tasks`, {
        headers: { authorization: `Bearer ${token?.token}` }
      });
      const tasksData = await resTasks.json();
      setTasks(Array.isArray(tasksData) ? tasksData : []);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClientTasks();
  }, []);

  const handleTaskUpdatedInState = async (id, updatedData) => {
    try {
      const { data: token } = await authClient.token();
      const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      const res = await fetch(`${baseURL}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? { ...t, ...updatedData } : t))
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const { data: token } = await authClient.token();
      const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      const res = await fetch(`${baseURL}/tasks/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token?.token}` }
      });

      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">My Tasks View</h1>
          <p className="text-sm text-zinc-500 mt-1">View all your posted tasks, live status, and manage updates.</p>
        </div>
        
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-zinc-400 text-sm">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-zinc-400 text-sm text-center py-6">No tasks posted yet.</p>
        ) : (
          tasks.map((task) => (
            <Card key={task._id} className="p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">{task.title}</h3>
                  <Chip size="sm" variant="flat" color={task.status === "open" ? "success" : task.status === "in-progress" ? "warning" : "default"}>
                    {task.status}
                  </Chip>
                </div>
                <p className="text-xs text-zinc-400">Category: {task.category} | Budget: ${task.budget} | Deadline: {task.deadline}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="flat" isDisabled={task.status !== "open"} className="rounded-xl" onPress={() => { setSelectedTask(task); setIsEditOpen(true); }}>
                  <Edit2 className="size-4 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="flat" color="danger" isDisabled={task.status !== "open"} className="rounded-xl" onPress={() => handleDeleteTask(task._id)}>
                  <Trash2 className="size-4 mr-1" /> Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {isEditOpen && selectedTask && (
        <EditTaskModal
          isOpen={isEditOpen}
          onClose={() => { setIsEditOpen(false); setSelectedTask(null); }}
          selectedTask={selectedTask}
          onTaskUpdated={handleTaskUpdatedInState}
        />
      )}
    </div>
  );
}