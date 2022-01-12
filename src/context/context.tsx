import React, { useState,useEffect } from "react";
import { createContext } from "react";
import io from 'socket.io-client';

export const Context = createContext({});
const ContextProvider: React.FC<{}> = ({children})=>{
    // console.log("context started");
    const [currentRoom,setCurrentRoom] = useState(null);
    function changeRoom(newRoom:any):void{
        // console.log("hey",newRoom);
        setCurrentRoom(newRoom);
    }

    return <Context.Provider value={{currentRoom,changeRoom}}>
        {children}
    </Context.Provider>
} 

export default ContextProvider;