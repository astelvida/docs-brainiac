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




const formSchema = z.object({
  title: z.string().min(2, {
    message: "document must be at least 2 characters.",
  }),
  // document: z.string().min(2, {
  //   message: "document must be at least 2 characters.",
  // }),
})

export function UploadDocumentForm({ onUpload }: { onUpload: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })


  const createDocument = useMutation(api.documents.createDocument);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    await createDocument(values)
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
        {/* <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload</FormLabel>
              <FormControl>
                <Input type="file" placeholder="upload document" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {form.formState.isSubmitting ? <ButtonLoading /> : <Button type="submit">Create Document</Button>}
      </form>
    </Form>
  )
}
