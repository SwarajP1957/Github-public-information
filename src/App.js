import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
      setError('');
    } catch (error) {
      setUserData(null);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="github-card">
        <h1>GitHub Information</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Get Info</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {userData && (
          <div className="user-info">
            <div className="avatar-container">
              <img src={userData.avatar_url} alt="User Avatar" className="avatar-img" />
              <p>{userData.name || 'Name not available'}</p>
            </div>
            <div>
              <h2>{userData.login}</h2>
              <p>Public Repos: {userData.public_repos}</p>
              <p>Public Gists: {userData.public_gists}</p>
              <p>Profile Created At: {new Date(userData.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
