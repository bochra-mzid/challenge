import React,{createContext} from 'react'

export const MyContext = createContext();

export function ContextProvider({children}){
const [user, setUser]= usestate()

const [loggedIn,setLoggedIn]=useState(false)

return(

<MyContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }} >{children} </MyContext.Provider>)}