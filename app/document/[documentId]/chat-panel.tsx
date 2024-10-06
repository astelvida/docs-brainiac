'use client'

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useAction } from "convex/react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ChatPanel({ documentId }: { documentId: Id<"documents"> }) {

  const askQuestion = useAction(api.documents.askQuestion)
  const chats = useQuery(api.chats.getChatsForDocument, { documentId });


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
    <main className="bg-gray-900 flex-col gap-2 p-4 ">
      <div className="h-[350px] overflow-y-auto space-y-2 p-4">
        <div className="bg-slate-950 rounded p-2">
          Ask any question using AI
        </div>
        <div>
          {
            chats?.map(chat => (
              <div key={chat._id} className={cn({
                'bg-slate-200': chat.isHuman,
                "text-right": chat.isHuman,
                'bg-slate-300': !chat.isHuman
              }, "rounded p-2")}>
                {`${chat.isHuman ? "You" : 'AI'} : ${chat.text}`}
              </div>
            ))
          }
        </div>

      </div>
      <form onSubmit={sendChat}>
        <Input name="text" placeholder="Type a message" />
        <Button type="submit">Send</Button>
      </form>
    </main >
  )
}              