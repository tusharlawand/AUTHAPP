import React, { useState, useContext } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
type LoginScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList, 'Login'>

type Props = {
    navigation: LoginScreenNavigationProp
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {

    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const validateEmail = (email: string) => {
        const regex = /\S+@\S+\.\S+/
        return regex.test(email)
    }

    const handleLogin = async () => {

        setError('')

        if (!email || !password) {
            setError('Email and Password are required')
            return
        }

        if (!validateEmail(email)) {
            setError('Invalid email format')
            return
        }

        try {
            await login(email, password)
        } catch (e: any) {
            setError('Incorrect credentials')
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Login</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <View style={styles.input}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Go to Signup</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 12,
        borderRadius: 6
    },

    button: {
        backgroundColor: '#007BFF',
        padding: 14,
        borderRadius: 6,
        alignItems: 'center'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },

    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center'
    },

    link: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue'
    }

})

export default LoginScreen