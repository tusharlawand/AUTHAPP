import React, {createContext, useState, useEffect, ReactNode} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface User {
  name: string
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  login: (email:string,password:string)=>Promise<void>
  signup: (name:string,email:string,password:string)=>Promise<void>
  logout: ()=>Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({children}:{children:ReactNode}) => {

  const [user,setUser] = useState<User | null>(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    loadUser()
  },[])

  const loadUser = async () => {
    try{
      const storedUser = await AsyncStorage.getItem('user')

      if(storedUser){
        setUser(JSON.parse(storedUser))
      }
    }
    catch(e){
      console.log(e)
    }
    finally{
      setLoading(false)
    }
  }

  const login = async (email:string,password:string) => {

    const storedUser = await AsyncStorage.getItem('user')

    if(!storedUser){
      throw "User not found"
    }

    const parsedUser:User = JSON.parse(storedUser)

    if(parsedUser.email === email && parsedUser.password === password){
      setUser(parsedUser)
    }else{
      throw "Incorrect credentials"
    }
  }

  const signup = async (name:string,email:string,password:string) => {

    const newUser:User = {name,email,password}

    await AsyncStorage.setItem('user', JSON.stringify(newUser))

    setUser(newUser)
  }

  const logout = async () => {

    await AsyncStorage.removeItem('user')

    setUser(null)
  }

  if(loading){
    return null
  }

  return(
    <AuthContext.Provider value={{user,login,signup,logout}}>
      {children}
    </AuthContext.Provider>
  )
}