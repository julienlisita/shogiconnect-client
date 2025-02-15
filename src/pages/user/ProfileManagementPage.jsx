import ProfileManagement from "../../components/user/ProfileManagement";
import UserSidebar from "../../components/user/UserSidebar";

const ProfileManagementPage = () => {
    return (
      <div className="pageWithSidebar">
        <UserSidebar/>
        <ProfileManagement/>
      </div>
    );
  };
  
  export default ProfileManagementPage;