import { useContext } from "react";
import { Context } from "../../context/context";
import { convertToReadableTime } from "../chatwindow/chatWindowUtil";
import { GroupList } from "./groupListInterface";

const GroupingComponent: React.FC<GroupList> = ({room})=>{
    const  {changeRoom,closeAllModals}:any = useContext(Context);
    return   <div key={room.roomid} className='chatheader' onClick={()=>{
        closeAllModals();
        room.roomid?changeRoom(room):changeRoom(Object.assign({},room,{roomid:room._id}))
}}>
 <div className='grp-avatar'>
        <img width="40" height="40" src={`https://avatars.dicebear.com/api/bottts/${room.roomid?room.roomid:room._id}.svg`} alt="profile-picture" />
    </div>
<div >
<div className='grp-header'>
   <h3 className="grp-name">{room.roomName}</h3>
    {room.roomid&&<span className="grp-tym">{convertToReadableTime(room.updatedAt)}</span>}
</div>
<div className='msg-body-ctnr'>
<p className={room.messagecount>0?"bold":""}>
    {room.lastmessage}
</p>
{room.roomid&&room.messagecount>0&&<p className='alert'>{room.messagecount}</p>}
</div>
   </div>
</div>
} 
export default GroupingComponent;