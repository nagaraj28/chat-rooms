import React, { useState,useEffect } from "react";
import { createContext } from "react";
import io from 'socket.io-client';
import { URL } from "./context";

export const SocketContext = createContext({});
const SocketContextProvider: React.FC<{}> = ({children})=>{
    // console.log("socket context started");
    const initialSocket:any={}; 
    const [socket,setSocket] = useState(initialSocket);
    useEffect(():any => {
        const newSocket = io(`${URL}`, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});
        setSocket(newSocket);
        if(newSocket.connected){
            console.log("socket connected",socket.id);
        }
        return () => newSocket.close();
      }, []);

    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
} 

export default SocketContextProvider;
