import React from "react"
import {AuthProvider} from "./src/context/AuthContext"
import AppNavigator from "./src/navigation/AppNavigator"
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
enableScreens();


const App = () => {
  return(
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
  )
}

export default App