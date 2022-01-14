import { useContext} from 'react';
import { Context } from '../../context/context';
import { SocketContext } from '../../context/scoketContext';
import ChatMessages from '../chatMessages/chatMessages';
import "./chatwindow.css";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

function ChatWindow() {
  const {currentRoom,isChatWindowOpen,changeChatWindow}:any = useContext(Context);
  const {socket}:any = useContext(SocketContext);


  //  console.log(isChatWindowOpen);
  return (
    <div className={!isChatWindowOpen?"res-window-hide":""}>
     <div className='room-ctnr'>
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
     </div>
       {
      currentRoom?.roomid&&(socket.connected || socket.disconnected)?<ChatMessages currentroom={currentRoom}  socket={socket} />:
       <h4>Welcome to chat rooms! </h4>
     }
    </div>
    
  );
}
export default ChatWindow;
