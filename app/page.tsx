'use client'

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import DocumentCard from "./document-card";
import { CreateDocumentButton } from "./create-document-button";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="container mx-auto px-4 py-8 bg-background">
      <div className="flex justify-normal items-center">
        <h1 className="text-4xl font-bold">Documents</h1>
        <CreateDocumentButton />
      </div>
      <div className="grid grid-cols-4 gap-6">
        {documents?.map((document) => (
          <DocumentCard key={document._id} document={document} />
        ))}
      </div>
    </main>
  )
}