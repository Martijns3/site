import { createContext, useState, useEffect } from "react";

export const UsersAndCatContext = createContext();

export const UsersAndCatContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchUser = () => {
            fetch("http://localhost:3000/users")
                .then((response) => response.json())
                .then((result) => setUsers(result))
                .catch((error) => console.log("An error occured"));
            fetch("http://localhost:3000/categories")
                .then((response) => response.json())
                .then((result) => setCategories(result))
                .catch((error) => console.log("An error occured"));
        };

        fetchUser();
    }, []);

    return (
        <UsersAndCatContext.Provider value={{ categories, users }}>
            {children}
        </UsersAndCatContext.Provider>
    );
};
