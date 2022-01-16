import React,{useEffect, useState} from "react";
import { Box,Typography,TextField,Button} from "@mui/material";
import "./signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {URL} from "../../context/context";


export default function SignUpForm(){

    const formInitialisation:any= {
        "email":"",
        "password":"",
        "password1":"",
        "username":""
    };
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("x-auth-token");
     if(token){
        //  console.log(token);
        navigate("/");
     }
     },[]);
    const [formInputs,setFormInputs] = useState(formInitialisation);
    const [errorMessage,setErrorMessage] = useState("");
    const [successMessage,setSuccessMessage] = useState("");

    const handleChange = (event:any)=>{
        event.preventDefault();
        const name = event.target.name;
        const value= event.target.value;
        setFormInputs((values:any) => ({...values, [name]: value}));
        if(errorMessage.length>0)
        setErrorMessage("");
        else
        setSuccessMessage(""); 
    }


   

    

    const handleSubmit = (event:any)=>{
        event.preventDefault();
        console.log(formInputs);
    //    dispatch(createAccount(formInputs))
    toast.info('creating your account,please wait!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

        axios.post(`${URL}chatroomuser/signup`,formInputs).then((res:any)=>{
                if(res.data.status==="success"){
                    toast.success('registration success,you will be redirected to login page in 3 sec', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                        setSuccessMessage(res.data.message);
                        setTimeout(()=>{
                            setSuccessMessage("");
                            navigate("/login");
                        },5000);
                }else{
                    toast.error('unable to create your account!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                        setErrorMessage(res.data.errorMessage);
                }
        
        }).catch((err:any) =>{
            toast.error('something went wrong!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setErrorMessage("something went wrong!");
        });
        
        }

    
    return <Box className="updatectnr">
        <Typography className="updateheader">
            create your account
        </Typography>
<form>
    <TextField    sx={{fontSize:"small",height:"50px"}}
 label="email" variant="outlined" className="updatetextfield" type="text-field" name="email" placeholder="enter your email address" onChange={handleChange} /><br/>
    <TextField  label="password" variant="outlined" className="updatetextfield" type="password" name="password" placeholder="enter password" onChange={handleChange}/><br/>
    <TextField  label="password" variant="outlined" className="updatetextfield" type="password" name="password1" placeholder="re-enter password" onChange={handleChange}/><br/>
    <Typography style={{color:"#0C4A6E"}} className="updateheader">
     {
         (formInputs.password&&formInputs.password1&&formInputs.password.length>0&&formInputs.password1.length>0&&(formInputs.password!==formInputs.password1))&&<Typography style={{color:"#DC2626",fontSize:"10px"}} >
         passwords mismatch
     </Typography>
     }

 </Typography>
    <TextField  label="username" variant="outlined" className="updatetextfield" type="text-field" name="username" placeholder="enter unique username" onChange={handleChange} /><br/>    
    <Button className="updatebtn" onClick={handleSubmit} disabled={!(formInputs.email?.length>0&&formInputs.password?.length>0&&formInputs.username?.length>0&&formInputs.password===formInputs.password1)}>signup</Button>
    </form>
    <Typography style={{color:"red"}} className="updateheader" >
     {errorMessage}
 </Typography>
 <Typography style={{color:"green"}} className="updateheader" >
     {successMessage}
 </Typography>
    <p>Already have a account <Link to="/login" >Sign-In</Link></p>
    <ToastContainer />
    </Box>

}