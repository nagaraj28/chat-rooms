import { useContext, useEffect} from 'react';
import { Context } from '../../context/context';
import { SocketContext } from '../../context/scoketContext';
import ChatMessages from '../chatMessages/chatMessages';
import "./chatwindow.css";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import GroupProfile from "../groupprofile/groupprofile";
import axios from 'axios';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import Tooltip from '@mui/material/Tooltip';
import { URL } from '../../context/context';

function ChatWindow() {
  const {currentRoom,isChatWindowOpen,changeChatWindow,updateRoomData,isGroupDetailsOpened,changeIsGroupDetailsOpened}:any = useContext(Context);
  const {socket}:any = useContext(SocketContext);

  useEffect(()=>{ 
    if(currentRoom&&currentRoom.roomid)
    axios.get(`${URL}chat/room/${currentRoom.roomid}`).then((res:any)=>{
      if(res.data.status==="success"){
          updateRoomData(res.data.data);
      }
      });
    },[currentRoom]);


  //  console.log(isChatWindowOpen);
  return (
  <>
     {(currentRoom&&currentRoom.roomid)?<div className={!isChatWindowOpen?"res-window-hide":""}>
    <div className='room-ctnr'>
      <div className='room-sub-ctnr'>
      <div className='chat-nav-main-ctnr'>
    <ArrowBackOutlinedIcon className='back-btn' onClick={()=>changeChatWindow(false)} />
    <div className='chat-nav-ctnr'>
    <div className='img-ctnr room-logo-ctnr'>
                <img width="40" height="40" src={`https://avatars.dicebear.com/api/bottts/${currentRoom&&currentRoom.roomid?currentRoom.roomid:"none"}.svg`} alt="profile-picture" />
         </div> 
            <div className='room-name-title'> 
        {
          currentRoom?.roomName
      }</div>
       </div>  
    </div>
    <div>
         <Tooltip title="More">
           <ReadMoreOutlinedIcon sx={{fontSize:"30px"}} onClick={()=>changeIsGroupDetailsOpened(true)}/>
        </Tooltip>
       </div>
      </div>

     </div>
       {
      currentRoom?.roomid&&(socket.connected || socket.disconnected)&&<ChatMessages currentroom={currentRoom}  socket={socket} />
       }

    </div>:(<div className='chat-container'>
      <div className='wel-grid'>
      <img src="/ZAbx.gif" alt="doge funny gif" width="150" height="150"/>
      <p className='welcome-txt'>Welcome to Crypto Rooms!🎉</p>
      </div>
    </div>)
    }
        {    isGroupDetailsOpened&&<GroupProfile roomid={currentRoom.roomid} />
} 
</>)
}
export default ChatWindow;
