import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface SignUpData {
    fullName: String;
    username: String;
    password: String;
    confirmPassword: String;
    gender: String;
}

interface UseSignUpResult {
    loading: boolean;
    signUp: (data: SignUpData) => Promise<void>;
}

export default function useSignUp(): UseSignUpResult {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const signUp = async ({ fullName, username, password, confirmPassword, gender }: SignUpData): Promise<void> => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            toast.success("Signed up succesfully");
            navigate("/home")
            // setAuthUser(data);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signUp };
}



function handleInputErrors({fullName, username, password, confirmPassword, gender}: {fullName: String,username: String, password: String,confirmPassword: String, gender: String}){
    console.log("usesignup, ",password, confirmPassword)
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
		toast.error("Passwords do not match in hook");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}

