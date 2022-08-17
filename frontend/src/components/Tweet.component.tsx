import Image from 'next/image'
import styles from './Tweet.module.css'

export type TweetProps = {
  onLike: (id: string) => void
  tweet: {
    id: string
    author: string
    text: string
    likeCount: number
  }
}

const Tweet = ({ onLike, tweet }: TweetProps) => {
  return (
    <li className={styles.tweet}>
      <strong>{tweet.author}</strong>
      <p>{tweet.text}</p>
      <button type="button" onClick={() => onLike(tweet.id)}>
        <Image src="/like.svg" alt="Like" width={32} height={16} />
        {tweet.likeCount}
      </button>
    </li>
  )
}

export default Tweet
