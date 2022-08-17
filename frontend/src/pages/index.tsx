import type { NextPage } from 'next'
import Head from 'next/head'
import router from 'next/router'
import { TOKEN } from '../constants/localStorage'
import useLocalStorage from '../helpers/useLocalStorage'
import LoginTemplate from '../templates/Login.template'

const Home: NextPage = () => {
  const [_, setUsername] = useLocalStorage<string>(TOKEN, '')

  const handleSubmit = (username: string) => {
    if (!username.length) return
    setUsername(username)
    router.push('/timeline')
  }

  return (
    <>
      <Head>
        <title>Twitter | Login</title>
      </Head>
      <LoginTemplate onSubmit={handleSubmit} />
    </>
  )
}

export default Home
