'use client'

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import DocumentCard from "./document-card";
import { CreateDocumentButton } from "./create-document-button";

import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}


export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>
      <div className="grid grid-cols-3 gap-8">
        {!documents
          ? <SkeletonCard />
          : documents.map((document) => (
            <DocumentCard key={document._id} document={document} />
          ))
        }
      </div>
    </main>
  )
}