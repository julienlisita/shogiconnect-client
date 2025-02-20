import AdminSidebar from "../../components/admin/AdminSidebar";
import ManageTopics from "../../components/admin/ManageTopics";

const ManageTopicsPage = () => {
    return (
      <div className="pageWithSidebar">
        <AdminSidebar/>
        <ManageTopics/>
      </div>
    );
  };
  
  export default ManageTopicsPage;