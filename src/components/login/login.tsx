import React,{useEffect, useState} from "react";
import { Box,TextField,Typography,Button} from "@mui/material";
import {Link} from "react-router-dom";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../context/context";


export default function LoginForm(){
 
     const [loginEmailAndPassword,setLoginEmailAndPassword] = useState({
         email:"",
         password:""
     });
     const [loginError,setLoginError] = useState("");
     const navigate = useNavigate();
     
     useEffect(()=>{
        const token = localStorage.getItem("x-auth-token");
     if(token){
        //  console.log(token);
        navigate("/");
     }
     },[]);
    const handleSubmit = ()=>{
        toast.info('logging into your account,please wait!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            axios.post(`${URL}chatroomuser/login`,loginEmailAndPassword).then((res:any)=>{
               if(res.data.status === "success"){
                toast.success('login success,please wait while we take you to home! ', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    localStorage.setItem("x-auth-token",res.data.token);
                    navigate("/");
               }else{
                toast.error(res.data.errorMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    setLoginError(res.data.errorMessage);
            }
            }).catch((err:any)=>{   
                toast.error('something went wrong', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    setLoginError("something went wrong");
            });
        }

    return <Box className="updatectnr" component="form" >
           <Typography className="updateheader">
            Log In 
        </Typography>
                     <TextField className="updatetextfield" id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{
                         e.preventDefault();
                         setLoginError("");
                         setLoginEmailAndPassword({
                            ...loginEmailAndPassword,
                            email:e.target.value,
                            password:loginEmailAndPassword.password
                        })
                     } } /><br/>
                     <TextField  className="updatetextfield" id="outlined-basic-password" label="Password" variant="outlined" type="password"  onChange={(e)=>{
                        setLoginError("");
                        e.preventDefault();
                        setLoginEmailAndPassword({
                            ...loginEmailAndPassword,
                            email:loginEmailAndPassword.email,
                            password:e.target.value,
                        })
                     } }/>
                     <br/>
                     <Button className="updatebtn" variant="outlined" disabled={!(loginEmailAndPassword.email.length>0&&loginEmailAndPassword.password.length>0)}  onClick={()=>{handleSubmit()}}>login</Button>
                   <Typography style={{color:"red"}} className="updateheader" > {loginError} </Typography>

                     <p>Don't have an account create <Link to="/signup">here</Link></p>
                     <ToastContainer />
         </Box>
}