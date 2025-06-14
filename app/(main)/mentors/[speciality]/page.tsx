import React from "react";

const SpecialityPage = async ({ params }: any) => {
  const { speciality } = await params;

  return <div>Speciality : {speciality}</div>;
};

export default SpecialityPage;
