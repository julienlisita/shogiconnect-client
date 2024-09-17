import EditProfile from "../../components/user/EditProfile";
import Sidebar from "../../components/user/Sidebar"
import "./AccountHomePage.css"

const EditProfilePage = () => {
    return (
      <div className="homePage">
        <Sidebar/>
        <EditProfile/>
      </div>
    );
  };
  
  export default EditProfilePage;