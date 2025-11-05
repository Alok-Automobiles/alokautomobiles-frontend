import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function CategoryCard({
  title,
  description,
  imageSrc,
  ctaHref,
  ctaLabel = "View range",
}: {
  title: string
  description: string
  imageSrc: string
  ctaHref: string
  ctaLabel?: string
}) {
  return (
    <Card className="h-full flex flex-col">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg">
        <Image
          src={imageSrc}
          alt={`${title} illustration`}
          width={640}
          height={360}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="mt-auto">
          <Button asChild size="sm">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
