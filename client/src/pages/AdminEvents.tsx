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
import { Trash2, Plus, Edit, Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AdminEvents() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    eventDate: "",
    location: "",
    imageUrl: "",
    registrationUrl: "",
    isPublished: true,
  });

  const { data: events, isLoading } = useQuery({
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

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      eventDate: "",
      location: "",
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
      eventDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 16) : "",
      location: event.location || "",
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
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={5}
                  data-testid="input-description"
                />
              </div>
              <div>
                <Label htmlFor="eventDate">Event Date & Time *</Label>
                <Input
                  id="eventDate"
                  type="datetime-local"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  required
                  data-testid="input-eventdate"
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
                  {event.eventDate && (
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(event.eventDate), 'PPP p')}
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
    </AdminLayout>
  );
}
