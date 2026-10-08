import { prisma } from "@/lib/db/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, BarChart3 } from "lucide-react"

export default async function AdminCampaignPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = "" } = await searchParams

  const campaigns = await prisma.campaign.findMany({
    include: { applications: true },
    orderBy: { createdAt: "desc" },
  })

  const filteredCampaigns = search
    ? campaigns.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.slug.toLowerCase().includes(search.toLowerCase()),
      )
    : campaigns

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Button>Create New Campaign</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search campaigns..." className="pl-10" name="search" defaultValue={search} />
      </div>

      <div className="grid gap-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{campaign.name}</CardTitle>
                <Badge variant={campaign.status === "ACTIVE" ? "default" : "secondary"}>
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slug:</span>
                <span>{campaign.slug}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span>{campaign.currency} {campaign.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capacity:</span>
                <span>{campaign.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Enrolled:</span>
                <span>{campaign.enrolledCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Applications:</span>
                <span>{campaign.applications.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Date:</span>
                <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
