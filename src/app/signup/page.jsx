"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    console.log(user);

    // ডকস অনুযায়ী রোল এবং প্ল্যান সেট করা
const result = await authClient.signUp.email({
  email: user.email,
  password: user.password,
  name: user.name,
  image: user.image,

  role: user.role,
});

console.log(JSON.stringify(result.data.user, null, 2));

    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Surface className="w-full max-w-lg p-8 rounded-3xl">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend>Create Account</Fieldset.Legend>


            <Fieldset.Group className="mt-4">
              <TextField isRequired name="name">
                <Label>Name</Label>
                <Input placeholder="John Doe" variant="secondary" />
                <FieldError />
              </TextField>

              <TextField name="image" type="url">
                <Label>Profile Image URL</Label>
                <Input placeholder="https://example.com/avatar.jpg" variant="secondary" />
              </TextField>

              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Enter your password" variant="secondary" />
                <FieldError />
              </TextField>

              {/* ডকস অনুযায়ী Client এবং Freelancer রোল */}
              <Select isRequired name="role" placeholder="Select one">
                <Label>Signup As</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="client" textValue="client">
                      Client
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="freelancer" textValue="freelancer">
                      Freelancer
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </Fieldset.Group>

            <Fieldset.Actions className="mt-6">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}