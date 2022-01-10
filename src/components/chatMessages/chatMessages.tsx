import React, {useEffect, useState} from 'react';
import { handleSendMessage } from '../chatwindow/chatWindowUtil';
import { ChatRoomInterface } from './chatMessageInterface';
import axios from 'axios';

const ChatMessages: React.FC<ChatRoomInterface> = ({currentroom,socket}):JSX.Element=>{

    const emptyArr:any[] = [];
    const [currentMessagesStore,setCurrentMessagesStore] = useState(emptyArr);
    const [typedText,setTypedText] = useState("");
    const [dbMessages,setDbMessages] = useState(emptyArr);
    useEffect(()=>{
    axios.get(`http://localhost:5000/messages/${currentroom._id}`).then((res:any)=>{
        // console.log(res.data.messages);
        setDbMessages(res.data.messages);
    });
    setCurrentMessagesStore(emptyArr);    
    const perFormMsgMerge  = (msg:any)=>{
    setCurrentMessagesStore((prevState:any[])=>[...prevState,msg]);
    }
    socket.on(currentroom._id,(msg:any)=>{
    perFormMsgMerge(msg);
    });
    },[currentroom]);

    const getTime = (date:any):string=>{
        var created_date = new Date(date);
        const amORpm = created_date.getHours()>=12?"PM":"AM";
        const hours = created_date.getHours()===0?"12":created_date.getHours()>12?created_date.getHours()-12:created_date.getHours();
        return hours+":"+created_date.getMinutes()+" "+amORpm;
    }
   
    return (
    <div>
        {
        <div>
        <h3>{currentroom.roomName}</h3>
        <ul>
        {
           dbMessages&&dbMessages.map((eachMessage:any,index:number)=><li key={`${eachMessage.createdAt}${index}`}>
            <p><strong>{eachMessage.username}</strong></p>  
            <p><small>{eachMessage.text}</small></p>
            <em>
           <small>{getTime(eachMessage.createdAt)}</small>
               </em>
            </li>)
        }
        {
           currentMessagesStore&&currentMessagesStore.map((eachMessage:any,index:number)=><li key={`${eachMessage.createdAt} ${index}`}>
            <p><strong>{eachMessage.username}</strong></p>
            <p><small>{eachMessage.text}</small></p>
           <small>
           <em>{eachMessage.createdAt}</em>
               </small> 
            </li>)
        }
        <input type="text-box" value={typedText} onChange={(e)=>{
           setTypedText(e.target.value);
        }} />
        <button onClick={()=>{
            // console.log(typedText);
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

