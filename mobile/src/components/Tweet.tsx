import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export type TweetProps = {
  onLike: (id: string) => void
  tweet: {
    id: string
    author: string
    text: string
    likeCount: number
  }
}

export const Tweet = ({ onLike, tweet }: TweetProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>{tweet.author}</Text>
      <Text style={styles.content}>{tweet.text}</Text>

      <TouchableOpacity
        onPress={() => onLike(tweet.id)}
        style={styles.likeButton}
      >
        <Ionicons name="ios-heart-outline" size={20} color="#999" />
        <Text style={styles.likeText}>{tweet.likeCount}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c2022',
  },
  content: {
    fontSize: 15,
    lineHeight: 20,
    color: '#1c2022',
    marginVertical: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    color: '#999',
    marginLeft: 5,
  },
})

export default Tweet
