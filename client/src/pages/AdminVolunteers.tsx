import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Mail, Phone, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";

export default function AdminVolunteers() {
  const { toast } = useToast();
  const { data: volunteers, isLoading } = useQuery({
    queryKey: ["/api/admin/volunteers"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/volunteers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/volunteers"] });
      toast({ title: "Application deleted" });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Failed to delete application" });
    },
  });

  if (isLoading) {
    return (
      <AdminLayout title="Volunteer Applications" description="Manage volunteer applications">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Volunteer Applications" description={`${volunteers?.length || 0} total applications`}>
      {!volunteers || volunteers.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No volunteer applications yet
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {volunteers.map((app: any) => (
            <Card key={app.id} data-testid={`card-volunteer-${app.id}`}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {app.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {app.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {app.phone}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(app.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-${app.id}`}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Skills & Interests</p>
                  <p className="text-sm text-muted-foreground">{app.skills}</p>
                </div>
                {app.availability && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Availability:</span> {app.availability}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
