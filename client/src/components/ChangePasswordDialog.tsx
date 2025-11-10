import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

type ChangePasswordDialogProps = {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ChangePasswordDialog({
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ChangePasswordDialogProps) {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = controlledOnOpenChange || setInternalOpen;

  const changePasswordMutation = useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      return await apiRequest("/api/auth/change-password", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your password has been changed successfully",
      });
      setIsOpen(false);
      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to change password",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Validation Error",
        description: "New password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (currentPassword === newPassword) {
      toast({
        title: "Validation Error",
        description: "New password must be different from current password",
        variant: "destructive",
      });
      return;
    }

    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
    });
  };

  const dialogContent = (
    <DialogContent data-testid="dialog-change-password">
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
        <DialogDescription>
          Enter your current password and choose a new one
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
              data-testid="input-current-password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password (min. 6 characters)"
              required
              minLength={6}
              data-testid="input-new-password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              data-testid="input-confirm-password"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={changePasswordMutation.isPending}
            data-testid="button-submit-change-password"
          >
            {changePasswordMutation.isPending ? "Changing..." : "Change Password"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );

  // If trigger is provided, use controlled Dialog with trigger
  if (trigger) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {dialogContent}
      </Dialog>
    );
  }

  // Otherwise, use uncontrolled Dialog (parent controls open state)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {dialogContent}
    </Dialog>
  );
}
