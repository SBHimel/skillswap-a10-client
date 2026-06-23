"use client";

// অধিকাংশ ক্ষেত্রে এটি HeroUIProvider হয়, যদি এরর দেয় তবে আমরা অন্য নামে ট্রাই করব
// অনেক সময় এটি NextUIProvider নামে থাকে, তবে তোমার এরর যেহেতু HeroUIProvider খুঁজছে না, 
// আমরা সরাসরি ইম্পোর্ট চেক করছি:
import { NextUIProvider } from "@heroui/react";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}