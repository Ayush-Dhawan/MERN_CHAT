import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function useLogin(){
    const [loading, setLoading] = useState<Boolean>(false);
    const navigate = useNavigate();

    const login = async ({username, password}: {username: String, password: String}) =>{
        const success = handleInputErrors({username, password});
        if(!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                "method" : "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({username, password})
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            toast.success("Signed up succesfully");
            navigate("/home")
        } catch (error: any) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading, login};
}

function handleInputErrors({username, password}: {username: String, password: String}){
    if(!username || !password){
        toast.error("Please fill all the fields");
         return false;
    }
    return true;
}