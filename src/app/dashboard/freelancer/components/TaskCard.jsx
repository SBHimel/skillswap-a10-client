"use client";
import React from 'react';
import { Card, Chip, Button } from "@heroui/react"; 
import { Send, Clock, DollarSign } from "lucide-react";

export default function TaskCard({ task, onApply }) {
  return (
    <Card className="p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">{task.title}</h3>
          <Chip size="sm" variant="flat" color="success" className="capitalize">
            {task.status}
          </Chip>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl line-clamp-2">
          {task.description || "No description provided."}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
          <span className="flex items-center gap-1"><DollarSign className="size-3.5 text-green-500" /> Budget: ${task.budget}</span>
          <span className="flex items-center gap-1"><Clock className="size-3.5 text-amber-500" /> Deadline: {task.deadline}</span>
          <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[11px]">Category: {task.category}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <Button 
          size="sm" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md font-medium"
          onPress={() => onApply(task)}
        >
          <Send className="size-4 mr-1" /> Apply Now
        </Button>
      </div>
    </Card>
  );
}