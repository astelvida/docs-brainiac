import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import { Loader2 } from "lucide-react"
import Link from "next/link"

// TODO AUTOMATIVALLY MAKE A DESCRIPTION when uploading
export default function DocumentCard({ document }: { document: Doc<"documents"> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent>
        <div>
          {!document.description ? (
            <div className="flex">
              <Loader2 className="animate-spin" /> Loading description
            </div>
          ) : (
            document.description
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="flex items-center gap-2">
          <Link href={`/dashboard/documents/${document._id}`}>
            <EyeOpenIcon className="mr-2 h-4 w-4" />View
          </Link>
        </Button>
      </CardFooter>
    </Card>

  )
}