import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export type SignInProps = {
  onSubmit: (username: string) => void
}

export const SignIn = ({ onSubmit }: SignInProps) => {
  const [username, setUsername] = useState('')

  const handleSignIn = () => {
    if (username) {
      onSubmit(username)
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <View>
          <Ionicons name="logo-twitter" size={64} color="#4bb0ee" />
        </View>

        <TextInput
          onChangeText={setUsername}
          onSubmitEditing={handleSignIn}
          placeholder="Username"
          returnKeyType="send"
          style={styles.input}
          value={username}
        />

        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    height: 44,
    paddingHorizontal: 16,
    alignSelf: 'stretch',
    marginTop: 30,
  },
  button: {
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#4bb0ee',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default SignIn
