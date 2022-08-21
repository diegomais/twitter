import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import TimelineTemplate, { TimelineProps } from '../templates/Timeline'
import { TWEET_FIELDS } from './NewTweet'

type Tweets = { tweets: TimelineProps['tweets'] }

export const GET_TWEETS = gql`
  ${TWEET_FIELDS}
  query GetTweets {
    tweets {
      ...TweetFields
    }
  }
`

export const LIKE_A_TWEET = gql`
  ${TWEET_FIELDS}
  mutation LikeATweet($id: String!) {
    likeATweet(id: $id) {
      ...TweetFields
    }
  }
`

export const TWEET_ADDED_SUBSCRIPTION = gql`
  ${TWEET_FIELDS}
  subscription OnTweetAdded {
    tweetAdded {
      ...TweetFields
    }
  }
`

export const TWEET_LIKED_SUBSCRIPTION = gql`
  ${TWEET_FIELDS}
  subscription OnTweetLiked {
    tweetLiked {
      ...TweetFields
    }
  }
`

const Timeline = () => {
  const { data, loading, refetch, subscribeToMore } =
    useQuery<Tweets>(GET_TWEETS)
  const [likeATweet] = useMutation<{}, { id: string }>(LIKE_A_TWEET)

  const handleLikeATweet = (id: string) => {
    likeATweet({ variables: { id } })
  }

  useEffect(() => {
    if (!loading) {
      subscribeToMore<{ tweetAdded: { id: string } }>({
        document: TWEET_ADDED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const { tweetAdded } = subscriptionData.data
          return Object.assign({}, prev, {
            tweets: [tweetAdded, ...prev.tweets],
          })
        },
      })
      subscribeToMore<{ tweetLiked: { id: string } }>({
        document: TWEET_LIKED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const { tweetLiked } = subscriptionData.data
          return Object.assign({}, prev, {
            tweets: prev.tweets.map((tweet) =>
              tweet.id === tweetLiked.id ? { ...tweet, ...tweetLiked } : tweet
            ),
          })
        },
      })
    }
  }, [loading, subscribeToMore])

  return (
    <TimelineTemplate
      onLikeATweet={handleLikeATweet}
      onRefresh={refetch}
      refreshing={loading}
      tweets={data?.tweets ?? []}
    />
  )
}

export default Timeline
