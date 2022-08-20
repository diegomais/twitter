import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '../contexts'
import NewTweetScreen from '../screens/NewTweet'
import SignInScreen from '../screens/SignIn'
import TimelineScreen from '../screens/Timeline'
import * as Routes from './routes'

const Stack = createNativeStackNavigator()

export const Navigation = () => {
  const { isSignedOut } = useAuth()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedOut ? (
          <>
            <Stack.Screen name={Routes.SIGN_IN} component={SignInScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name={Routes.TIMELINE}
              component={TimelineScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: 'Twitter',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(Routes.NEW_TWEET)}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color="#4bb0ee"
                      style={{ marginRight: 20 }}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name={Routes.NEW_TWEET} component={NewTweetScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
