import * as SecureStore from 'expo-secure-store'
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'

const RESTORE_USERNAME = 'RESTORE_USERNAME'
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'

const USERNAME_STORAGE_KEY = 'Twitter-username'

type AuthAction =
  | { type: typeof RESTORE_USERNAME; username: string }
  | { type: typeof SIGN_IN; username: string }
  | { type: typeof SIGN_OUT }

type AuthState = {
  isLoading: boolean
  isSignedOut: boolean
  username: string | null
}

type AuthContextData = AuthState & {
  signIn(username: string): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const reducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case RESTORE_USERNAME:
      return {
        ...prevState,
        isLoading: false,
        username: action.username,
      }
    case SIGN_IN:
      return {
        ...prevState,
        isSignedOut: false,
        username: action.username,
      }
    case SIGN_OUT:
      return {
        ...prevState,
        isSignedOut: true,
        username: null,
      }
  }
}

const initialState: AuthState = {
  isLoading: true,
  isSignedOut: false,
  username: null,
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const bootstrapAsync = async () => {
      let username

      try {
        username = await SecureStore.getItemAsync(USERNAME_STORAGE_KEY)
      } catch (e) {
        console.error('Restoring token failed.')
      }
      if (username) {
        dispatch({ type: RESTORE_USERNAME, username })
      } else {
        dispatch({ type: SIGN_OUT })
      }
    }

    bootstrapAsync()
  }, [])

  const signIn = useCallback(async (username: string) => {
    await SecureStore.setItemAsync(USERNAME_STORAGE_KEY, username)
    dispatch({ type: SIGN_IN, username })
  }, [])

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(USERNAME_STORAGE_KEY)
    dispatch({ type: SIGN_OUT })
  }, [])

  return (
    <AuthContext.Provider value={{ ...authState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
