import { registerRootComponent } from 'expo'
import React from 'react'
import AppProvider from './contexts'
import Navigation from './navigation'

const App = () => {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  )
}

registerRootComponent(App)
