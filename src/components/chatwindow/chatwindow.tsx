import { useContext} from 'react';
import { Context } from '../../context/context';
import ChatMessages from '../chatMessages/chatMessages';

function ChatWindow() {
  const {currentRoom,socket}:any = useContext(Context);

  return (
    <div>
      <h1>{
        socket&&socket.id
      }</h1>
       {
      currentRoom?<ChatMessages currentroom={currentRoom}  socket={socket} />:
       <h4>Welcome to chat rooms! </h4>
     }
    </div>
    
  );
}
export default ChatWindow;
