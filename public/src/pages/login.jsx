import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import axios from "axios"
import { loginRoute } from '../utils/ApiRoutes';


function Login() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        username:"",
        password:"",
    })
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }

    // now lets say if a user is already in database then keep him logged in and directly open the chat i.e home page
    useEffect(() => {
      if(localStorage.getItem('chat-app-user'))
      {
        console.log('hey')
        navigate("/")
      }
    })

    const handleSubmit = async(event) =>{
        event.preventDefault(); 
        if(handleValidation()){
            //lets call api
            const {username,password} = values;
            const {data} = await axios.post(loginRoute,{ //registerRoute is the endpoint url where you want to send the post request
                username,
                password,
            })
        if(data.status === false){
            toast.error(data.msg,toastOptions)
        }
        if(data.status === true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user))
            navigate("/") 
        }
    }
    };

    const handleValidation = () =>{
        // we have added a new packet calles yarn add react-toastify
        const {password,username} = values; // values if from useState and holds the current values
        if(password===""){
            toast.error("password and confirm password dont match",toastOptions)
            return false
        }
        else if (username.length===""){
            toast.error("enter username",toastOptions)
            return false;
        }
        return true;
    }

    const handleChange = (event) =>{
        setValues({...values,[event.target.name]:event.target.value})
    };
  return (
    <>
    <ToastContainer />
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="brand">
                <img src={Logo} alt="logo" />
                <h1>snappy</h1>
            </div>
            <input type="text" placeholder='username' name='username' onChange={(e) => handleChange(e)} min="3"/>
            <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
            <button type='submit'>Login</button>
            <span>Dont have an account? <Link to="/register">Register Now!</Link></span>
        </form>
    </FormContainer>
    </> 
  );
}

const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color:#131324;

    .brand{
        display:flex;
        align-items: center;
        gap: 1rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1{
            color:white;
            text-transform:uppercase;
             
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#00000076;
        border-radius:2rem;
        padding:3rem 5rem;
        input{
            background-color: transparent;
            padding:1rem;
            border: 0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border:0.1rem solid #997af0;
                outline:none;
            }
        }
        button{
            background-color:#997af0;
            color:white;
            padding:1rem 2rem;
            border:none; 
            fond-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transition:0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;
            }

        }
        span{
            color:white;
            text-transform:capitalize;
            a{
                color:#4e0eff;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }
`;
export default Login;

