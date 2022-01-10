import React, { useContext,useEffect, useState} from 'react';
import { handleSendMessage } from '../chatwindow/chatWindowUtil';
import { Context } from '../../context/context';
import { ChatRoomInterface } from './chatMessageInterface';

const ChatMessages: React.FC<ChatRoomInterface> = ({currentroom,socket}):JSX.Element=>{

    //   console.log("chatMessageBox");
    
    const emptyArr:any[] = [];
    const [currentMessagesStore,setCurrentMessagesStore] = useState(emptyArr);
    // console.log(currentMessagesStore);
    const [typedText,setTypedText] = useState("");
    useEffect(()=>{
    setCurrentMessagesStore(emptyArr);    
    const perFormMsgMerge  = (msg:any)=>{
    setCurrentMessagesStore((prevState:any[])=>[...prevState,msg]);
    }
    socket.on(currentroom._id,(msg:any)=>{
    perFormMsgMerge(msg);
    });
    },[currentroom]);
   

    return (
    <div>
        {
        <div>
        <h3>{currentroom.roomName}</h3>
        <ul>
        {
           currentMessagesStore&&currentMessagesStore.map((eachMessage:any,index:number)=><li key={`eachMessage.text ${index}`}>
            <p><strong>{eachMessage.username}</strong></p>
            <p><small>{eachMessage.text}</small></p>
            </li>)
        }
        <input type="text-box" value={typedText} onChange={(e)=>{
           setTypedText(e.target.value);
        }} />
        <button onClick={()=>{
            console.log(typedText);
            handleSendMessage(currentroom,socket,typedText);
            setTypedText("");
        }}>send</button>
       </ul>
       </div>
     }
    </div>
  );
}
export default ChatMessages;

