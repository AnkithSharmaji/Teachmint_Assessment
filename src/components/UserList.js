import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import the stylesheet for UserList component
import './UserList.css';


const UserList = () => {
 const [users, setUsers] = useState([]);


  useEffect(() => {
    // Fetched user data from the provided API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []); 

  // Render the UserList component
  return (
    <div className="user-list-container">
      {/* Display the title of the user directory */}
      <h1 className="directory-title">User Directory</h1>
      
      {/* Display the number of persons in the directory */}
      <p className="num-of-persons">{users.length} Persons</p>

      {/* Display the list of users as clickable links */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {/* Link to individual user detail page */}
            <Link to={`/user/${user.id}`} className="user-link">{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the UserList component for use in other parts of the application
export default UserList;
