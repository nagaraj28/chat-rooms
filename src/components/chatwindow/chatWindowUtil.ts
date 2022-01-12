import axios from "axios";
export  const handleSendMessage = async(currentRoom:any,socket:any,typedText:string)=>{
    const insertMessagesIntoDb:any = await axios.post("http://localhost:5000/messages/addmessages",{
        username:"admin",
        text:typedText, 
        imageSrc:"",
        roomid:currentRoom.roomid,
    });
    const notifyRooms:any = await axios.post("http://localhost:5000/chat/notify",{
        username:"admin",
        text:typedText, 
        imageSrc:"",
        roomid:currentRoom.roomid,
    });
    
    var created_date = new Date();
    const createdAt:string = convertToReadableTime(created_date);
    if(insertMessagesIntoDb.data.status==="success"&&notifyRooms.data.status==="success"){
        // console.log("emitting new msg")
        socket.emit("incoming-chat",{
            username:"admin",
            text:typedText,
            imageSrc:"",
            roomid:currentRoom.roomid,
            createdAt
          });
    }
}

export const performClearRoomNotifications = async(roomid:string,username:string)=>{
    
    const deleteOperation = await axios.delete("http://localhost:5000/chat/clearroomnotification",{data:{roomid:roomid,username:username}});
    // console.log(deleteOperation);
}

export const convertToReadableTime = (date:any):string=>{
    var created_date = new Date(date);
    const amORpm = created_date.getHours()>=12?"PM":"AM";
    const hours = created_date.getHours()===0?"12":created_date.getHours()>12?created_date.getHours()-12:created_date.getHours();
    const createdAt = hours+":"+created_date.getMinutes()+" "+amORpm;    
return createdAt;
}