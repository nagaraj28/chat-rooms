import "../chatwindow/chatwindow.css";
import "../chatMessages/chatMessages.css";
import "./nav.css";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import Modal from "../modal/modal";
import ModalHeader from "../modal/modalheader/modalheader";
import CircularProgress from '@mui/material/CircularProgress';
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/context";
import  FindRooms  from "../findrooms/findrooms";
function NavBar() {

  const [loading,setLoading] = useState(false);
  const [groupName,setGroupName] = useState("");
  const [error,setErrorMessage] = useState(false);
  const {isModalOpenForCreateRoom,isModalOpenForFindingRooms,changeIsModalOpenForCreateRoom,changeIsModalOpenForFindingRooms}:any = useContext(Context);
  // console.log(isModalOpenForCreateRoom,isModalOpenForFindingRooms);
  const submitForm = async(username:string,roomName:string)=>{
    const response  = await axios.post("http://localhost:5000/chat/createroom",{username,roomName});
    if(response.data.status==="success"){
      // console.log("success");
      changeIsModalOpenForCreateRoom();
      setErrorMessage(false);
    }else{
      setErrorMessage(true);
    }
    setLoading(false);
  }

  return (
   <>
   <div className='room-ctnr'>
     <div className="room-title nav-header">
       <div className="nav-welcome-ctnr">
       <div className='img-ctnr nav-ctnr'>
                <img width="40" height="40" src={`https://avatars.dicebear.com/api/bottts/admin.svg`} alt="profile-picture" />
            </div>   
            <div className="welcome-txt"> Hi, user! </div>  
         </div>   
    <div className="nav-icons">
    <FindInPageTwoToneIcon className="find-icon" sx={{ fontSize: 28}} onClick={()=>changeIsModalOpenForFindingRooms()} />
    <AddCircleTwoToneIcon className="add-icon" sx={{ fontSize: 28}} onClick={()=>changeIsModalOpenForCreateRoom()}/>
    </div>
     </div>
   </div>
   {
     isModalOpenForCreateRoom&&<Modal>
     <ModalHeader heading="create new group"/>
     <div className="modal-input-box-ctnr">
       <p className="grp-name-label">Group Name:</p>
       <input className="modal-input-box" value={groupName} type="text-box" placeholder="enter new group name here..." 
       onChange={(e)=>{
         if(error)
         setErrorMessage(false);
         setGroupName(e.target.value);
      }}
       />
     </div>
    <div  className="modal-btn-ctnr">
    <button className="primary-btn" disabled={groupName.length<=0} onClick={()=>{
      // console.log("success");
      setGroupName("");
      setLoading(true);
      submitForm("admin",groupName);
    }} >Submit</button>
   {error&&<p className="err">something went wrong,please try again!</p>}
    </div>
   {
     loading&&<div className="loading" >
   <CircularProgress />
   </div>
   }
   </Modal>
   }
   {
     isModalOpenForFindingRooms&&<Modal>
       <ModalHeader heading="Global Rooms Available"/>
       <FindRooms/>
     </Modal>
   }
   </>
  );
}

export default NavBar;
