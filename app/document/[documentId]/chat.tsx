'use client'

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

export default function Chat() {

  return (
    <main className="bg-slate-200 w-[600px] ">
      <div className="w-[400px] h-[350px] overflow-y-auto p-4">
        <p className="">Message</p>
        <p className="">Message</p>
        <p className="">Message</p>
        <p className="">Message</p>
      </div>
      <Input placeholder="Type a message" />
      <Button type="submit">Send</Button>
    </main >
  )
}              