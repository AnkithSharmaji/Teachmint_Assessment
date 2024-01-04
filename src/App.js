// Import necessary React modules and components
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import components for routing
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

// Main App component
function App() {
  return (
    // Use React Router for routing
    <Router>
      {/* Switch component to render the first Route that matches the current location */}
      <Switch>
        {/* Route for the UserList component, exact ensures it matches only the exact path */}
        <Route path="/" exact component={UserList} />
        {/* Route for the UserDetail component with a dynamic parameter for user ID */}
        <Route path="/user/:id" component={UserDetail} />
      </Switch>
    </Router>
  );
}

// Export the App component as the default export
export default App;
