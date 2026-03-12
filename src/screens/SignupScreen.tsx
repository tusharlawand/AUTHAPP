import React, {useState, useContext} from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {AuthContext} from '../context/AuthContext'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../navigation/AppNavigator'

type SignupScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Signup'>

type Props = {
  navigation: SignupScreenNavigationProp
}

const SignupScreen: React.FC<Props> = ({navigation}) => {

  const {signup} = useContext(AuthContext)

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')

  const validateEmail = (email:string) => {
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
  }

  const handleSignup = async () => {

    setError('')

    if(!name || !email || !password){
      setError('All fields are required')
      return
    }

    if(!validateEmail(email)){
      setError('Invalid email format')
      return
    }

    if(password.length < 6){
      setError('Password must be at least 6 characters')
      return
    }

    try{
      await signup(name,email,password)
    }catch(e:any){
      setError(e)
    }
  }

  return(
    <View style={styles.container}>

      <Text style={styles.title}>Signup</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.link}>Go to Login</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'center',
    padding:20
  },

  title:{
    fontSize:28,
    fontWeight:'bold',
    marginBottom:20,
    textAlign:'center'
  },

  input:{
    borderWidth:1,
    borderColor:'#ccc',
    padding:12,
    marginBottom:12,
    borderRadius:6
  },

  button:{
    backgroundColor:'#007BFF',
    padding:14,
    borderRadius:6,
    alignItems:'center'
  },

  buttonText:{
    color:'#fff',
    fontWeight:'bold'
  },

  error:{
    color:'red',
    marginBottom:10,
    textAlign:'center'
  },

  link:{
    marginTop:20,
    textAlign:'center',
    color:'blue'
  }

})

export default SignupScreen