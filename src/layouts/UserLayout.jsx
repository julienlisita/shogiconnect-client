// src/layouts/UserLayout.jsx

import UserSidebar from "../components/user/UserSidebar";

const UserLayout = ({ children }) => {
  return (
    <div className="pageWithSidebar">
        <UserSidebar/>
        <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
};

export default UserLayout;