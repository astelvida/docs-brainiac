'use client'

import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";

export default function Home() {
  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>

      <button onClick={() => { createDocument({ title: 'Hey!' }) }}>
        Create Document
      </button>

      <div>
        {documents?.map((document) => (
          <div key={document._id}>
            {document.title}
          </div>
        ))}
      </div>
    </main >
  )
}