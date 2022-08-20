import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Tweet, { TweetProps } from '../components/Tweet'

type Tweet = TweetProps['tweet']

export type TimelineProps = {
  onLikeATweet: (id: string) => void
  onRefresh: () => void
  refreshing?: boolean
  tweets: Tweet[]
}

const Timeline = ({
  onLikeATweet,
  onRefresh,
  refreshing,
  tweets,
}: TimelineProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tweets ?? []}
        keyExtractor={tweet => tweet.id}
        renderItem={({ item }) => <Tweet onLike={onLikeATweet} tweet={item} />}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default Timeline
