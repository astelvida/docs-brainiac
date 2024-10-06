'use client'

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useAction } from "convex/react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

export default function Chat({ documentId }: { documentId: Id<"documents"> }) {

  const askQuestion = useAction(api.documents.askQuestion)

  const sendChat = async (event) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const question = formData.get("text") as string
    console.log(question, documentId)
    const response = await askQuestion({ question, documentId })
    console.log(response)
  }

  return (
    <main className="bg-slate-200 w-[600px] ">
      <div className="w-[400px] h-[350px] overflow-y-auto p-4">
        <p className="">Message</p>
        <p className="">Message</p>
        <p className="">Message</p>
        <p className="">Message</p>
        <p></p>
      </div>
      <form onSubmit={sendChat}>
        <Input name="text" placeholder="Type a message" />
        <Button type="submit">Send</Button>
      </form>
    </main >
  )
}              