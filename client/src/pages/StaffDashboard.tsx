import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, AlertCircle, CheckCircle2, ListTodo, LogOut, Lock } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChangePasswordDialog } from "@/components/ChangePasswordDialog";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedToId: string;
  assignedToName: string;
  createdById: string;
  createdByName: string;
  dueDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function StaffDashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState<string>("");
  const [taskNotes, setTaskNotes] = useState<string>("");

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["/api/staff/tasks"],
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (data: { taskId: string; status?: string; notes?: string }) => {
      return await apiRequest(`/api/staff/tasks/${data.taskId}`, "PATCH", {
        status: data.status,
        notes: data.notes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff/tasks"] });
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
      setIsDetailDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update task",
        variant: "destructive",
      });
    },
  });

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setTaskStatus(task.status);
    setTaskNotes(task.notes || "");
    setIsDetailDialogOpen(true);
  };

  const handleUpdateTask = () => {
    if (!selectedTask) return;

    const updateData: { taskId: string; status?: string; notes?: string } = {
      taskId: selectedTask.id,
    };

    if (taskStatus !== selectedTask.status) {
      updateData.status = taskStatus;
    }
    if (taskNotes !== (selectedTask.notes || "")) {
      updateData.notes = taskNotes;
    }

    updateTaskMutation.mutate(updateData);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getStatusBadge = (status: Task["status"]) => {
    const variants: Record<Task["status"], string> = {
      pending: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
      "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    };
    return <Badge className={variants[status]} data-testid={`badge-status-${status}`}>{status.replace("-", " ")}</Badge>;
  };

  const getPriorityBadge = (priority: Task["priority"]) => {
    const variants: Record<Task["priority"], string> = {
      low: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
      high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
      urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    };
    return <Badge className={variants[priority]} data-testid={`badge-priority-${priority}`}>{priority}</Badge>;
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ListTodo className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground" data-testid="text-dashboard-title">My Tasks</h1>
                <p className="text-sm text-muted-foreground" data-testid="text-user-name">Welcome, {user?.fullName || user?.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChangePasswordDialog
                trigger={
                  <Button variant="outline" size="sm" data-testid="button-change-password">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                }
              />
              <Button variant="outline" size="sm" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card data-testid="card-total-tasks">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-tasks">{tasks.length}</div>
            </CardContent>
          </Card>
          <Card data-testid="card-pending-tasks">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600" data-testid="text-pending-tasks">{pendingTasks.length}</div>
            </CardContent>
          </Card>
          <Card data-testid="card-in-progress-tasks">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600" data-testid="text-in-progress-tasks">{inProgressTasks.length}</div>
            </CardContent>
          </Card>
          <Card data-testid="card-completed-tasks">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600" data-testid="text-completed-tasks">{completedTasks.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle data-testid="text-assigned-tasks-title">Assigned Tasks</CardTitle>
            <CardDescription>View and update your assigned tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground" data-testid="text-no-tasks">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No tasks assigned to you yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => handleViewTask(task)}
                    data-testid={`card-task-${task.id}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1" data-testid={`text-task-title-${task.id}`}>{task.title}</h3>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mb-2" data-testid={`text-task-description-${task.id}`}>
                            {task.description.length > 150 
                              ? task.description.substring(0, 150) + "..." 
                              : task.description}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span data-testid={`text-task-created-${task.id}`}>
                          Created: {format(new Date(task.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span data-testid={`text-task-due-${task.id}`}>
                            Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span data-testid={`text-task-creator-${task.id}`}>By: {task.createdByName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Task Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl" data-testid="dialog-task-detail">
          <DialogHeader>
            <DialogTitle data-testid="text-dialog-task-title">{selectedTask?.title}</DialogTitle>
            <DialogDescription>Update task status and add notes</DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground mt-1" data-testid="text-dialog-task-description">
                  {selectedTask.description || "No description provided"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <div className="mt-1">{getPriorityBadge(selectedTask.priority)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Due Date</Label>
                  <p className="text-sm text-muted-foreground mt-1" data-testid="text-dialog-task-due">
                    {selectedTask.dueDate 
                      ? format(new Date(selectedTask.dueDate), "MMMM d, yyyy") 
                      : "No due date"}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Created By</Label>
                <p className="text-sm text-muted-foreground mt-1" data-testid="text-dialog-task-creator">
                  {selectedTask.createdByName} on {format(new Date(selectedTask.createdAt), "MMMM d, yyyy")}
                </p>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={taskStatus} onValueChange={setTaskStatus}>
                  <SelectTrigger id="status" data-testid="select-task-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  placeholder="Add notes about this task..."
                  rows={4}
                  data-testid="textarea-task-notes"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateTask} 
              disabled={updateTaskMutation.isPending}
              data-testid="button-update-task"
            >
              {updateTaskMutation.isPending ? "Updating..." : "Update Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
