import AdminSidebar from "../../components/admin/AdminSidebar";
import ManageComments from "../../components/admin/ManageComments";

const ManageCommentsPage = () => {
    return (
      <div className="pageWithSidebar">
        <AdminSidebar/>
        <ManageComments/>
      </div>
    );
  };
  
  export default ManageCommentsPage;