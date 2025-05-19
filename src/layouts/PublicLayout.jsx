// src/layouts/PublicLayout.jsx

import Header from "../components/public/Header";
import Footer from "../components/public/Footer";

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;