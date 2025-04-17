import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react-refresh/only-export-components
export const AppContext =  createContext();

export const AppContextProvider = ({children}) => {
    
    const navigate = useNavigate();
    const [user, setuser] = useState(null)
    const[isSeller,setIsSeller] =useState(false)
    const value = {
        navigate,
        user,
        setuser,
        isSeller,
        setIsSeller
    }

    return <AppContext.Provider  value={value}>
        {children}
        </AppContext.Provider>
}

export const useAppContext = () =>{
    return useContext(AppContext)
}