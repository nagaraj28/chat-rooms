import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { Context } from "../../context/context";
import CircularProgress from '@mui/material/CircularProgress';
import { URL } from "../../context/context";


// export type ProtectedRouteProps = RouteProps;

 export default function ProtectedRoutes(/*{component:Component,...rest}:any*/){
    const [loading,setLoading] = useState(true);
    const {userDetails,updateUserDetails}:any = useContext(Context);
    
    useEffect(()=>{
      const token = localStorage.getItem("x-auth-token");
      if((userDetails&&userDetails.username)||!token){
        setLoading(false);
      }else{
        axios.get(`${URL}users/tokenvalid`,{headers:{
          "x-auth-token":token
      }
  }).then((res:any)=>{
         if(typeof res.data ==="boolean" && res.data===false){
           localStorage.removeItem("x-auth-token");
         }else if(res.data&&res.data.username){
          updateUserDetails(res.data);
          }
        setLoading(false);
        });
      }
    },[]);
    return (
      (!loading)?(userDetails&&userDetails.username?<Outlet/>:<Navigate to="/login" />):<div  style={{marginTop:"100px",display:"flex",justifyContent:"center",alignContent:"center"}}><CircularProgress/></div>
    );
}

