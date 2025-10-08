import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Facebook, Twitter, Linkedin, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminSocialMedia() {
  const { toast } = useToast();

  const { data: settings = [] } = useQuery({
    queryKey: ["/api/admin/social-media/settings"],
  });

  const updateSettingMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest('POST', "/api/admin/social-media/settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/social-media/settings"] });
      toast({ title: "Settings updated successfully" });
    },
  });

  const platforms = [
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'text-blue-600',
      envVars: ['FACEBOOK_PAGE_ID', 'FACEBOOK_ACCESS_TOKEN'],
      setupUrl: 'https://developers.facebook.com/docs/pages-api'
    },
    { 
      id: 'twitter', 
      name: 'X (Twitter)', 
      icon: Twitter, 
      color: 'text-black dark:text-white',
      envVars: ['TWITTER_ACCESS_TOKEN'],
      setupUrl: 'https://developer.x.com'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: Linkedin, 
      color: 'text-blue-700',
      envVars: ['LINKEDIN_ORGANIZATION_ID', 'LINKEDIN_ACCESS_TOKEN'],
      setupUrl: 'https://developer.linkedin.com'
    },
  ];

  const getSetting = (platform: string) => {
    return settings.find((s: any) => s.platform === platform) || {
      platform,
      isEnabled: false,
      autoPostNews: false,
      autoPostEvents: false,
      accountName: '',
    };
  };

  const handleToggle = async (platform: string, field: string, value: boolean) => {
    const currentSetting = getSetting(platform);
    updateSettingMutation.mutate({
      ...currentSetting,
      [field]: value,
    });
  };

  const handleAccountNameUpdate = async (platform: string, accountName: string) => {
    const currentSetting = getSetting(platform);
    updateSettingMutation.mutate({
      ...currentSetting,
      accountName,
    });
  };

  return (
    <AdminLayout title="Social Media Integration" description="Configure automatic posting to social media">
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          To enable social media posting, you need to set up API credentials as environment secrets in Replit. 
          Click "Setup Instructions" for each platform to learn how to get your credentials.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {platforms.map((platform) => {
          const setting = getSetting(platform.id);
          const Icon = platform.icon;

          return (
            <Card key={platform.id} data-testid={`card-${platform.id}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${platform.color}`} />
                    <div>
                      <CardTitle>{platform.name}</CardTitle>
                      <CardDescription>
                        {setting.accountName || 'Not configured'}
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(platform.setupUrl, '_blank')}
                    data-testid={`button-setup-${platform.id}`}
                  >
                    Setup Instructions
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`account-${platform.id}`}>Account Name (Optional)</Label>
                  <Input
                    id={`account-${platform.id}`}
                    value={setting.accountName || ''}
                    onChange={(e) => handleAccountNameUpdate(platform.id, e.target.value)}
                    placeholder={`Your ${platform.name} account name`}
                    data-testid={`input-account-${platform.id}`}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Required secrets: {platform.envVars.join(', ')}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Platform</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow posting to {platform.name}
                    </p>
                  </div>
                  <Switch
                    checked={setting.isEnabled}
                    onCheckedChange={(checked) => handleToggle(platform.id, 'isEnabled', checked)}
                    data-testid={`switch-enable-${platform.id}`}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-post News</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically share when news is published
                    </p>
                  </div>
                  <Switch
                    checked={setting.autoPostNews}
                    onCheckedChange={(checked) => handleToggle(platform.id, 'autoPostNews', checked)}
                    disabled={!setting.isEnabled}
                    data-testid={`switch-auto-news-${platform.id}`}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-post Events</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically share when events are published
                    </p>
                  </div>
                  <Switch
                    checked={setting.autoPostEvents}
                    onCheckedChange={(checked) => handleToggle(platform.id, 'autoPostEvents', checked)}
                    disabled={!setting.isEnabled}
                    data-testid={`switch-auto-events-${platform.id}`}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AdminLayout>
  );
}
