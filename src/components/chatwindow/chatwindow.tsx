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
       {
        currentRoom&&currentRoom.roomName
      }
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
