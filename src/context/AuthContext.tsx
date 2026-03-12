import React, {createContext, useState, useEffect, ReactNode} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {User, AuthContextType} from "../types/AuthTypes"

interface Props {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC<Props> = ({children}) => {

  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    loadUser()
  },[])

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem("user")

    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  }

  const login = async (email:string,password:string) => {

    const storedUser = await AsyncStorage.getItem("user")

    if(!storedUser){
      throw "User not found"
    }

    const parsed:User = JSON.parse(storedUser)

    if(parsed.email === email && parsed.password === password){
      setUser(parsed)
    }else{
      throw "Invalid credentials"
    }
  }

  const signup = async (name:string,email:string,password:string) => {

    const newUser:User = {name,email,password}

    await AsyncStorage.setItem("user",JSON.stringify(newUser))

    setUser(newUser)
  }

  const logout = () => {
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{user,login,signup,logout}}>
      {children}
    </AuthContext.Provider>
  )
}