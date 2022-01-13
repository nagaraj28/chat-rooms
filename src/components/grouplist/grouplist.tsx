import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../navbar/nav';
import "./grouplist.css";
import axios from 'axios';
import { Context } from '../../context/context';
import { SocketContext } from '../../context/scoketContext';
import { convertToReadableTime } from '../chatwindow/chatWindowUtil';
import "../chatMessages/chatMessages.css";


function GroupList() {
    const emptyRooms:any[] = [];
    const [rooms,setRooms] = useState(emptyRooms);
    const {changeRoom}:any = useContext(Context);
    const {socket}:any = useContext(SocketContext);
    useEffect(()=>{
        if(socket.connected || socket.disconnected){
            axios.get("http://localhost:5000/chat/rooms/admin").then((res:any)=>{
                setRooms(res.data.data);
});
            // console.log("axios");
            socket.on("notify",(msg:any)=>{
                // console.log(msg);
                axios.get("http://localhost:5000/chat/rooms/admin").then((res:any)=>{
                    setRooms(res.data.data);
    });
            });
        }
    },[socket]);
    // console.log(rooms);
    // console.log("group-list");
  return (
   <div>
       <NavBar/>
       <div className="group-ctnr">
        {
            rooms?.length>0&&rooms.map(({notifications}:any)=>{
             return   <div key={notifications.roomid} className='chatheader' onClick={()=>{
                changeRoom(notifications);
    }}>
         <div className='grp-avatar'>
                <img width="40" height="40" src={`https://avatars.dicebear.com/api/bottts/${notifications.roomid}.svg`} alt="profile-picture" />
            </div>
       <div >
        <div className='grp-header'>
           <h3 className="grp-name">{notifications.roomName}</h3>
            <span className="grp-tym">{convertToReadableTime(notifications.updatedAt)}</span>
        </div>
        <div className='msg-body-ctnr'>
        <p className={notifications.messagecount>0?"bold":""}>
            {notifications.lastmessage}
        </p>
        {notifications.messagecount>0&&<p className='alert'>{notifications.messagecount}</p>}
        </div>
           </div>
        </div>
            })  
        }
       </div>
   </div>
  );
}
export default GroupList;