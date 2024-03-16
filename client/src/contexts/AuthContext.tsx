import { createContext, useContext, useState } from "react";

interface AuthContextValue {
    authUser: any;
    setAuthUser: React.Dispatch<any>;
}

const AuthContext = createContext<AuthContextValue>({ authUser: null, setAuthUser: () => {} });

 function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const storedData = localStorage.getItem("chat-user");
const [authUser, setAuthUser] = useState<any | null>(
    storedData ? JSON.parse(storedData) : null
);
    

    

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

 const useAuthContext = () =>{
    const context = useContext(AuthContext);
    if(!context) console.log("auth context was used outside its provider")
    return context;
}

export {AuthContextProvider, useAuthContext};

