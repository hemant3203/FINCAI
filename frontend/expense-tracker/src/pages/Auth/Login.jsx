import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import {Link} from 'react-router-dom';
import {validateEmail} from '../../utils/helper';
import { API_PATH } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import {UserContext} from '../../context/UserContext';

const Login = () => {

  const [email,SetEmail]=useState("");
  const [password,SetPassword]=useState("");
  const [error,setError]=useState(null);

  const{updateUser}=useContext(UserContext);

  const navigate=useNavigate();

  //handle login form submit
  const handleLogin=async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
   
    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    //Login API call
    try{
      const response=await axiosInstance.post(API_PATH.AUTH.LOGIN,{
        email,
        password,
      });

      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    }
    catch(error){
      if(error.response&&error.message.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("SOmething went wrong. Please try again")
      }
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center" >
      <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
      <p className="test-xs text-slate-700 mt-[2px] mb-6" >Please enter your details to LogIn</p>
      
      <form onSubmit={handleLogin}>
        <Input
         value={email}
         onChange={({target})=>SetEmail(target.value)}
         label="Email Address"
         placeholder="hemant@example.com"
          type="text"
        />
        <Input
         value={password}
         onChange={({target})=>SetPassword(target.value)}
         label="Password"
         placeholder="********"
          type="password"
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type="submit" className='btn-primary'>LOGIN</button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't Have an Account?{" "}
          <Link className='font-medium text-primary underline' to="/SignUp">SignUp</Link>
        </p>
      </form>

      </div>
    </AuthLayout>
  )
}

export default Login