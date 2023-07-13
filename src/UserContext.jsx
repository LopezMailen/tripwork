import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        window.location = "/";
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        window.location = "/";
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
