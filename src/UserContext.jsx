import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   // Estado de usuario (inicializado como nulo)
    const [user, setUser] = useState(null);
 // Función para manejar el inicio de sesión
    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        window.location = "/";
    };
          // Efecto para cargar el usuario almacenado en el almacenamiento local (localStorage)
 
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
 // Función para manejar el cierre de sesión
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        window.location = "/";
    };
  // Proveedor que expone el estado de usuario y las funciones de manejo de inicio/cierre de sesión
    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children} {/*una prop especial en React que se utiliza para renderizar y pasar los elementos hijos dentro de un componente.*/}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
