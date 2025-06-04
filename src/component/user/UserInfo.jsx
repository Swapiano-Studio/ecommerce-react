import defaultProfile from '../../assets/profile.png';
import EditProfileModal from './EditProfileModal';
import React, { useState } from 'react';
import api from '../../api'; // Adjust the import based on your project structure

const UserInfo = ({ userInfo, setUserInfo }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleUpdateSuccess = async () => {
    try {
      const { data } = await api.get("user_info");
      setUserInfo(data);
    } catch (err) {
      // Optionally handle error
    }
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-12 col-md-3">
          <div className="card text-center h-100 p-3">
            <img
              src={defaultProfile}
              alt="User Profile"
              className="img-fluid rounded-circle mb-3 mx-auto"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <h6>{userInfo.username}</h6>
            <button
              className="btn mt-2 btn-primary w-100"
              onClick={() => setShowEdit(true)}
            >
              Edit Profile
            </button>
            {showEdit && (
              <EditProfileModal
                show={showEdit}
                onHide={() => setShowEdit(false)}
                userInfo={userInfo}
                onSuccess={handleUpdateSuccess}
              />
            )}
          </div>
        </div>

        <div className="col-12 col-md-9">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Account Overview</h5>
            </div>
            <div className="card-body">
              <div className="row row-cols-1 row-cols-md-2">
                <div className="col mb-3">
                  <p>
                    <strong>Full Name:</strong> {userInfo.first_name}{' '}
                    {userInfo.last_name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userInfo.phone_number}
                  </p>
                  <p>
                    <strong>Email:</strong> {userInfo.email}
                  </p>
                </div>
                <div className="col mb-3">
                  <p>
                    <strong>City:</strong> {userInfo.city}
                  </p>
                  <p>
                    <strong>Country:</strong> {userInfo.state}
                  </p>
                  <p>
                    <strong>Address:</strong> {userInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
