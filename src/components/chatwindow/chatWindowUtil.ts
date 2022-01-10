import axios from "axios";
export  const handleSendMessage = async(currentRoom:any,socket:any,typedText:string)=>{
    const insertMessagesIntoDb:any = await axios.post("http://localhost:5000/messages/addmessages",{
        username:"admin",
        text:typedText, 
        imageSrc:"",
        roomid:currentRoom._id,
    });
    var created_date = new Date();
    const amORpm = created_date.getHours()>=12?"PM":"AM";
    const hours = created_date.getHours()===0?"12":created_date.getHours()>12?created_date.getHours()-12:created_date.getHours();
    const createdAt = hours+":"+created_date.getMinutes()+" "+amORpm;    
    if(insertMessagesIntoDb.data.status==="success"){
        socket.emit("incoming-chat",{
            username:"admin",
            text:typedText,
            imageSrc:"",
            roomid:currentRoom._id,
            createdAt
          });
    }
}