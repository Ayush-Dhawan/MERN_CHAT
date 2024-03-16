import { useState } from "react";
import toast from "react-hot-toast";
import {useAuthContext} from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom";


export default function useLogout(){
    const [loading, setLoading] = useState<Boolean>(false);
    const navigate = useNavigate();
    const {authUser, setAuthUser} = useAuthContext();

    const logout = async () =>{
        setLoading(true);

        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
    
            localStorage.removeItem("chat-user");
            setAuthUser(null);
            toast.success("Logged out succesfully")
            setTimeout(() => {
                navigate('/')
            }, 2000);
            console.log(authUser)
        } catch (error: any) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }

    }
    return {loading, logout};   
}


