import { Context } from "../../context/context";
import { useContext } from "react";

export  const handleSendMessage = (currentRoom:any,socket:any,typedText:string):void=>{
    // console.log("handleSendMEssage");
    socket.emit("incoming-chat",{
      username:"admin",
      text:typedText,
      imageSrc:"",
      roomid:currentRoom._id
    });
    // console.log("handleSendMEssage",socketStoredMessages);
}