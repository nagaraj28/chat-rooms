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
import { URL } from "../../context/context";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Tooltip from '@mui/material/Tooltip';
import { Navigate, useNavigate } from "react-router";


function NavBar() {
  const [loading,setLoading] = useState(false);
  const [groupName,setGroupName] = useState("");
  const [error,setErrorMessage] = useState(false);
  const {isModalOpenForCreateRoom,isModalOpenForFindingRooms,changeIsModalOpenForCreateRoom,changeIsModalOpenForFindingRooms,userDetails,updateUserDetails}:any = useContext(Context);
  const navigate = useNavigate();
  // console.log(isModalOpenForCreateRoom,isModalOpenForFindingRooms);
  const submitForm = async(username:string,roomName:string)=>{
    const response  = await axios.post(`${URL}chat/createroom`,{username,roomName});
    if(response.data.status==="success"){
      // console.log("success");
      changeIsModalOpenForCreateRoom();
      setErrorMessage(false);
    }else{
      setErrorMessage(true);
    }
    setLoading(false);
  }

  const logout = ():void=>{
    localStorage.removeItem("x-auth-token");
    updateUserDetails({});
    navigate("/login");
  }

  return (
   <>
   <div className='room-ctnr'>
     <div className="room-title nav-header">
       <div className="nav-welcome-ctnr">
       <div className='img-ctnr nav-ctnr'>
                <img width="40" height="40" src={`https://avatars.dicebear.com/api/bottts/${userDetails.username}.svg`} alt="profile-picture" />
            </div>   
            <div className="welcome-txt"> Hi, {userDetails.username}! </div>  
         </div>   
    <div className="nav-icons">
    <Tooltip title="find rooms"><FindInPageTwoToneIcon className="find-icon" sx={{ fontSize: 28}} onClick={()=>changeIsModalOpenForFindingRooms()} /></Tooltip>
    <Tooltip title="add rooms"><AddCircleTwoToneIcon className="add-icon" sx={{ fontSize: 28}} onClick={()=>changeIsModalOpenForCreateRoom()}/></Tooltip>
    <Tooltip title="logout"><LogoutRoundedIcon className="add-icon" sx={{ fontSize: 28}} onClick={()=>logout()} /></Tooltip>

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
      submitForm(userDetails.username,groupName);
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
