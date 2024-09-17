import AdminSidebar from "../../components/admin/AdminSidebar";
import Dashboard from "../../components/admin/Dashboard";

const DashboardPage = () => {
    return (
      <div className="pageWithSidebar">
        <AdminSidebar/>
        <Dashboard/>
      </div>
    );
  };
  
  export default DashboardPage;