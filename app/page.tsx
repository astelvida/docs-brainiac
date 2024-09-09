'use client'

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import Header from "./header";
import DocumentCard from "./document-card";

export default function Home() {
  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments);

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-normal items-center">
          <h1 className="text-4xl font-bold">Documents</h1>
          <Button onClick={() => { createDocument({ title: 'Hey!' }) }}>
            Create Document
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {documents?.map((document) => (
            <DocumentCard key={document._id} document={document} />
          ))}
        </div>
      </main>
    </div >
  )
}