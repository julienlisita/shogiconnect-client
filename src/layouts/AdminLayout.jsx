// src/layouts/AdminLayout.jsx

import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="pageWithSidebar">
        <AdminSidebar/>
        <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
};

export default AdminLayout;