"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
// 🟢 ১. freelancerAPI ইম্পোর্ট করা হলো
import { freelancerAPI } from "@/lib/api"; 
import { Spinner, Card, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { CheckSquare, ExternalLink, Send } from "lucide-react";

export default function ActiveProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deliverableUrl, setDeliverableUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ডাটা লোড করার ফাংশন
  const loadActiveProjects = async () => {
    try {
      setLoading(true);
      const data = await freelancerAPI.getActiveProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Active projects load করতে সমস্যা:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 ২. পেজ মাউন্ট হওয়ার সাথে সাথে ডাটা কল করার জন্য useEffect যোগ করা হলো
  useEffect(() => {
    loadActiveProjects();
  }, []);

  // 🟢 ৩. মোডাল ওপেন করার মিসিং ফাংশনটি যুক্ত করা হলো
  const handleOpenSubmitModal = (task) => {
    setSelectedTask(task);
    setDeliverableUrl("");
    setIsModalOpen(true);
  };

  // ডেলিভারেবল সাবমিট করার ফাংশন
  const handleSubmitDeliverable = async () => {
    if (!deliverableUrl) return alert("Please enter a valid deliverable URL!");
    
    try {
      setSubmitting(true);
      const res = await freelancerAPI.submitDeliverable(selectedTask._id, deliverableUrl);

      if (res.success) {
        alert("Deliverable submitted and project marked as Completed! 🎉");
        setIsModalOpen(false);
        loadActiveProjects(); // রিফ্রেশ
      } else {
        alert(res.msg || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submit করতে সমস্যা হয়েছে:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const inProgressProjects = projects.filter(p => p.status === "In Progress");
const completedProjects = projects.filter(p => p.status === "Completed");

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2">
          <CheckSquare className="size-6 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Active Projects</h1>
        </div>
        <p className="text-sm text-zinc-500 mt-1">Track running contracts and submit milestone links.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Spinner label="Loading projects..." /></div>
      ) : (
        <div className="space-y-8">
          
          {/* ১. ইন-প্রোগ্রেস প্রজেক্ট */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-800 pb-2">In Progress Contracts</h2>
            {inProgressProjects.length === 0 ? (
              <p className="text-zinc-400 text-sm py-4">No active contracts running at the moment.</p>
            ) : (
              inProgressProjects.map((project) => (
                <Card key={project._id} className="p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">{project.title}</h3>
                    <p className="text-xs text-zinc-400">Budget: ${project.budget} | Client: {project.clientEmail}</p>
                  </div>
                  <div>
                    <Button size="sm" className="bg-indigo-600 text-white font-bold rounded-xl" onPress={() => handleOpenSubmitModal(project)}>
                      <Send className="size-4 mr-1" /> Submit Deliverable
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* ২. কমপ্লিটেড প্রজেক্ট */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-800 pb-2">Completed Works</h2>
            {completedProjects.length === 0 ? (
              <p className="text-zinc-400 text-sm py-4">No completed projects found.</p>
            ) : (
              completedProjects.map((project) => (
                <Card key={project._id} className="p-5 bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-zinc-500 line-through dark:text-zinc-400">{project.title}</h3>
                    <p className="text-xs text-zinc-400">Budget: ${project.budget} | Client: {project.clientEmail}</p>
                    {project.deliverable_url && (
                      <a href={project.deliverable_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-500 hover:underline mt-1">
                        <ExternalLink className="size-3" /> View Deliverable Link
                      </a>
                    )}
                  </div>
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      Completed
                    </span>
                  </div>
                </Card>
              ))
            )}
          </div>

        </div>
      )}

      {/* মোডাল */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} placement="center" className="dark:bg-zinc-900 text-zinc-200 p-2">
        <div className="w-full">
          <ModalHeader className="text-xl font-bold">Submit Project Work</ModalHeader>
          <ModalBody className="space-y-3">
            <p className="text-sm text-zinc-400">Submitting deliverable for: <span className="text-indigo-400 font-semibold">{selectedTask?.title}</span></p>
            <Input
              type="url"
              label="Deliverable URL"
              placeholder="https://github.com/... or https://docs.google.com/..."
              variant="bordered"
              value={deliverableUrl}
              onChange={(e) => setDeliverableUrl(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={() => setIsModalOpen(false)} className="rounded-xl">Cancel</Button>
            <Button className="bg-indigo-600 text-white font-medium rounded-xl shadow-md" isLoading={submitting} onPress={handleSubmitDeliverable}>
              Mark as Completed
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
}