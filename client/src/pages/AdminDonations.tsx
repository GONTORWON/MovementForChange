import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AdminLayout from "@/components/AdminLayout";
import { DollarSign, Calendar } from "lucide-react";

export default function AdminDonations() {
  const { data: donations = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/donations"],
  });

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      succeeded: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeColors: Record<string, string> = {
      general: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      sponsor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[type] || 'bg-gray-100 text-gray-800'}`}>
        {type === 'sponsor' ? 'Child Sponsorship' : 'General'}
      </span>
    );
  };

  const totalAmount = donations?.reduce((sum: number, d: any) => 
    d.status === 'succeeded' ? sum + d.amount : sum, 0) || 0;

  const successfulDonations = donations?.filter((d: any) => d.status === 'succeeded').length || 0;

  return (
    <AdminLayout 
      title="Donation Management" 
      description="View and track all donation transactions"
    >
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalAmount, 'usd')}</div>
              <p className="text-xs text-muted-foreground">{successfulDonations} successful transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donations?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Total donation records</p>
            </CardContent>
          </Card>
        </div>

        {/* Donations Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Donations</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : !donations || donations.length === 0 ? (
              <div className="text-center py-12" data-testid="no-donations">
                <DollarSign className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No donations found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation: any) => (
                      <TableRow key={donation.id} data-testid={`donation-${donation.id}`}>
                        <TableCell className="text-sm">
                          {formatDate(donation.createdAt)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">{donation.donorName || 'Anonymous'}</div>
                            <div className="text-muted-foreground">{donation.donorEmail || 'No email'}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(donation.amount, donation.currency)}
                        </TableCell>
                        <TableCell>
                          {getTypeBadge(donation.type)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(donation.status)}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">
                          {donation.paymentIntentId?.substring(0, 20)}...
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
