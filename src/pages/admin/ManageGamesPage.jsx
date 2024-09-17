import AdminSidebar from "../../components/admin/AdminSidebar";
import ManageGames from "../../components/admin/ManageGames";

const ManageGamesPage = () => {
    return (
      <div className="pageWithSidebar">
        <AdminSidebar/>
        <ManageGames/>
      </div>
    );
  };
  
  export default ManageGamesPage;