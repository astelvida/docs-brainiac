'use client'

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ChatPanel from "./chat-panel";


export default function DocumentPage({ params: { documentId } }: { params: { documentId: Id<"documents"> } }) {
  const document = useQuery(api.documents.getDocument, { documentId });

  return (
    <main className="w-full space-y-8">
      <div>
        <h1 className="text-4xl">{document?.title}</h1>
      </div>
      <div className="flex gap-12">
        <Tabs defaultValue="document" className="w-full">
          <TabsList>
            <TabsTrigger value="document">document</TabsTrigger>
            <TabsTrigger value="chat">chat</TabsTrigger>
          </TabsList>
          <TabsContent className="bg-slate-100" value="document">
            {document?.documentUrl && (
              <div className="bg-gray-100 p-4 rounded-xl flex-1 h-[500px]">
                <iframe
                  className="w-full h-full"
                  src={document.documentUrl}
                />
              </div>
            )}
          </TabsContent>
          <TabsContent className="bg-slate-100" value="chat">
            <ChatPanel documentId={documentId} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}