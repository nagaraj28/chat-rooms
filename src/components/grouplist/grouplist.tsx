import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../navbar/nav';
import "./grouplist.css";
import axios from 'axios';
import { Context } from '../../context/context';
import { SocketContext } from '../../context/scoketContext';
import { convertToReadableTime } from '../chatwindow/chatWindowUtil';
import "../chatMessages/chatMessages.css";
import GroupingComponent from './groupingComponent';


function GroupList() {
    const emptyRooms:any[] = [];
    const [rooms,setRooms] = useState(emptyRooms);
    const {socket}:any = useContext(SocketContext);
    const {updateNotificationsArray,isChatWindowOpen}:any = useContext(Context);
    useEffect(()=>{
        if(socket.connected || socket.disconnected){
            axios.get("http://localhost:5000/chat/rooms/admin").then((res:any)=>{
                setRooms(res.data.data);
                updateNotificationsArray(res.data.data);
});
            // console.log("axios");
            socket.on("notify",(msg:any)=>{
                // console.log(msg);
                axios.get("http://localhost:5000/chat/rooms/admin").then((res:any)=>{
                    setRooms(res.data.data);
                    updateNotificationsArray(res.data.data);
    });
            });
        }
    },[socket]);
    // console.log(rooms);
    // console.log("group-list");
  return (
   <div className={isChatWindowOpen?"resp-hide":""}>
       <NavBar/>
       <div className="group-ctnr" >
        {
            rooms?.length>0?rooms.map(({notifications}:any)=>{
             return  <GroupingComponent key={notifications.roomid} room={notifications} />
            }):<div>you have not joined in any rooms!</div>  
        }
       </div>
   </div>
  );
}
export default GroupList;