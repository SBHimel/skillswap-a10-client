"use client";

import React from "react";
import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";
import { Briefcase, DollarSign, User, Calendar, ArrowRight } from "lucide-react";

export default function FeaturedTasks({ tasks }) {
  return (
    <section className="space-y-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <Briefcase className="text-indigo-500 size-6" /> Latest Featured Tasks
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Explore and apply to active micro-tasks posted by verified clients.
          </p>
        </div>
        <Link href="/dashboard/client/tasks">
          <Button variant="light" size="sm" className="font-bold text-indigo-600 dark:text-indigo-400">
            See All Tasks <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card key={task._id} className="p-6 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start gap-2">
                <Chip size="sm" variant="flat" color="indigo" className="font-semibold text-[10px] uppercase">
                  {task.category || "General"}
                </Chip>
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-black text-sm">
                  <DollarSign className="size-4 shrink-0" />
                  <span>{task.budget} USD</span>
                </div>
              </div>

              <h3 className="mt-4 font-bold text-lg text-zinc-900 dark:text-white line-clamp-1">
                {task.title}
              </h3>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-1.5 min-w-0">
                  <User className="size-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate font-medium text-zinc-700 dark:text-zinc-300">{task.clientName || "Client"}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Calendar className="size-3.5 text-zinc-400" />
                  <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : "No Deadline"}</span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center p-8 border border-dashed rounded-2xl text-zinc-400">
            No active tasks found in the database.
          </div>
        )}
      </div>
    </section>
  );
}