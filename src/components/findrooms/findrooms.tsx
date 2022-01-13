import { useState } from "react";
import { useEffect } from "react";
import "./findrooms.css";
import axios from "axios";
import GroupingComponent from "../grouplist/groupingComponent";
const FindRooms = ()=>{
    const emptyArr:any[] = [];
    const [allRooms,setAllRooms] = useState(emptyArr);
    const [error,setError] = useState("");

    useEffect(()=>{
         axios.get("http://localhost:5000/chat").then((res:any)=>{
             if(res.data.status==="success")
             setAllRooms(res.data.data);
             else
             setError("something went wrong, please try refreshing !");
         })
    },[]);
    return <div className="find-rooms-ctnr" >
        {
            allRooms?allRooms.map((room:any)=>{
               return <GroupingComponent key={room._id} room={room} />
            }):"rooms not found"
        }
    </div>
}
export default FindRooms;