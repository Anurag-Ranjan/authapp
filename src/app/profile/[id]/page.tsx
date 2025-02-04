import React from "react";

async function UserProfilePage({ params }: any) {
  return (
    <div className="text-center flex flex-col content-center justify-center">
      Profile page with the id<span>{params.id}</span>
    </div>
  );
}

export default UserProfilePage;
