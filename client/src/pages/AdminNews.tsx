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
import { Trash2, Plus, Edit, Calendar, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { RichTextEditor } from "@/components/RichTextEditor";

export default function AdminNews() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [sharingArticleId, setSharingArticleId] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    imageUrl: "",
    author: "",
    isPublished: true,
  });

  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/admin/news"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const url = editingId ? `/api/admin/news/${editingId}` : "/api/admin/news";
      const method = editingId ? 'PATCH' : 'POST';
      await apiRequest(method, url, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      toast({ title: editingId ? "Article updated" : "Article created" });
      setDialogOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/news/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      toast({ title: "Article deleted" });
    },
  });

  const shareMutation = useMutation({
    mutationFn: async ({ id, platforms }: { id: string; platforms: string[] }) => {
      return await apiRequest('POST', `/api/admin/social-media/share/news/${id}`, { platforms });
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
      setSharingArticleId(null);
      setSelectedPlatforms([]);
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      imageUrl: "",
      author: "",
      isPublished: true,
    });
    setEditingId(null);
  };

  const handleEdit = (article: any) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt || "",
      content: article.content,
      category: article.category || "",
      imageUrl: article.imageUrl || "",
      author: article.author || "",
      isPublished: article.isPublished,
    });
    setEditingId(article.id);
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <AdminLayout title="News & Articles" description="Manage news articles">
      <div className="mb-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} data-testid="button-add-news">
              <Plus className="h-4 w-4 mr-2" />
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Article" : "Create Article"}</DialogTitle>
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
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  placeholder="e.g., Programs, Impact Stories, Announcements"
                  data-testid="input-category"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  data-testid="input-excerpt"
                />
              </div>
              <div>
                <Label>Content *</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Write your article content here..."
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
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  data-testid="input-author"
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
      ) : !articles || articles.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No articles yet. Click "Add Article" to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map((article: any) => (
            <Card key={article.id} data-testid={`card-article-${article.id}`}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>{article.title}</CardTitle>
                    {article.isPublished ? (
                      <Badge variant="default">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </div>
                  {article.author && (
                    <p className="text-sm text-muted-foreground mt-1">By {article.author}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(article.createdAt), 'PPP')}
                  </p>
                </div>
                <div className="flex gap-2">
                  {article.isPublished && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSharingArticleId(article.id);
                        setShareDialogOpen(true);
                      }}
                      data-testid={`button-share-${article.id}`}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(article)}
                    data-testid={`button-edit-${article.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(article.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${article.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {article.excerpt && <p className="text-sm text-muted-foreground">{article.excerpt}</p>}
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
              Select platforms to share this article:
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
                  if (sharingArticleId && selectedPlatforms.length > 0) {
                    shareMutation.mutate({ id: sharingArticleId, platforms: selectedPlatforms });
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
