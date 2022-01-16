import { useState } from "react";
import { useEffect } from "react";
import "./findrooms.css";
import axios from "axios";
import GroupingComponent from "../grouplist/groupingComponent";
import { URL } from "../../context/context";

const FindRooms = ()=>{
    const emptyArr:any[] = [];
    const [allRooms,setAllRooms] = useState(emptyArr);
    const [error,setError] = useState("");

    useEffect(()=>{
         axios.get(`${URL}chat`).then((res:any)=>{
             if(res.data.status==="success")
             setAllRooms(res.data.data);
             else
             setError("something went wrong, please try refreshing !");
         })
    },[]);
    return <div className="find-rooms-ctnr" >
        {
            allRooms?allRooms.map((room:any)=>{
                // console.log(room);
               return <GroupingComponent key={room._id} room={Object.assign({},room,{roomid:room._id})} />
            }):"rooms not found"
        }
    </div>
}
export default FindRooms;