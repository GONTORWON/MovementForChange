import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWebsiteContentSchema, type WebsiteContent } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Edit, Globe } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const contentFormSchema = insertWebsiteContentSchema.extend({});

type ContentFormData = z.infer<typeof contentFormSchema>;

export default function AdminContent() {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<WebsiteContent | null>(null);

  // Fetch all website content
  const { data: allContent = [], isLoading } = useQuery<WebsiteContent[]>({
    queryKey: ["/api/admin/content"],
  });

  // Group content by section
  const contentBySection = allContent.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, WebsiteContent[]>);

  const form = useForm<ContentFormData>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      contentKey: "",
      contentValue: "",
      contentType: "text",
      section: "homepage",
      label: "",
      description: "",
    },
  });

  const updateContentMutation = useMutation({
    mutationFn: async (data: { id: string; contentValue: string }) => {
      return await apiRequest(`/api/admin/content/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify({ contentValue: data.contentValue }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      setIsEditDialogOpen(false);
      setSelectedContent(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEditContent = (content: WebsiteContent) => {
    setSelectedContent(content);
    form.reset({
      contentKey: content.contentKey,
      contentValue: content.contentValue,
      contentType: content.contentType,
      section: content.section,
      label: content.label,
      description: content.description || "",
    });
    setIsEditDialogOpen(true);
  };

  const onSubmit = (data: ContentFormData) => {
    if (!selectedContent) return;
    
    updateContentMutation.mutate({
      id: selectedContent.id,
      contentValue: data.contentValue,
    });
  };

  const renderContentCard = (content: WebsiteContent) => (
    <Card key={content.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{content.label}</CardTitle>
            {content.description && (
              <CardDescription className="mt-1">{content.description}</CardDescription>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditContent(content)}
            data-testid={`button-edit-${content.contentKey}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-3 rounded-md">
          <p className="text-sm text-muted-foreground font-mono">
            {content.contentValue.length > 150
              ? content.contentValue.substring(0, 150) + "..."
              : content.contentValue}
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Key: {content.contentKey} | Type: {content.contentType}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Website Content</h1>
            <p className="text-muted-foreground mt-1">Edit website text and content across all pages</p>
          </div>
          <Globe className="h-8 w-8 text-primary" />
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="p-8">
              <p className="text-muted-foreground text-center">Loading content...</p>
            </CardContent>
          </Card>
        ) : allContent.length === 0 ? (
          <Card>
            <CardContent className="p-8">
              <p className="text-muted-foreground text-center">No content found.</p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="homepage" className="space-y-4">
            <TabsList>
              {Object.keys(contentBySection).map((section) => (
                <TabsTrigger key={section} value={section} className="capitalize">
                  {section.replace(/_/g, " ")}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(contentBySection).map(([section, items]) => (
              <TabsContent key={section} value={section} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((content) => renderContentCard(content))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Edit Content Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit {selectedContent?.label}</DialogTitle>
              <DialogDescription>
                {selectedContent?.description || "Update the content below"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="contentValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        {selectedContent?.contentType === "html" ? (
                          <Textarea
                            placeholder="Enter content..."
                            className="min-h-[200px] font-mono"
                            {...field}
                            data-testid="textarea-content-value"
                          />
                        ) : (
                          <Textarea
                            placeholder="Enter content..."
                            className="min-h-[120px]"
                            {...field}
                            data-testid="textarea-content-value"
                          />
                        )}
                      </FormControl>
                      <FormDescription>
                        {selectedContent?.contentType === "html" 
                          ? "You can use HTML tags for formatting" 
                          : "Plain text content"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                    data-testid="button-cancel-edit"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={updateContentMutation.isPending}
                    data-testid="button-submit-edit"
                  >
                    {updateContentMutation.isPending ? "Updating..." : "Update Content"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
