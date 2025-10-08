import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Mail, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatDistanceToNow } from "date-fns";

export default function AdminContacts() {
  const { toast } = useToast();
  const { data: contacts, isLoading } = useQuery({
    queryKey: ["/api/contact"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({ title: "Contact message deleted" });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Failed to delete message" });
    },
  });

  if (isLoading) {
    return (
      <AdminLayout title="Contact Messages" description="Manage contact form submissions">
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
    <AdminLayout title="Contact Messages" description={`${contacts?.length || 0} total submissions`}>
      {!contacts || contacts.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No contact messages yet
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact: any) => (
            <Card key={contact.id} data-testid={`card-contact-${contact.id}`}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {contact.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {contact.email}
                    </span>
                    {contact.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {contact.phone}
                      </span>
                    )}
                    <span>{formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(contact.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-${contact.id}`}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
