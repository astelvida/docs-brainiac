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
import Link from "next/link"

export default function DocumentCard({ document }: { document: Doc<"documents"> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Link href={`/document/${document._id}`}>
          <Button><EyeOpenIcon className="mr-2 h-4 w-4" />View</Button>
        </Link>
      </CardFooter>
    </Card>

  )
}