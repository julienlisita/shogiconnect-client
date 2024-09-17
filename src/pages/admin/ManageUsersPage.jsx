import AdminSidebar from "../../components/admin/AdminSidebar";
import ManageUsers from "../../components/admin/ManageUsers";

const ManageUsersPage = () => {
    return (
      <div className="pageWithSidebar">
        <AdminSidebar/>
        <ManageUsers/>
      </div>
    );
  };
  
  export default ManageUsersPage;