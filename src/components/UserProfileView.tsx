import React from 'react';

interface Props {
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

const UserProfileView: React.FC<Props> = ({ user }) => {
  return (
    <>
      <div>
        <div className="profile-label">Name</div>
        <div className="profile-value">{user.name}</div>
      </div>
      <div>
        <div className="profile-label">Email</div>
        <div className="profile-value">{user.email}</div>
      </div>
      <div>
        <div className="profile-label">Phone</div>
        <div className="profile-value">{user.phone}</div>
      </div>
    </>
  );
};

export default UserProfileView;
