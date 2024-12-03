import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
    const { userId } = useParams(); // Get userId from the URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await fetch(`https://localhost:3000/auth/profile/${userId}`);
            const data = await response.json();

            if (data.success) {
                setUser(data.user);  // Set user data
            } else {
                alert('User not found');
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>{user.name}'s Profile</h1>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Gender: {user.gender}</p>
            <div>
                <h3>Your QR Code:</h3>
                <img src={user.qrCode} alt="User QR Code" style={{ width: '200px', height: '200px' }} />
            </div>
        </div>
    );
}

export default Profile;