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
    fetch("https://jsonplaceholder.typicode.com/users")
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
              <li key={user.id} onClick={() => handleUserSelection(user)}>
                <img className="img1" src={imgf} alt="" />
                <span>{user.username}</span>
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
          <img className="img2" src={imgf} alt="" />
          <p className="un">@{selectedUser.username}</p>
          <div className="bio">{selectedUser.website}</div>
          <div className="name">
            <p className="title">Full Name</p>
            <div className="con">{selectedUser.name}</div>
          </div>
          <div className="name">
            <p className="title">Phone Number</p>
            <div className="con">{selectedUser.phone}</div>
          </div>
          <div className="name">
            <p className="title">Email</p>
            <div className="con">{selectedUser.email}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
