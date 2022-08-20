import React from 'react'
import { useAuth } from '../contexts'
import SignInTemplate from '../templates/SignIn'

export const SignIn = () => {
  const { signIn } = useAuth()

  return <SignInTemplate onSubmit={signIn} />
}

export default SignIn
