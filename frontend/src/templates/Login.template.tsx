import Image from 'next/image'
import { FormEvent, useState } from 'react'
import styles from './Login.module.css'

type LoginProps = {
  onSubmit: (username: string) => void
}

const Login = ({ onSubmit }: LoginProps) => {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username.length) return
    onSubmit(username)
  }

  return (
    <div className={styles.login}>
      <Image src="/twitter.svg" alt="Twitter" width={72} height={24} />

      <form onSubmit={handleSubmit}>
        <input
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          value={username}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
