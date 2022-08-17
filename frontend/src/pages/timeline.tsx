import { gql, useMutation, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import router from 'next/router'
import { useEffect } from 'react'
import { TOKEN } from '../constants/localStorage'
import useLocalStorage from '../helpers/useLocalStorage'
import TimelineTemplate, { TimelineProps } from '../templates/Timeline.template'

type Tweets = { tweets: TimelineProps['tweets'] }

export const TWEET_FIELDS = gql`
  fragment TweetFields on Tweet {
    id
    author
    text
    likeCount
  }
`

export const GET_TWEETS = gql`
  ${TWEET_FIELDS}
  query GetTweets {
    tweets {
      ...TweetFields
    }
  }
`

export const CREATE_TWEET = gql`
  ${TWEET_FIELDS}
  mutation CreateTweet($author: String!, $text: String!) {
    createTweet(createTweetInput: { author: $author, text: $text }) {
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

const Timeline: NextPage = () => {
  const [author] = useLocalStorage<string>(TOKEN, '')

  const { data, refetch } = useQuery<Tweets>(GET_TWEETS)
  const [createTweet] = useMutation<{}, { author: string; text: string }>(
    CREATE_TWEET,
    { onCompleted: refetch }
  )
  const [likeATweet] = useMutation<{}, { id: string }>(LIKE_A_TWEET)

  const handleSubmitNewTweet = (text: string) => {
    createTweet({ variables: { author, text } })
  }
  const handleLikeATweet = (id: string) => {
    likeATweet({ variables: { id } })
  }

  useEffect(() => {
    if (!author.length) {
      router.replace('/')
    }
  }, [author])

  return (
    <>
      <Head>
        <title>Twitter | Timeline</title>
      </Head>
      <TimelineTemplate
        tweets={data?.tweets ?? []}
        onLikeATweet={handleLikeATweet}
        onSubmitNewTweet={handleSubmitNewTweet}
      />
    </>
  )
}

export default Timeline
