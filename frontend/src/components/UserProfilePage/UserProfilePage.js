import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { userProfileExists } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  if(!userProfileExists) {
    return <Navigate to="/userprofilecreate" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
    </div>
  );
};

export default UserProfilePage;
