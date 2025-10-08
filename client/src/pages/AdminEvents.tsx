import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Edit, Calendar, MapPin, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { RichTextEditor } from "@/components/RichTextEditor";

export default function AdminEvents() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [sharingEventId, setSharingEventId] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    imageUrl: "",
    registrationUrl: "",
    isPublished: true,
  });

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["/api/admin/events"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const url = editingId ? `/api/admin/events/${editingId}` : "/api/admin/events";
      const method = editingId ? 'PATCH' : 'POST';
      await apiRequest(method, url, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/events"] });
      toast({ title: editingId ? "Event updated" : "Event created" });
      setDialogOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/events"] });
      toast({ title: "Event deleted" });
    },
  });

  const shareMutation = useMutation({
    mutationFn: async ({ id, platforms }: { id: string; platforms: string[] }) => {
      return await apiRequest('POST', `/api/admin/social-media/share/event/${id}`, { platforms });
    },
    onSuccess: (data: any) => {
      const results = data.results || [];
      const successCount = results.filter((r: any) => r.success).length;
      const failCount = results.length - successCount;
      
      if (successCount > 0) {
        toast({ 
          title: `Shared to ${successCount} platform${successCount > 1 ? 's' : ''}`,
          description: failCount > 0 ? `${failCount} failed` : undefined
        });
      }
      if (failCount > 0 && successCount === 0) {
        toast({ 
          title: "Sharing failed",
          description: "Check social media settings and API credentials",
          variant: "destructive"
        });
      }
      setShareDialogOpen(false);
      setSharingEventId(null);
      setSelectedPlatforms([]);
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
      imageUrl: "",
      registrationUrl: "",
      isPublished: true,
    });
    setEditingId(null);
  };

  const handleEdit = (event: any) => {
    setFormData({
      title: event.title,
      slug: event.slug,
      description: event.description,
      date: event.date ? new Date(event.date).toISOString().slice(0, 10) : "",
      time: event.time || "",
      location: event.location || "",
      category: event.category || "",
      imageUrl: event.imageUrl || "",
      registrationUrl: event.registrationUrl || "",
      isPublished: event.isPublished,
    });
    setEditingId(event.id);
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    createMutation.mutate({ ...formData, slug });
  };

  return (
    <AdminLayout title="Events" description="Manage events">
      <div className="mb-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} data-testid="button-add-event">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Event" : "Create Event"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  data-testid="input-title"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  data-testid="input-slug"
                />
              </div>
              <div>
                <Label>Description *</Label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(description) => setFormData({ ...formData, description })}
                  placeholder="Describe the event details..."
                />
              </div>
              <div>
                <Label htmlFor="date">Event Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  data-testid="input-date"
                />
              </div>
              <div>
                <Label htmlFor="time">Event Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  data-testid="input-time"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  placeholder="e.g., Workshop, Training, Community Event"
                  data-testid="input-category"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  data-testid="input-location"
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  data-testid="input-imageurl"
                />
              </div>
              <div>
                <Label htmlFor="registrationUrl">Registration URL</Label>
                <Input
                  id="registrationUrl"
                  type="url"
                  value={formData.registrationUrl}
                  onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                  data-testid="input-registrationurl"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.isPublished}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                  data-testid="switch-published"
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit">
                  {createMutation.isPending ? "Saving..." : editingId ? "Update" : "Create"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} data-testid="button-cancel">
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !events || events.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No events yet. Click "Add Event" to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {events.map((event: any) => (
            <Card key={event.id} data-testid={`card-event-${event.id}`}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>{event.title}</CardTitle>
                    {event.isPublished ? (
                      <Badge variant="default">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </div>
                  {event.date && (
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(event.date), 'PPP')} {event.time && `at ${event.time}`}
                    </p>
                  )}
                  {event.location && (
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {event.isPublished && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSharingEventId(event.id);
                        setShareDialogOpen(true);
                      }}
                      data-testid={`button-share-${event.id}`}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(event)}
                    data-testid={`button-edit-${event.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(event.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${event.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent data-testid="dialog-share">
          <DialogHeader>
            <DialogTitle>Share to Social Media</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select platforms to share this event:
            </p>
            <div className="space-y-2">
              {['facebook', 'twitter', 'linkedin'].map(platform => (
                <div key={platform} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`share-${platform}`}
                    checked={selectedPlatforms.includes(platform)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPlatforms([...selectedPlatforms, platform]);
                      } else {
                        setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
                      }
                    }}
                    className="h-4 w-4"
                    data-testid={`checkbox-${platform}`}
                  />
                  <Label htmlFor={`share-${platform}`} className="capitalize">
                    {platform === 'twitter' ? 'X (Twitter)' : platform}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShareDialogOpen(false);
                  setSelectedPlatforms([]);
                }}
                data-testid="button-cancel-share"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (sharingEventId && selectedPlatforms.length > 0) {
                    shareMutation.mutate({ id: sharingEventId, platforms: selectedPlatforms });
                  }
                }}
                disabled={selectedPlatforms.length === 0 || shareMutation.isPending}
                data-testid="button-share-now"
              >
                {shareMutation.isPending ? "Sharing..." : "Share"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
