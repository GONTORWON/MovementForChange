import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Check, X, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";

export default function AdminTestimonials() {
  const { toast } = useToast();
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/admin/testimonials"],
  });

  const approveMutation = useMutation({
    mutationFn: async ({ id, isApproved }: { id: string; isApproved: boolean }) => {
      await apiRequest('PATCH', `/api/admin/testimonials/${id}/approve`, { isApproved });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({ title: "Testimonial updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      toast({ title: "Testimonial deleted" });
    },
  });

  if (isLoading) {
    return (
      <AdminLayout title="Testimonials" description="Manage testimonials">
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
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Testimonials" description={`${testimonials?.length || 0} total testimonials`}>
      {!testimonials || testimonials.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No testimonials yet
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial: any) => (
            <Card key={testimonial.id} data-testid={`card-testimonial-${testimonial.id}`}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>{testimonial.name}</CardTitle>
                    {testimonial.isApproved ? (
                      <Badge variant="default">Approved</Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{testimonial.role}</p>
                  {testimonial.rating && (
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {!testimonial.isApproved && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => approveMutation.mutate({ id: testimonial.id, isApproved: true })}
                      disabled={approveMutation.isPending}
                      data-testid={`button-approve-${testimonial.id}`}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                  {testimonial.isApproved && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => approveMutation.mutate({ id: testimonial.id, isApproved: false })}
                      disabled={approveMutation.isPending}
                      data-testid={`button-unapprove-${testimonial.id}`}
                    >
                      <X className="h-4 w-4 text-orange-600" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(testimonial.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${testimonial.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
