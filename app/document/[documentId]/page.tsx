'use client'

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export default function DocumentPage({ params: { documentId } }: { params: { documentId: Id<"documents"> } }) {
  const document = useQuery(api.documents.getDocument, { documentId });

  return (
    <div>
      <div>{document?.title}</div>
      <div>{document?.fileId}</div>
      <div>{document?.documentUrl}</div>
    </div>
  )
}