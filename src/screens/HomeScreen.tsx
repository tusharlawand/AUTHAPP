import React, {useContext} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {AuthContext} from '../context/AuthContext'

const HomeScreen: React.FC = () => {

  const {user, logout} = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user?.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20
  },

  title:{
    fontSize:28,
    fontWeight:'bold',
    marginBottom:30
  },

  card:{
    width:'100%',
    padding:20,
    borderRadius:8,
    borderWidth:1,
    borderColor:'#ddd',
    marginBottom:30
  },

  label:{
    fontSize:16,
    fontWeight:'600'
  },

  value:{
    fontSize:16,
    marginBottom:10
  },

  button:{
    backgroundColor:'#FF3B30',
    padding:14,
    borderRadius:6,
    width:'100%',
    alignItems:'center'
  },

  buttonText:{
    color:'#fff',
    fontWeight:'bold'
  }

})

export default HomeScreen