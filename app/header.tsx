'use client'
import { ModeToggle } from "@/components/mode-toggle";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="DocUploader" width={32} height={32} />
          <h1 className="text-2xl font-bold">DocUploader</h1>
        </div>

        <div className="flex gap-4">
          <Unauthenticated>
            <SignInButton />
          </Unauthenticated>
          <Authenticated>
            <UserButton />
          </Authenticated>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}