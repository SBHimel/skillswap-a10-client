"use client";
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, TextArea } from "@heroui/react"; 

export default function ProposalModal({ 
  isOpen, 
  onClose, 
  taskTitle, 
  bidBudget, 
  setBidBudget, 
  duration, 
  setDuration, 
  message, 
  setMessage, 
  submitting, 
  onSubmit 
}) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      placement="center" 
      className="dark:bg-zinc-900 text-zinc-200 p-2"
    >
      <div className="w-full">
        <ModalHeader className="flex flex-col gap-1 text-xl font-bold">Submit Your Proposal</ModalHeader>
        <ModalBody className="space-y-4">
          <p className="text-sm text-zinc-400">Applying for: <span className="text-indigo-400 font-semibold">{taskTitle}</span></p>
          
          <Input
            type="number"
            label="Your Bid Amount ($)"
            placeholder="Enter your budget"
            variant="bordered"
            value={bidBudget}
            onChange={(e) => setBidBudget(e.target.value)}
          />
          
          <Input
            type="number"
            label="Estimated Duration (Days)"
            placeholder="How many days will it take?"
            variant="bordered"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          
          <TextArea
            label="Cover Letter / Message"
            placeholder="Describe your experience..."
            variant="bordered"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button 
            className="bg-indigo-600 text-white font-medium rounded-xl shadow-md" 
            isLoading={submitting} 
            onPress={onSubmit}
          >
            Submit Proposal
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
}