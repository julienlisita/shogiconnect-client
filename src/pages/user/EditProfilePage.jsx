import EditProfile from "../../components/user/EditProfile";
import UserSidebar from "../../components/user/UserSidebar";

const EditProfilePage = () => {
    return (
      <div className="pageWithSidebar">
        <UserSidebar/>
        <EditProfile/>
      </div>
    );
  };
  
  export default EditProfilePage;