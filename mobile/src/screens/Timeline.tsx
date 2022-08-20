import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
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

const Timeline = () => {
  const { data, refetch, loading } = useQuery<Tweets>(GET_TWEETS)
  const [likeATweet] = useMutation<{}, { id: string }>(LIKE_A_TWEET)

  const handleLikeATweet = (id: string) => {
    likeATweet({ variables: { id } })
  }

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
