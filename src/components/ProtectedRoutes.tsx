import { IUserRole } from "@/store/user-store";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  userRole: IUserRole[];
  requiredRoles?: IUserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  userRole,
  requiredRoles,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    requiredRoles &&
    userRole.every((role) => !requiredRoles.includes(role))
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
