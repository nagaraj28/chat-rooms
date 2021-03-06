import React, {useContext, useEffect, useState,useRef} from 'react';
import { handleSendMessage } from '../chatwindow/chatWindowUtil';
import { ChatRoomInterface } from './chatMessageInterface';
import axios from 'axios';
import { performClearRoomNotifications } from '../chatwindow/chatWindowUtil';
import "./chatMessages.css";
import SendIcon from '@mui/icons-material/Send';
import { Context } from '../../context/context';
import { URL } from '../../context/context';

const ChatMessages: React.FC<ChatRoomInterface> = ({currentroom,socket}):JSX.Element=>{

    const emptyArr:any[] = [];
    const [currentMessagesStore,setCurrentMessagesStore] = useState(emptyArr);
    const [typedText,setTypedText] = useState("");
    const [dbMessages,setDbMessages] = useState(emptyArr);
    const {roomData,updateRoomData,userDetails}:any = useContext(Context);
    const messagesEndRef:any = useRef(null);

  const scrollToBottom = () => {
    setTimeout(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      },500);
     
      setTimeout(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      },1000);
      setTimeout(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      },2000);
      setTimeout(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      },5000);
  }
    // console.log(globalNotificationsArray);
    // console.log(roomData);
    useEffect(()=>{
        if(currentroom.messagecount>0){
            performClearRoomNotifications(currentroom.roomid,userDetails.username);
            scrollToBottom();
        }
    axios.get(`${URL}messages/${currentroom.roomid}`).then((res:any)=>{
        setDbMessages(res.data.messages);
    });
    setCurrentMessagesStore(emptyArr);    
    const perFormMsgMerge  = (msg:any)=>{
        setCurrentMessagesStore((prevState:any[])=>[...prevState,msg]);
        scrollToBottom();
        }
        socket.on(currentroom.roomid,(msg:any)=>{
            perFormMsgMerge(msg);
        });
        scrollToBottom();
    return ()=>{
        performClearRoomNotifications(currentroom.roomid,userDetails.username);
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
        const todayDateValue = String(new Date()).slice(4,15);
        let dateValue  = String(created_date).slice(4,15);
        if(todayDateValue===dateValue)
         dateValue="Today";
        const amORpm = created_date.getHours()>=12?"PM":"AM";
        const hours = String(created_date.getHours()===0?"12":created_date.getHours()>12?created_date.getHours()-12:created_date.getHours());
        const createdAt =dateValue+" | "+((hours.length<2?"0"+hours:hours)+":"+(String(created_date.getMinutes()).length<2?"0"+created_date.getMinutes():created_date.getMinutes())+" "+amORpm);    
    return createdAt;
    }
    const joinRoom = async(roomid:string,username:string,roomName:string)=>{
        axios.post(`${URL}chat/rooms/adduser`,{roomid,username,roomName}).then((res:any)=>{
            if(res.data.status==="success"){    
                updateRoomData(res.data.data);
            }else{
                console.log("something went wrong joining the room!");
            }
        }).catch((err:any)=>{
            console.log("error joining room!");
        });
    }
    return (
    <div className="chat-window">
        {
        <div className="chatmsgctnr">
        <ul>
        {
           dbMessages&&dbMessages.map((eachMessage:any,index:number)=><li className={eachMessage.username!==userDetails.username?"msg-head-ctnr":"msg-head-ctnr your-msg-ctnr"}   key={`${eachMessage.createdAt}${index}`}>
                  <div className='img-ctnr'>
                <img width="40" height="40" src={`https://avatars.dicebear.com/api/bottts/${eachMessage.username}.svg`} alt="profile-picture" />
            </div>
            <div className='msg-ctnr'>
            <p><strong>{eachMessage.username!==userDetails.username?eachMessage.username:"you"}</strong></p>  
            <p><small>{eachMessage.text}</small></p>
            <p className='txt-tym'>
           {getTime(eachMessage.createdAt)}
               </p>
            </div>
            </li>)
        }
        {
             currentMessagesStore&&currentMessagesStore.map((eachMessage:any,index:number)=><li className={eachMessage.username!==userDetails.username?"msg-head-ctnr":"msg-head-ctnr your-msg-ctnr"}   key={`${eachMessage.createdAt}${index}`}>
             <div className='img-ctnr'>
           <img width="40" height="40" src={`https://avatars.dicebear.com/api/bottts/${eachMessage.username}.svg`} alt="profile-picture" />
       </div>
       <div className='msg-ctnr'>
       <p><strong>{eachMessage.username}</strong></p>  
       <p><small>{eachMessage.text}</small></p>
       <p className='txt-tym'>
       {getTime(eachMessage.createdAt)}
          </p>
       </div>
       </li>)
        //    currentMessagesStore&&currentMessagesStore.map((eachMessage:any,index:number)=><li key={`${eachMessage.createdAt} ${index}`}>
        //     <p><strong>{eachMessage.username}</strong></p>
        //     <p><small>{eachMessage.text}</small></p>
        //    <small>
        //    <p className='txt-tym'>{eachMessage.createdAt}</p>
        //        </small> 
        //     </li>)
        }
       </ul>
       <div ref={messagesEndRef} />
       </div>
     }
      {
          roomData&&roomData.blockedAccounts?.includes(userDetails.username)?(<div className="join-ctnr"><div >you don't have permissions to send messages</div></div>):roomData&&roomData.users?.includes(userDetails.username)?(<div className="input-ctnr">
          <input placeholder='enter your message here to send...' className='txt-box' type="text-box" value={typedText} onKeyPress={(e)=>{
              if(e.key==="Enter" && typedText.length>0){
                 handleSendMessage(userDetails.username,currentroom,socket,typedText);
                    setTypedText("");
                }}
              }
           onChange={(e)=>{
            setTypedText(e.target.value);
         }} />
         <SendIcon sx={{ fontSize: 38}}  className='snd-btn' onClick={()=>{
            if(typedText.length>0){ handleSendMessage(userDetails.username,currentroom,socket,typedText);
             setTypedText("");}
         }} />          
       </div>):<div className="join-ctnr"><button className='join-btn' onClick={()=>{joinRoom(currentroom._id,userDetails.username,currentroom.roomName)}}>JOIN</button></div>
       }
    </div>
  );
}
export default ChatMessages;

