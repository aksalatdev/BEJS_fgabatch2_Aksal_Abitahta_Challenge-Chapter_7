import { useEffect, useState } from "react";
import socket from "../services/socket"; // Import socket

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // lisrennn event `notification` dari backend
    socket.on("notification", (message) => {
      console.log("New notification:", message);
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={index}>{notif}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
