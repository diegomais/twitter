import { registerRootComponent } from 'expo'
import React from 'react'
import Home from './screens/Home'

const App = () => {
  return <Home />
}

registerRootComponent(App)
