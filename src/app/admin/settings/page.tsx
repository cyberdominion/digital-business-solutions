import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground">Configure platform settings and preferences.</p>

      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Platform-wide settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Platform Name</Label>
            <Input defaultValue="Digital Business Infrastructure" />
          </div>
          <div className="space-y-2">
            <Label>Support Email</Label>
            <Input type="email" defaultValue="support@digitalbusinessolutions.online" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Security and access settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Require MFA for Admins</Label>
              <p className="text-sm text-muted-foreground">Force MFA for platform admins</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Password Policy</Label>
              <p className="text-sm text-muted-foreground">Minimum 8 characters</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}