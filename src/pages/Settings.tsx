import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "@/data/mockData";
import { useTheme, ThemeName } from "@/hooks/useTheme";

const themes: { value: ThemeName; label: string; description: string }[] = [
  { value: "default", label: "Light", description: "Clean light theme" },
  { value: "dark", label: "Dark", description: "Standard dark mode" },
  { value: "brutalist-night", label: "Brutalist Night", description: "Bold brutalist with warm amber accents" },
];

const Settings = () => {
  const navigate = useNavigate();
  const user = mockUsers[0];
  const { theme, setTheme } = useTheme();

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto pb-20 lg:pb-0">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl lg:text-3xl font-display font-bold">Settings</h1>
        </div>

        {/* Theme */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Theme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`w-full text-left p-3 border-2 transition-colors ${
                  theme === t.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.description}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Profile */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="handle">Handle</Label>
              <Input id="handle" defaultValue={`@${user.username}`} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" defaultValue={user.bio || ""} placeholder="Write something about yourself..." />
            </div>
            <Button size="sm" disabled>Save changes</Button>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="••••••••" />
            </div>
            <Button size="sm" disabled>Update account</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Friend takes</p>
                <p className="text-xs text-muted-foreground">Get notified when friends add takes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Replies</p>
                <p className="text-xs text-muted-foreground">Get notified when someone replies to your take</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">New followers</p>
                <p className="text-xs text-muted-foreground">Get notified when someone follows you</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
