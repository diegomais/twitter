import { gql, useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useAuth } from '../contexts'
import NewTweetTemplate from '../templates/NewTweet'

export const TWEET_FIELDS = gql`
  fragment TweetFields on Tweet {
    id
    author
    text
    likeCount
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

const NewTweet = () => {
  const { goBack } = useNavigation()
  const { username: author } = useAuth()

  const [createTweet] = useMutation<{}, { author: string; text: string }>(
    CREATE_TWEET,
    { onCompleted: goBack }
  )

  const handleSubmitNewTweet = (text: string) => {
    createTweet({ variables: { author: author as string, text } })
  }

  return <NewTweetTemplate onSubmit={handleSubmitNewTweet} />
}

export default NewTweet
