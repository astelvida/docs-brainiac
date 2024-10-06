'use client'
import { ModeToggle } from "@/components/mode-toggle";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="z-10 relative dark:bg-slate-900 bg-slate-50 py-4">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={'/'}>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="DocUploader" width={32} height={32} />
            <h1 className="text-2xl font-bold">DocUploader</h1>
          </div>
        </Link>

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