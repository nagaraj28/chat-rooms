import React, { useState,useEffect } from "react";
import { createContext } from "react";
import io from 'socket.io-client';

export const Context = createContext({});
const ContextProvider: React.FC<{}> = ({children})=>{
    // console.log("context started");
    const [currentRoom,setCurrentRoom] = useState(null);
    const [isModalOpenForCreateRoom,setIsModalOpenForCreateRoom] = useState(false);
    const [isModalOpenForFindingRooms,setIsModalOpenForFindingRooms] = useState(false);
    const emptyArr:any[]= [];
    const [globalNotificationsArray,setGlobalNotifications] = useState(emptyArr);

    function changeRoom(newRoom:any):void{
        // console.log("hey",newRoom);
        setCurrentRoom(newRoom);
    }
    function changeIsModalOpenForCreateRoom():void{
        setIsModalOpenForCreateRoom(!isModalOpenForCreateRoom);
    }
    function changeIsModalOpenForFindingRooms():void{
        setIsModalOpenForFindingRooms(!isModalOpenForFindingRooms);
    }
    function closeAllModals():void{
        setIsModalOpenForCreateRoom(false);
        setIsModalOpenForFindingRooms(false);
    }
    function updateNotificationsArray(notificationsArr:any[]):void{
        setGlobalNotifications(notificationsArr);
    }


    return <Context.Provider value={{currentRoom,changeRoom,isModalOpenForCreateRoom,isModalOpenForFindingRooms,changeIsModalOpenForCreateRoom,changeIsModalOpenForFindingRooms,closeAllModals
    ,updateNotificationsArray,globalNotificationsArray}}>
        {children}
    </Context.Provider>
} 

export default ContextProvider;