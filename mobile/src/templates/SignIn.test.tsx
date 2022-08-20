import React from 'react'
import { View as MockView } from 'react-native'
import renderer from 'react-test-renderer'

import SignIn from './SignIn'

jest.mock('@expo/vector-icons', () => ({
  Ionicons: MockView,
}))

describe('<SignIn />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<SignIn onSubmit={jest.fn()} />).toJSON()
    expect(tree?.children.length).toBe(1)
  })
})
