import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../../features/admin/ProtectedRoute/ProtectedRoute";

const AdminLayout: React.FC = () => {
  return (
    <div>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </div>
  );
};

export default AdminLayout;
