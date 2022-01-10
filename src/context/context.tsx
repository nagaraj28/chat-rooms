import React, { useState,useEffect } from "react";
import { createContext } from "react";
import io from 'socket.io-client';

export const Context = createContext({});
const ContextProvider: React.FC<{}> = ({children})=>{
    const [currentRoom,setCurrentRoom] = useState(null);
    const initialSocket:any={}; 
    const [socket,setSocket] = useState(initialSocket);
    useEffect(():any => {
        const newSocket = io(`http://localhost:5000/`);
        // console.log(newSocket);
        setSocket(newSocket);
        if(newSocket.connected){
            console.log("socket connected",socket.id);
        }
        return () => newSocket.close();
      }, []);

    function changeRoom(newRoom:any):void{
        // console.log("hey",newRoom);
        setCurrentRoom(newRoom);
    }

    return <Context.Provider value={{currentRoom,changeRoom,socket}}>
        {children}
    </Context.Provider>
} 

export default ContextProvider;