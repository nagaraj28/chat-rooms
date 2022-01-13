import { useContext} from 'react';
import { Context } from '../../context/context';
import { SocketContext } from '../../context/scoketContext';
import ChatMessages from '../chatMessages/chatMessages';
import "./chatwindow.css";

function ChatWindow() {
  const {currentRoom}:any = useContext(Context);
  const {socket}:any = useContext(SocketContext);

  // console.log("chat-window");
  return (
    <div >
     <div className='room-ctnr'>
     <p className='room-title'>
       
     <p> <span className='img-ctnr'>
                <img width="40" height="40" src={`https://avatars.dicebear.com/api/bottts/${currentRoom&&currentRoom.roomid?currentRoom.roomid:"none"}.svg`} alt="profile-picture" />
            </span>  {
        currentRoom&&currentRoom.roomName
      }</p>  
      
      </p>
     </div>
       {
      currentRoom?.roomid&&(socket.connected || socket.disconnected)?<ChatMessages currentroom={currentRoom}  socket={socket} />:
       <h4>Welcome to chat rooms! </h4>
     }
    </div>
    
  );
}
export default ChatWindow;
