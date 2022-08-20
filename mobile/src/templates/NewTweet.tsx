import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

type NewTweetProps = {
  onSubmit: (text: string) => void
}

const NewTweet = ({ onSubmit }: NewTweetProps) => {
  const { goBack } = useNavigation()
  const [text, setText] = useState('')

  const handleSubmitNewTweet = () => {
    if (text) {
      onSubmit(text)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="close" size={24} color="#4bb0ee" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmitNewTweet}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        multiline
        onChangeText={setText}
        onSubmitEditing={handleSubmitNewTweet}
        placeholder="What's happening?"
        placeholderTextColor="#999"
        returnKeyType="send"
        style={styles.input}
        value={text}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#4bb0ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    margin: 20,
    fontSize: 16,
    color: '#333',
  },
})

export default NewTweet
