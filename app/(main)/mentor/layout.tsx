import React from "react";

export const metadata = {
  title: "Mentor Dashboard -  Mentora",
  description:
    "Manage your mentorship sessions, view mentee requests, and track your progress as a mentor.",
};

const MentorLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return <div>{children}</div>;
};

export default MentorLayout;
