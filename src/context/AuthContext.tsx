import React, { createContext, useState, useEffect, ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { User, AuthContextType } from "../types/AuthTypes"

interface Props {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC<Props> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null)

 useEffect(() => {
  loadUser()
}, [])

const loadUser = async () => {
  const storedUser = await AsyncStorage.getItem('authUser')

  if (storedUser) {
    setUser(JSON.parse(storedUser))
  }
}

  const login = async (email: string, password: string) => {
    const storedUser = await AsyncStorage.getItem('userData')

    if (!storedUser) {
      throw "User not found"
    }

    const parsedUser = JSON.parse(storedUser)

    if (parsedUser.email === email && parsedUser.password === password) {
      setUser(parsedUser)

      await AsyncStorage.setItem('authUser', JSON.stringify(parsedUser))
    } else {
      throw "Invalid credentials"
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    const newUser = { name, email, password }

    await AsyncStorage.setItem('userData', JSON.stringify(newUser))

    setUser(newUser)

    await AsyncStorage.setItem('authUser', JSON.stringify(newUser))
  }
  

 const logout = async () => {
  await AsyncStorage.removeItem('authUser')
  setUser(null)
}

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}