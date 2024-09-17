import EditProfile from "../../components/user/EditProfile";
import UserSidebar from "../../components/user/UserSidebar";
import "./AccountHomePage.css"

const EditProfilePage = () => {
    return (
      <div className="homePage">
        <UserSidebar/>
        <EditProfile/>
      </div>
    );
  };
  
  export default EditProfilePage;