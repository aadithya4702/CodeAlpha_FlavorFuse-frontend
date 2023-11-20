import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

axios.defaults.baseURL = "https://backend-exu9.onrender.com/api";
axios.defaults.withCredentials = true;

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && !user) {
      
      axios
        .get("/users/profile", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(({ data }) => {
          setUser(data);

          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]); 

  const logout = () => {
 
    localStorage.removeItem("token");
    localStorage.removeItem("user");

   
    Cookies.remove("token");

    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
