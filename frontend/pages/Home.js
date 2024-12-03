import React, { useEffect, useState ,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import RotatingTiltCard from './RotatingTiltCard';

function Home() {
  const navigate = useNavigate();
  
  const [loggedInUser, setLoggedInUser] = useState('');
  const [qrCode, setQrCode] = useState(''); // State for storing QR code


  const fetchUserDetails = async (email) => {
    try {
      const response = await fetch('firebase-login-signup-plum.vercel.app/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (result.success) {
        setLoggedInUser(result.user.name); // Set user name
        setQrCode(result.user.qrCode); // Set QR code
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError("Failed to fetch user details. Please try again.");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserDetails(user.email); // Fetch details of the logged-in user
      } else {
        handleError("No user logged in.");
        navigate('/login');
      }
    });
  }, [navigate]); // Adding navigate to the dependency array ensures the effect runs correctly

  const handleLogout = async () => {
    try {
      // Remove the token from local storage
      localStorage.removeItem('token');
      
      // Show the success toast message
      handleSuccess("User logged out successfully");
  
      // Fetch the currently logged-in user email from Firebase
      const user = auth.currentUser;
      if (user) {
        const response = await fetch('firebase-login-signup-plum.vercel.app/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }) // Pass email or UID for deletion
        });
  
        const result = await response.json();
        if (result.success) {
          console.log("User data deleted from MongoDB successfully");
        } else {
          console.error("Error deleting user data from MongoDB:", result.message);
        }
      }
  
      // Delay the navigation so that the toast message can be displayed
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after the toast is shown
      }, 1500); // Adjust the delay for toast visibility
    } catch (error) {
      console.error("Error during logout:", error);
      handleError("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <div className='carousel'>
      <div className='loggedInUser'>
      <h1 className='welcome'>Welcome {loggedInUser}</h1>
      
      <div style={{margin:"15px"}}>
        {/* Display QR code if available */}
        {qrCode ? (
          <div>
            <h2>Your QR Code:</h2>
            <img src={qrCode} alt="User QR Code" style={{ width: '200px', height: '200px' }} />
          </div>
        ) : (
          <p>Loading QR code...</p>
        )}
      </div>
      <button onClick={handleLogout}>LogOut</button>
      </div>

      <div>
        <RotatingTiltCard/>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
