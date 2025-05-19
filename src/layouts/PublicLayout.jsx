// src/layouts/PublicLayout.jsx

import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import "./PublicLayout.css"

const PublicLayout = ({ children }) => {
  return (
    <div className="fullscreen-min-height">
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;