'use client'

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useAction } from "convex/react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuestionForm } from "./question-form";
import { useEffect, useRef } from "react";

export default function ChatPanel({ documentId }: { documentId: Id<"documents"> }) {
  const chats = useQuery(api.chats.getChatsForDocument, { documentId });


  // automatically scroll to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);


  return (
    <main className="dark:bg-gray-900 bg-slate-100 flex flex-col gap-2 p-6 rounded-xl">
      <div className="dark:bg-slate-950 rounded p-3">
        Ask any question using AI
      </div>
      <div className="h-[350px] overflow-y-auto space-y-3">
        {
          chats?.map(chat => (
            <div key={chat._id} className={cn({
              'bg-slate-200': chat.isHuman,
              "text-right": chat.isHuman,
              'bg-slate-300': !chat.isHuman,
              'flex-row-reverse': chat.isHuman
            }, "flex items-center rounded-md p-4 whitespace-pre-line gap-3")}>
              <div className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center focus:outline-none shadow-lg flex-shrink-0">
                <div className="text-white font-bold text-lg">
                  {`${chat.isHuman ? "You" : 'AI'}`}
                </div>
              </div>
              <span>{chat.text}</span>
            </div>
          ))
        }
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-1">
        <QuestionForm documentId={documentId} />
      </div>
    </main>
  )
}              