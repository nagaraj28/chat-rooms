import React, {useEffect, useState,useContext} from 'react';
import { handleSendMessage } from '../chatwindow/chatWindowUtil';
import { ChatRoomInterface } from './chatMessageInterface';
import axios from 'axios';
import { performClearRoomNotifications } from '../chatwindow/chatWindowUtil';
import "./chatMessages.css";

const ChatMessages: React.FC<ChatRoomInterface> = ({currentroom,socket}):JSX.Element=>{

    const emptyArr:any[] = [];
    const [currentMessagesStore,setCurrentMessagesStore] = useState(emptyArr);
    const [typedText,setTypedText] = useState("");
    const [dbMessages,setDbMessages] = useState(emptyArr);
   
    useEffect(()=>{
        if(currentroom.messagecount>0){
            performClearRoomNotifications(currentroom.roomid,"admin");
        }
    axios.get(`http://localhost:5000/messages/${currentroom.roomid}`).then((res:any)=>{
        setDbMessages(res.data.messages);
    });
    setCurrentMessagesStore(emptyArr);    
    const perFormMsgMerge  = (msg:any)=>{
        setCurrentMessagesStore((prevState:any[])=>[...prevState,msg]);
        }
        socket.on(currentroom.roomid,(msg:any)=>{
            perFormMsgMerge(msg);
        });
    return ()=>{
        socket.off(currentroom.roomid);
        setCurrentMessagesStore(emptyArr);    
    }
    },[currentroom.roomid]);
   
    // useEffect(()=>{
    //     console.log("updating",currentroom.messagecount);
    //     if(currentroom.messagecount>0){
    //         performClearRoomNotifications(currentroom.roomid,"admin");
    //     }
    //     do{
    //         performClearRoomNotifications(currentroom.roomid,"admin");
    //     }while(currentroom.messagecount>0)
    // });


    const getTime = (date:any):string=>{
        var created_date = new Date(date);
        const amORpm = created_date.getHours()>=12?"PM":"AM";
        const hours = created_date.getHours()===0?"12":created_date.getHours()>12?created_date.getHours()-12:created_date.getHours();
        return hours+":"+created_date.getMinutes()+" "+amORpm;
    }

    return (
    <div>
        {
        <div className="chatmsgctnr">
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
       </ul>
       </div>
     }
      <div className="input-ctnr">
       <input className='input-box' type="text-box" value={typedText} onChange={(e)=>{
           setTypedText(e.target.value);
        }} />
        <button onClick={()=>{
            handleSendMessage(currentroom,socket,typedText);
            setTypedText("");
        }}>send</button>
       </div>
    </div>
  );
}
export default ChatMessages;

