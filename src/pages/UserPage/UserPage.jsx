import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import "./UserPage.css";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [shoppingHistory, setShoppingHistory] = useState([]);
  const [events, setEvents] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [security, setSecurity] = useState({});

  // Function to extract username from email
  const getUsernameFromEmail = (email) => {
    return email ? email.split('@')[0] : "User";
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);

        // Fetch user details
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        }

        // Fetch shopping history
        const historyQuery = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
        const historySnapshot = await getDocs(historyQuery);
        const historyList = historySnapshot.docs.map((doc) => doc.data());
        setShoppingHistory(historyList);

        // Fetch events
        const eventsQuery = query(collection(db, "events"));
        const eventsSnapshot = await getDocs(eventsQuery);
        const eventsList = eventsSnapshot.docs.map((doc) => doc.data());
        setEvents(eventsList);

        // Fetch preferences and security settings
        const prefsDoc = await getDoc(doc(db, "preferences", currentUser.uid));
        const secDoc = await getDoc(doc(db, "security", currentUser.uid));
        if (prefsDoc.exists()) {
          setPreferences(prefsDoc.data());
        }
        if (secDoc.exists()) {
          setSecurity(secDoc.data());
        }
      }
    };

    fetchUserDetails();
  }, []);

  if (!user) {
    return <div className="user-page">Loading...</div>;
  }

  // Use displayName if available, otherwise fall back to the extracted username
  const username = user.displayName || getUsernameFromEmail(user.email);

  return (
    <div className="user-page">
      <div className="user-header">
        <h1 className="user-title">Welcome, {username}!</h1>
      </div>
      <div className="user-details">
        <div className="user-info">
          <h2>User Details</h2>
          <p><strong>Name:</strong> {username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {userDetails.role || "Not provided"}</p>
        </div>
        <div className="user-history">
          <h2>Shopping History</h2>
          {shoppingHistory.length > 0 ? (
            <ul>
              {shoppingHistory.map((order, index) => (
                <li key={index} className="order-item">
                  <p><strong>Date:</strong> {new Date(order.date.toDate()).toLocaleDateString()}</p>
                  <p><strong>Products:</strong> {order.products.join(', ')}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No shopping history available.</p>
          )}
        </div>
        <div className="events">
          <h2>Farm Visits & Events</h2>
          {events.length > 0 ? (
            <ul>
              {events.map((event, index) => (
                <li key={index} className="event-item">
                  <p><strong>Event:</strong> {event.name}</p>
                  <p><strong>Date:</strong> {new Date(event.date.toDate()).toLocaleDateString()}</p>
                  <p>{event.description}</p>
                  <button className="rsvp-btn">RSVP</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming events.</p>
          )}
        </div>
        <div className="account-settings">
          <h2>Account Settings</h2>
          <div>
            <h3>Communication Preferences</h3>
            <p>Email Notifications: {preferences.emailNotifications ? "Enabled" : "Disabled"}</p>
            <p>SMS Alerts: {preferences.smsAlerts ? "Enabled" : "Disabled"}</p>
          </div>
          <div>
            <h3>Privacy Settings</h3>
            <p><strong>Data Management:</strong> Manage your personal data settings here.</p>
          </div>
        </div>
        <div className="security-settings">
          <h2>Security Settings</h2>
          <div>
            <h3>Two-Factor Authentication</h3>
            <p>Status: {security.twoFactorAuth ? "Enabled" : "Disabled"}</p>
          </div>
          <div>
            <h3>Recent Activity</h3>
            <p>View your recent login activity and security alerts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
