import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../navbar/nav';
import "./grouplist.css";
import axios from 'axios';
import { Context } from '../../context/context';

function GroupList() {
    const emptyRooms:any[] = [];
    const [rooms,setRooms] = useState(emptyRooms);
    const {changeRoom}:any = useContext(Context);

    useEffect(()=>{
        axios.get("http://localhost:5000/chat/rooms/admin").then((res:any)=>{
            setRooms(res.data.data);
        });
    },[]);
  return (
   <div>
       <NavBar/>
       <div className="group-ctnr">
        {
            rooms?.length>0&&rooms.map((room)=>{
             return   <div key={room._id} className='chatheader' onClick={()=>{
                changeRoom(room);
    }}>
                        <hr/>
        <h4>
            {room.roomName}
        </h4>
        <p>
            user: last Message
        </p>
        </div>
            })
        }
       </div>
   </div>
  );
}
export default GroupList;