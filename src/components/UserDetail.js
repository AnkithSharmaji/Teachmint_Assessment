import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserDetail.css'; // Import the stylesheet

const UserDetail = ({ match }) => {
  const userId = match.params.id;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [clock, setClock] = useState(new Date());
  const [isClockPaused, setIsClockPaused] = useState(false);

  useEffect(() => {
    // Fetch user details
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch user posts
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching user posts:', error));

    // Clock interval
    const intervalId = setInterval(() => {
      if (!isClockPaused) {
        setClock(new Date());
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId, isClockPaused]);

  return (
    <div className="user-detail-container">
      {/* Centered Name and Clock */}
      <div className="centered-container">
        <h2>{user.name}</h2>

        {/* Clock and Pause/Start button */}
        <div>
          <h3>Clock</h3>
          <p>{clock.toLocaleTimeString()}</p>
          <button onClick={() => setIsClockPaused(prev => !prev)}>
            {isClockPaused ? 'Start Clock' : 'Pause Clock'}
          </button>
        </div>
      </div>

      {/* Display user details in a box */}
      <div className="user-details-box">
        {/* User details columns */}
        <div className="user-details-column">
          <h3>User Details</h3>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className="user-details-column">
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address?.street}, {user.address?.city}, {user.address?.zipcode}</p>
          {/* Add more details as needed */}
        </div>
      </div>

      {/* Display user posts */}
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}

      {/* "Back" link to navigate back to User Directory */}
      <Link to="/" className="back-link">Back to User Directory</Link>
    </div>
  );
};

export default UserDetail;
