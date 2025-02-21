import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL); // Adjust port if necessary
    setSocket(newSocket);

    return () => newSocket.close(); // Cleanup on unmount
  }, []);

  return socket;
};

export default useSocket;
