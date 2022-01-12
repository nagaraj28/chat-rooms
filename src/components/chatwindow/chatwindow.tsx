import { useContext} from 'react';
import { Context } from '../../context/context';
import { SocketContext } from '../../context/scoketContext';
import ChatMessages from '../chatMessages/chatMessages';

function ChatWindow() {
  const {currentRoom}:any = useContext(Context);
  const {socket}:any = useContext(SocketContext);

  // console.log("chat-window");
  return (
    <div>
      <h1>{
        currentRoom&&currentRoom.roomName
      }</h1>
       {
      currentRoom?.roomid&&(socket.connected || socket.disconnected)?<ChatMessages currentroom={currentRoom}  socket={socket} />:
       <h4>Welcome to chat rooms! </h4>
     }
    </div>
    
  );
}
export default ChatWindow;
