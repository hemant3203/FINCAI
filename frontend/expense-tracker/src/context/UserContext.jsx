import React,{createContext,useState} from 'react';

export const UserProvider=({children})=>{
   const [user,setUser]=useState(null);

//    function to update user data
const updateUser=(userData)=>{
    setUser(null);
};

return (
    <UserContext.Provider
     value={{
        user,
        updateUser,
        clearUser,
     }}
     >
        {children}
        </UserContext.Provider>
);
}

export default UserProvider;