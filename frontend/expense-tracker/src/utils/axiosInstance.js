import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        // handle common errors globally
        if(error.message){
            if(error.message.status===401){
                // redirect to login page
                window.loacation.href="/login";
            }else if(error.response.status===500){
                console.error("Server error.Please try again later.");
            }
        }
            else if(error.code==="ECONNABORTED"){
                console.error("Request timeout.Please try again");
            }
            return Promise.reject(error);
        }
   );

export default axiosInstance;

    
