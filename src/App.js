import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import "./App.css";
import { Backdrop } from "@material-ui/core";
import imgf from './imgf.png'

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container">
      <div className="list-container">
        {loading ? (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : users.length > 0 ? (
          <ul>
            <li className="tl">
              <span className="ts">USERS LIST</span>
            </li>
            {users.slice().reverse().map((user) => (
              <li key={user.profile.username} onClick={() => handleUserSelection(user)}>
                <img className="img1" src={user.avatar?user.avatar:imgf} alt="" />
                <span>{user.profile.username}</span>
              </li>
            ))}
          </ul>
        ) : (
          <h2>No data to show...</h2>
        )}
      </div>
      {selectedUser && (
        <div className="details-container">
          <div className="tl">
            <p className="ts">USER DETAILS</p>
          </div>
          <img className="img2" src={selectedUser.avatar} alt="" />
          <p className="un">@{selectedUser.profile.username}</p>
          <div className="bio">{selectedUser.Bio}</div>
          <div className="name">
            <p className="title">Full Name</p>
            <div className="con">{selectedUser.profile.firstName + "  " + selectedUser.profile.lastName}</div>
          </div>
          <div className="name">
            <p className="title">Job Title</p>
            <div className="con">{selectedUser.jobTitle}</div>
          </div>
          <div className="name">
            <p className="title">Email</p>
            <div className="con">{selectedUser.profile.email}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
