import Image from 'next/image'
import { KeyboardEvent, useState } from 'react'
import TweetComponent, { TweetProps } from '../components/Tweet.component'
import styles from './Timeline.module.css'

type Tweet = TweetProps['tweet']

export type TimelineProps = {
  tweets: Tweet[]
  onLikeATweet: TweetProps['onLike']
  onSubmitNewTweet: (data: string) => void
}

const Timeline = ({
  tweets,
  onLikeATweet,
  onSubmitNewTweet,
}: TimelineProps) => {
  const [text, setText] = useState('')

  const handleNewTweet = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || !text.length) return
    e.preventDefault()
    onSubmitNewTweet(text)
    setText('')
  }

  return (
    <div className={styles.timeline}>
      <Image src="/twitter.svg" alt="Twitter" width={72} height={24} />

      <form>
        <textarea
          placeholder="What's happening?"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleNewTweet}
          value={text}
        />
      </form>

      <ul className={styles.list}>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet.id} tweet={tweet} onLike={onLikeATweet} />
        ))}
      </ul>
    </div>
  )
}

export default Timeline
