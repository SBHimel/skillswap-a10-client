"use client";

import { addTask } from "@/lib/api/task"; // API ফাংশনের নাম পরিবর্তন
import { imageUpload } from "@/lib/imgUpload";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export default function AddTaskModal() {

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let imageUrl = "";
    if (data.image && data.image.name) {
      const image = await imageUpload(data.image);
      imageUrl = image.url;
    }

    const task = {
      title: data.title,
      description: data.description,
      budget: Number(data.budget), // বাজেট নাম্বার আকারে যাবে
      image: imageUrl,
      status: "pending" // ডিফল্ট স্ট্যাটাস পেন্ডিং থাকবে
    };

    const result = await addTask(task);
    console.log("Task Added Result:", result);
  };

  return (
    <Modal>
      <Button variant="secondary">Post a New Task</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Post a Task</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  
                  <TextField className="w-full" name="title" type="text" variant="secondary" isRequired>
                    <Label>Task Title</Label>
                    <Input placeholder="e.g., Build a React Website" />
                  </TextField>

                  <TextField className="w-full" name="description" type="text" variant="secondary" isRequired>
                    <Label>Task Description</Label>
                    <Input placeholder="Describe your project requirements..." />
                  </TextField>

                  {/* Price বদলে Budget করা হয়েছে */}
                  <TextField className="w-full" name="budget" type="number" variant="secondary" isRequired>
                    <Label>Budget ($)</Label>
                    <Input placeholder="Enter your budget" />
                  </TextField>

                  <TextField className="w-full" type="file" variant="secondary">
                    <Label>Project Sample Image (Optional)</Label>
                    <input name="image" type="file" />
                  </TextField>

                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" slot="close">Post Task</Button>
                  </Modal.Footer>

                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}