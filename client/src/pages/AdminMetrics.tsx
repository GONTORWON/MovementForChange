import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash } from "lucide-react";

export default function AdminMetrics() {
  const { toast } = useToast();
  const [editingMetric, setEditingMetric] = useState<any>(null);
  const [formData, setFormData] = useState({
    metricKey: "",
    metricLabel: "",
    metricValue: 0,
    metricDescription: "",
  });

  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/admin/metrics"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest('POST', '/api/admin/metrics', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/metrics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/metrics"] });
      toast({ title: "Metric created successfully" });
      setFormData({ metricKey: "", metricLabel: "", metricValue: 0, metricDescription: "" });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Failed to create metric" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await apiRequest('PATCH', `/api/admin/metrics/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/metrics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/metrics"] });
      toast({ title: "Metric updated successfully" });
      setEditingMetric(null);
    },
    onError: () => {
      toast({ variant: "destructive", title: "Failed to update metric" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/metrics/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/metrics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/metrics"] });
      toast({ title: "Metric deleted" });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Failed to delete metric" });
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMetric) {
      updateMutation.mutate({ 
        id: editingMetric.id, 
        data: editingMetric 
      });
    }
  };

  const commonMetrics = [
    { metricKey: "children_supported", metricLabel: "Children Supported", metricValue: 0, metricDescription: "Total children supported with educational materials" },
    { metricKey: "communities_reached", metricLabel: "Communities Reached", metricValue: 0, metricDescription: "Number of communities reached across Liberia" },
    { metricKey: "events_held", metricLabel: "Leadership Events", metricValue: 0, metricDescription: "Total workshops and camps held" },
    { metricKey: "volunteers_active", metricLabel: "Active Volunteers", metricValue: 0, metricDescription: "Currently active volunteers" },
  ];

  return (
    <AdminLayout title="Impact Metrics">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Impact Metrics</h2>
          <p className="text-muted-foreground">Manage organization impact statistics</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button data-testid="button-add-metric">
              <Plus className="mr-2 h-4 w-4" /> Add Metric
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-create-metric">
            <DialogHeader>
              <DialogTitle>Create New Metric</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="metricKey">Metric Key *</Label>
                <Input
                  id="metricKey"
                  value={formData.metricKey}
                  onChange={(e) => setFormData({ ...formData, metricKey: e.target.value })}
                  placeholder="e.g., children_supported"
                  required
                  data-testid="input-metric-key"
                />
                <p className="text-xs text-muted-foreground mt-1">Use snake_case format</p>
              </div>
              <div>
                <Label htmlFor="metricLabel">Display Label *</Label>
                <Input
                  id="metricLabel"
                  value={formData.metricLabel}
                  onChange={(e) => setFormData({ ...formData, metricLabel: e.target.value })}
                  placeholder="e.g., Children Supported"
                  required
                  data-testid="input-metric-label"
                />
              </div>
              <div>
                <Label htmlFor="metricValue">Value *</Label>
                <Input
                  id="metricValue"
                  type="number"
                  value={formData.metricValue}
                  onChange={(e) => setFormData({ ...formData, metricValue: parseInt(e.target.value) })}
                  required
                  data-testid="input-metric-value"
                />
              </div>
              <div>
                <Label htmlFor="metricDescription">Description</Label>
                <Input
                  id="metricDescription"
                  value={formData.metricDescription}
                  onChange={(e) => setFormData({ ...formData, metricDescription: e.target.value })}
                  placeholder="Brief description"
                  data-testid="input-metric-description"
                />
              </div>
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-metric">
                {createMutation.isPending ? "Creating..." : "Create Metric"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Setup: Common Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Click to create commonly used impact metrics
            </p>
            <div className="flex flex-wrap gap-2">
              {commonMetrics.map((metric) => (
                <Button
                  key={metric.metricKey}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData(metric);
                  }}
                  data-testid={`button-quick-${metric.metricKey}`}
                >
                  {metric.metricLabel}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {metrics && metrics.length > 0 ? (
            metrics.map((metric: any) => (
              <Card key={metric.id} data-testid={`metric-${metric.metricKey}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">{metric.metricValue}+</h3>
                        <span className="text-sm text-muted-foreground">({metric.metricKey})</span>
                      </div>
                      <p className="font-semibold">{metric.metricLabel}</p>
                      {metric.metricDescription && (
                        <p className="text-sm text-muted-foreground mt-1">{metric.metricDescription}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={editingMetric?.id === metric.id} onOpenChange={(open) => !open && setEditingMetric(null)}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingMetric(metric)}
                            data-testid={`button-edit-${metric.metricKey}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Metric</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                              <Label>Metric Key</Label>
                              <Input value={editingMetric?.metricKey} disabled />
                            </div>
                            <div>
                              <Label htmlFor="edit-label">Display Label *</Label>
                              <Input
                                id="edit-label"
                                value={editingMetric?.metricLabel || ""}
                                onChange={(e) => setEditingMetric({ ...editingMetric, metricLabel: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-value">Value *</Label>
                              <Input
                                id="edit-value"
                                type="number"
                                value={editingMetric?.metricValue || 0}
                                onChange={(e) => setEditingMetric({ ...editingMetric, metricValue: parseInt(e.target.value) })}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-description">Description</Label>
                              <Input
                                id="edit-description"
                                value={editingMetric?.metricDescription || ""}
                                onChange={(e) => setEditingMetric({ ...editingMetric, metricDescription: e.target.value })}
                              />
                            </div>
                            <Button type="submit" disabled={updateMutation.isPending}>
                              {updateMutation.isPending ? "Updating..." : "Update Metric"}
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMutation.mutate(metric.id)}
                        data-testid={`button-delete-${metric.metricKey}`}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No metrics created yet. Add your first metric to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
