import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";

export default function Header() {


  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">DocUploader</h1>
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>
        <ModeToggle />
      </div>
    </header>
  )
}