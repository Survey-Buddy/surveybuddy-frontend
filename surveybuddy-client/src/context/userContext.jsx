import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";


// Create a custom hook 
export function useUserData() {
    return useContext(UserDataContext);
}

// Create the context 
const UserDataContext = createContext({});

export default function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);


    // const decodeJWT = (token) => {
    //     try {
    //         return jwtDecode(token);
    //     } catch (error) {
    //         console.error("Error decoding token:", error);
    //         return null;
    //     }
    // };


    // Decode the passed token
    // const decodeJWT = (token) => {
    //     try {
    //         const base64Url = token.split('.')[1]; // Get the payload part of the token
    //         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    //             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //         }).join(''));

    //         // Return the decoded payload as a JavaScript object
    //         return JSON.parse(jsonPayload); 
            
    //     } catch (error) {
    //         console.error('Error decoding token:', error);
    //         return null;
    //     }
    //     }

    const setToken = (token) => {
        if (!token) return;
    
        Cookies.set("jwtToken", token, { expires: 7 });
        const decoded = decodeJWT(token);
        if (decoded) setUserData(decoded);

    };

        const removeToken = () => {
            Cookies.remove("jwtToken");
            setUserData(null);
        }

        useEffect(() => {
            // Get token from cookies
            const token = Cookies.get("jwtToken");

            if (token) {
                const decoded = decodeJWT(token);
                const currentTime = Date.now() / 1000;
                if (decoded && decoded.exp && decoded.exp < currentTime) {
                    console.log("JWT token has expired.");
                    removeToken();
                } else {
                    setUserData(decoded);
                }
            }
        }, []);

        return (
            <UserDataContext.Provider value={{ userData, setToken, removeToken }}>
                {children}
            </UserDataContext.Provider>
        );
    }
