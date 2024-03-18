import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'


const SocketContext = createContext<any>(null);

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({children} : {children: any}) => {
    const [socket, setSocket] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState<any>([]);
    const {authUser} = useAuthContext();    

    useEffect(() => {
        if(authUser){
            const socket = io('http://localhost:8000', {
                query: {
                    userID: authUser._id
                }
            })
            setSocket(socket)

            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
        // return ()=> socket.close();
    }, [authUser])
    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
}