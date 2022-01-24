import axios from "axios";
import { URL } from "../../context/context";

    export  const handleSendMessage = async(username:string,currentRoom:any,socket:any,typedText:string)=>{
    const insertMessagesIntoDb:any = await axios.post(`${URL}messages/addmessages`,{
        username,
        text:typedText, 
        imageSrc:"",
        roomid:currentRoom.roomid,
    });
    const notifyRooms:any = await axios.post(`${URL}chat/notify`,{
        username,
        text:typedText, 
        imageSrc:"",
        roomid:currentRoom.roomid,
    });
    
    var created_date = new Date();
    const createdAt:string = convertToReadableTime(created_date);
    if(insertMessagesIntoDb.data.status==="success"&&notifyRooms.data.status==="success"){
        // console.log("emitting new msg")
        socket.emit("incoming-chat",{
            username,
            text:typedText,
            imageSrc:"",
            roomid:currentRoom.roomid,
            createdAt
          });
    }
}

export const performClearRoomNotifications = async(roomid:string,username:string)=>{
    
    const deleteOperation = await axios.delete(`${URL}chat/clearroomnotification`,{data:{roomid:roomid,username:username}});
    // console.log(deleteOperation);
}

export const convertToReadableTime = (date:any):string=>{
    var created_date = new Date(date);
    const todayDateValue = String(new Date()).slice(4,15);
    const dateValue  = String(created_date).slice(4,15);
    if(todayDateValue!==dateValue)
    return dateValue;
    

    const amORpm = created_date.getHours()>=12?"PM":"AM";
    const hours = String(created_date.getHours()===0?"12":created_date.getHours()>12?created_date.getHours()-12:created_date.getHours());
    const createdAt = "Today | "+((hours.length<2?"0"+hours:hours)+":"+(String(created_date.getMinutes()).length<2?"0"+created_date.getMinutes():created_date.getMinutes())+" "+amORpm);    
return createdAt;
}