import React, { useState,useEffect } from "react";
import { createContext } from "react";
import io from 'socket.io-client';

export const Context = createContext({});
const ContextProvider: React.FC<{}> = ({children})=>{
    const [currentRoom,setCurrentRoom] = useState(null);
    const initialSocket:any={}; 
    const [socket,setSocket] = useState(initialSocket);
    // const [storedMessages,setStoredMessages] = useState();
    const emptyArr:any[] = [];
    // console.log("hello");
    const [socketStoredMessages,setSocketStoredMessages] = useState(emptyArr);
    console.log("hello",socketStoredMessages);
    useEffect(():any => {
        const newSocket = io(`http://localhost:5000/`);
        // newSocket.on("connection",(socket:any)=>{
        //     console.log("socket connection",socket);
        // })
        console.log(newSocket);
        setSocket(newSocket);
        if(newSocket.connected){
            console.log("socket connected",socket.id);
        }
        return () => newSocket.close();
      }, []);

    function changeRoom(newRoom:any):void{
        console.log("hey",newRoom);
        setCurrentRoom(newRoom);
        setSocketStoredMessages(emptyArr);
    }
    function addNewMessage(previousMesssages:any[],newMessage:any){
        const newMessagesArray:any[] = [...previousMesssages,newMessage];
        setSocketStoredMessages(newMessagesArray);
    }
    // const storeCurrentArrayUtil = (meessagesHistory:any[]):void=>{
    //     console.log("storee" ,meessagesHistory,messagesHistoryStore);
    //     messagesHistoryStore = [...messagesHistoryStore,...meessagesHistory];
    //     console.log(messagesHistoryStore);
    // }
    return <Context.Provider value={{currentRoom,changeRoom,socket,addNewMessage,socketStoredMessages}}>
        {children}
    </Context.Provider>
} 

export default ContextProvider;