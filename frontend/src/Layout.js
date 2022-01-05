import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      navbar
      <p>{children}</p>
      footer
    </div>
  );
};

export default Layout;
