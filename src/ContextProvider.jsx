import { createContext, useState, useEffect } from "react";

export const UsersAndCatContext = createContext();

export const UsersAndCatContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchUser = () => {
            fetch("https://marty-app-65ac5731f411.herokuapp.com/users")
                .then((response) => response.json())
                .then((result) => setUsers(result))
                .catch((error) => console.log("An error occured"));
            fetch("https://marty-app-65ac5731f411.herokuapp.com/categories")
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
