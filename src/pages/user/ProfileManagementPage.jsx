import ProfileManagement from "../../components/user/ProfileManagement";
import UserSidebar from "../../components/user/UserSidebar";

const EditProfilePage = () => {
    return (
      <div className="pageWithSidebar">
        <UserSidebar/>
        <ProfileManagement/>
      </div>
    );
  };
  
  export default EditProfilePage;