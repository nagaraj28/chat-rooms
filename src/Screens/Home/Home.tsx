import GroupList from "../../components/grouplist/grouplist";
import ChatWindow from "../../components/chatwindow/chatwindow";
import "./home.css";
import { useContext } from "react";
import { Context } from "../../context/context";


export default function Home(){
    // const {userDetails}:any  = useContext(Context);
    // console.log(userDetails);
    return     <div className="grid">
    <GroupList/>
    <ChatWindow/>
  </div>
}