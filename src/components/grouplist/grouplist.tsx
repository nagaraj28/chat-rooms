import React from 'react';
import NavBar from '../navbar/nav';
import "./grouplist.css";

function GroupList() {
    const roomList:any[]=["","","","","","","","",""];
  return (
   <div>
       <h1>grouplist</h1>
       <div className="group-ctnr">
           <hr/>
        {
            roomList.map((room)=>{
             return   <div className='chatheader'>
                        <hr/>
        <h4>
            RoomName
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
