import React from 'react'
import { View as MockView } from 'react-native'
import renderer from 'react-test-renderer'

import NewTweet from './NewTweet'

jest.mock('@expo/vector-icons', () => ({
  Ionicons: MockView,
}))
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}))

describe('<NewTweet />', () => {
  it('has 2 children', () => {
    const tree = renderer.create(<NewTweet onSubmit={jest.fn()} />).toJSON()
    expect(tree?.children.length).toBe(2)
  })
})
