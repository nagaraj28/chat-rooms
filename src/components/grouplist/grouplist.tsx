import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../navbar/nav';
import "./grouplist.css";
import axios from 'axios';
import { Context } from '../../context/context';
import { SocketContext } from '../../context/scoketContext';
import { convertToReadableTime } from '../chatwindow/chatWindowUtil';


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
                        <hr/>
        <h4>
            {notifications.roomName}
            <span><small>{convertToReadableTime(notifications.updatedAt)}</small></span>
        </h4>
        <p>
            {notifications.lastmessage}
                <small><b>{notifications.messagecount}</b></small>
        </p>
        </div>
            })  
        }
       </div>
   </div>
  );
}
export default GroupList;