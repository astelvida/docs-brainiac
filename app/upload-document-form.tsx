"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { ButtonLoading } from "@/components/ButtonLoading"
import { LoadingButton } from "@/components/loading-button"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "document must be at least 2 characters.",
  }),
  file: z.instanceof(File).refine((file) => file.size < 1000000)
})

export function UploadDocumentForm({ onUpload }: { onUpload: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const createDocument = useMutation(api.documents.createDocument);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": values.file!.type },
      body: values.file,
    });
    const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    // await sendImage({ storageId, author: name });
    await createDocument({ title: values.title, fileId: storageId });
    onUpload()
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Doc title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Upload</FormLabel>
              <FormControl>
                <Input type="file" placeholder="upload document" {...fieldProps} onChange={(e) => {
                  const file = e.target.files?.[0]
                  onChange(file)
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loadingText="Uploading" isLoading={form.formState.isSubmitting}>Create Document</LoadingButton>
      </form>
    </Form>
  )
}
