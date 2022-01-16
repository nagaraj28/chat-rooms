import axios from "axios";
import { useContext} from "react";
import { Context } from "../../context/context";
import Modal from "../modal/modal";
import ModalHeader from "../modal/modalheader/modalheader";
import "./groupprofile.css";
import { GroupProfileInterface } from "./groupProfileInterface";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { URL } from "../../context/context";

const GroupProfile: React.FC<GroupProfileInterface> = ({roomid}):JSX.Element=>{
    // const initialiseGroupDetails:GroupDetailsType={
    //     users:[],
    //     admins:[],
    //     roomName:""
    // };

    // const [groupDetails,setGroupDetails] = useState(initialiseGroupDetails);
    const {roomData,updateRoomData,userDetails}:any = useContext(Context);
    // console.log(roomData);

    const blockUser = (roomid:string,username:string):void=>{
        toast.info('processing your request', {
         position: "top-right",  autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,  draggable: true,progress: undefined,});
        
         axios.put(`${URL}chat/rooms/block`,{username,roomid}).then((res:any)=>{
                if(res.data.status==="success"){
                    toast.success(`${username} blocked successfully`, {
                        position: "top-right",   autoClose: 5000, hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,
                        });
                    updateRoomData(res.data.data);
                }else{
                    throw res;
                }
            }).catch(err=>{
                toast.error('request failed,please try again', {
                    position: "top-right",  autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,  draggable: true,progress: undefined,});
            });
    }

    const removeUser = (roomid:string,username:string):void=>{
        toast.info('processing your request', {
            position: "top-right",  autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,  draggable: true,progress: undefined,});
            axios.put(`${URL}chat/rooms/removeuser`,{username,roomid}).then((res:any)=>{
                   if(res.data.status==="success"){
                       toast.success(`${username} removed from room`, {
                           position: "top-right",   autoClose: 5000, hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,
                           });
                       updateRoomData(res.data.data);
                   }else
                      throw res;
               }).catch(err=>{
                toast.error('request failed,please try again', {
                    position: "top-right",  autoClose: 1000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,  draggable: true,progress: undefined,});
            });;
    }



    return <Modal>
        <ModalHeader heading={`${roomData&&roomData.roomName} members`}/>
        <div className="scroll-container" >
                {
                    roomData&&roomData.users.map((user:any,index:number)=> <div className="scroll-item-ctnr"  key={`${user} ${index}`}> 
                 <div className="scroll-item-user" >
                    <img width="40" height="40" src={`https://avatars.dicebear.com/api/bottts/${user}.svg`} alt="profile-picture" />
                    <p>{user}</p>
                    {roomData.admins.includes(user)&&<p>#admin</p>}
                    </div>
                    <div className="scroll-btns-ctnr">
                       {
                        !(userDetails.username===user || roomData.admins.includes(user))&&roomData.admins.includes(userDetails.username)&&<button className="block-btn" onClick={()=>blockUser(roomData._id,user)}>block</button>
                       }
                       {
                         !(userDetails.username===user || roomData.admins.includes(user))&&roomData.admins.includes(userDetails.username)&&<button className="remove-btn"  onClick={()=>removeUser(roomData._id,user)}>remove</button>
                        }
                        </div>                  
                </div>)}
            </div>
            <ToastContainer/>
    </Modal>

}

// interface GroupDetailsType{
//     users:string[];
//     admins:string[];
//     roomName:string;
// }
export default GroupProfile;