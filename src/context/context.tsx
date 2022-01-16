import React, {useState} from "react";
import { createContext } from "react";
export const URL = "https://backendforapps.herokuapp.com/";

export const Context = createContext({});
const ContextProvider: React.FC<{}> = ({children})=>{
    const [currentRoom,setCurrentRoom] = useState(null);
    const [isModalOpenForCreateRoom,setIsModalOpenForCreateRoom] = useState(false);
    const [isModalOpenForFindingRooms,setIsModalOpenForFindingRooms] = useState(false);
    const [isChatWindowOpen,setIsChatWindowOpen] = useState(false);
    const [isGroupDetailsOpened,setIsGroupDetailsOpened] = useState(false);
    const [roomData,setRoomData] = useState();
    const [userDetails,setUserDetails] = useState();


    function changeRoom(newRoom:any):void{
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
        setIsGroupDetailsOpened(false);
    }
    function updateRoomData(roomDetails:any):void{
        setRoomData(roomDetails);
    }
    function changeChatWindow(value:boolean):void{
        setIsChatWindowOpen(value);
    }
    function changeIsGroupDetailsOpened(value:boolean):void{
        setIsGroupDetailsOpened(value);
    }
    
    function updateUserDetails(value:any):void{
        setUserDetails(value);
    }

    return <Context.Provider value={{currentRoom,changeRoom,isModalOpenForCreateRoom,isModalOpenForFindingRooms,changeIsModalOpenForCreateRoom,changeIsModalOpenForFindingRooms,closeAllModals
    ,updateRoomData,roomData,isChatWindowOpen,changeChatWindow,isGroupDetailsOpened,changeIsGroupDetailsOpened,userDetails,updateUserDetails}}>
        {children}
    </Context.Provider>
}

export default ContextProvider;