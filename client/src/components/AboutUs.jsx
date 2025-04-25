import React, { useState, useEffect } from 'react';

function AboutUs() {
  const [activeUser, setActiveUser] = useState(null); // State to store the active user
  const [error, setError] = useState(''); // State to store error messages
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [newUsername, setNewUsername] = useState(''); // State to store the new username

  useEffect(() => {
    // Fetch active user from the backend
    const fetchActiveUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/active-user');
        const result = await response.json();

        if (response.ok) {
          setActiveUser(result.user); // Store the user if found
          setNewUsername(result.user.username); // Set initial username value
        } else {
          setError(result.message); // Show error if no active user found
        }
      } catch (error) {
        setError('Error fetching active user.');
        console.error('Error:', error);
      }
    };

    fetchActiveUser(); // Call the function when the component is mounted
  }, []);

  // Function to handle username update
  const handleUsernameChange = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-username', {
        method: 'PUT', // You may need to use POST or PATCH depending on your backend setup
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newUsername, // New username value
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setActiveUser((prevUser) => ({
          ...prevUser,
          username: newUsername, // Update username locally
        }));
        setIsEditing(false); // Exit edit mode
        setError(''); // Clear any errors
      } else {
        setError(result.message); // Show error if something goes wrong
      }
    } catch (error) {
      setError('Error updating username.');
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h1 style={styles.marquee}>
          <span style={styles.marqueeText}>About Me</span>
        </h1>
        {activeUser ? (
          <div style={styles.userInfo}>
            <p style={styles.text}>
              <span>User Name: </span>
              {/* If not editing, display username with the new color, otherwise show input field */}
              {isEditing ? (
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  style={styles.inputField}
                />
              ) : (
                <span style={{ color: '#1125FF' }}>{activeUser.username}</span> // Apply the color here
              )}
            </p>

            {/* Edit Button */}
            <button
              style={styles.editButton}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
        ) : (
          <p style={styles.text}>No active user found.</p>
        )}

        {/* If in editing mode, show Save button */}
        {isEditing && (
          <div style={styles.saveButtonContainer}>
            <button style={styles.saveButton} onClick={handleUsernameChange}>
              Save
            </button>
          </div>
        )}

        {/* About Developer Text (no marquee effect) */}
        <h1 style={styles.staticText}>
          <span style={styles.marqueeText}>About Developer</span>
        </h1>
        <p style={styles.text}>Developed by: Sriram C</p>
        <p style={styles.text}>Reg No: MY.AC.P2MCA23152</p>
        <p style={styles.text}>Contact Information:</p>
        <p style={styles.text}>Email: sriram23152@amrita.com</p>
        <p style={styles.text}>Phone: 9876543210</p>

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </div>
    </div>
  );
}

// Internal CSS styles (updated for the marquee effect and edit mode)
const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Full viewport height
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '500px', // Reduced maxWidth
    margin: '0 auto',
    padding: '30px', // Adjusted padding
    backgroundColor: '#ffffff', // White background for the box
    borderRadius: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden', // Prevent overflow of content
  },
  marquee: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    animation: 'marquee 5s linear infinite alternate', // Adjusted for alternate direction
    fontSize: '2rem', // Font size for marquee text
    textAlign: 'center',
    marginBottom: '1.5rem', // Space below the marquee
  },
  staticText: {
    fontSize: '2rem', // Static text style (no animation)
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  marqueeText: {
    color: '#4A90E2', // Change this to your desired color
  },
  text: {
    fontSize: '1.5rem', // Adjusted text size for readability
    lineHeight: '1.5',
    color: '#000',
    marginBottom: '1rem', // Increased margin for text spacing
    textAlign: 'left', // Align text to the left for better readability
    width: '100%', // Ensures text occupies full width
    padding: '0 10px', // Optional padding for text
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'space-between', // Align username text and edit button on opposite sides
    alignItems: 'center',
    width: '100%', // Ensure the user info container takes the full width
  },
  editButton: {
    marginBottom: '1.5rem',
    backgroundColor: '#4A90E2', // Button color
    color: '#fff',
    padding: '8px 16px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
    marginLeft: '10px', // Space between the username and button
  },
  inputField: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    padding: '5px 10px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    width: 'auto', // Make it fit the content
  },
  saveButtonContainer: {
    marginTop: '10px',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    color: '#fff',
    padding: '8px 16px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

// Add keyframes for marquee animation in the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `@keyframes marquee {
    0% { transform: translateX(100%); }   /* Start from the right */
    100% { transform: translateX(-100%); } /* Move to the left */
  }`;
document.head.appendChild(styleSheet);

export default AboutUs;
