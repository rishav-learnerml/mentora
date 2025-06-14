import React from "react";

const MainLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return <div className="container mx-auto my-20">{children}</div>;
};

export default MainLayout;
