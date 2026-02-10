import { useAuth } from "@/lib/AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "super_admin" | "admin" | "staff";
}

const roleRank: Record<NonNullable<ProtectedRouteProps["requiredRole"]>, number> = {
  staff: 1,
  admin: 2,
  super_admin: 3,
};

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // ✅ super_admin can access everything admin/staff can
  if (requiredRole) {
    const userRole = (user.role ?? "staff") as keyof typeof roleRank;
    if (!roleRank[userRole] || roleRank[userRole] < roleRank[requiredRole]) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground mt-2">
              You don't have permission to access this page
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
