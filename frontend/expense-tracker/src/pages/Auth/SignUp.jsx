import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import {Link} from 'react-router-dom'
import {validateEmail} from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { API_PATH } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance';
import { useContext } from 'react'
import {UserContext} from "../../context/UserContext"


const SignUp = () => {
    
  const [profilePic,setProfilePic] = useState("");
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [error,setError] = useState(null);

  const {updateUser}=useContext(UserContext);
  const navigate = useNavigate();

  //handle signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl="";

    if(!fullName){
      setError("Please enter your full name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    //Signup API call

  


    try{

      // upload image if present

      if(profilePic){
         const imgUploadRes=await uploadImage(profilePic);
         profileImageUrl=imgUploadRes.image.Url ||"";
      }

      const response=await axiosInstance.post(API_PATH.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      });

      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }

    }catch(error){
      if(error.response&& error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong,Please try again");
      }
    }

  }


  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join Us and manage your Income</p>
      
       <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          
          <Input
          value={fullName}
          onChange={({target})=>setFullName(target.value)}
          label="Full Name"
          placeholder={"Hemant Prajapati"}
          type="text"/>

          <Input
         value={email}
         onChange={({target})=>setEmail(target.value)}
         label="Email Address"
         placeholder="hemant@example.com"
          type="text"
        />

        <div className='col-span-2'>
        <Input
         value={password}
         onChange={({target})=>setPassword(target.value)}
         label="Password"
         placeholder="********"
          type="password"
        />
        </div>


        </div>

       {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
       
               <button type="submit" className='btn-primary'>SIGNUP</button>
       
               <p className="text-[13px] text-slate-800 mt-3">
                 Already Have an Account?{""}
                 <Link className='font-medium text-primary underline' to="/login">Login</Link>
               </p>

        </form>

      </div>
    </AuthLayout>
  )
}

export default SignUp